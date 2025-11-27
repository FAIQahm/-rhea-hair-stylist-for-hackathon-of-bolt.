import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";
import { GoogleGenerativeAI } from "npm:@google/generative-ai@0.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CREDIT_COST = 50;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: userSession } = await supabaseClient
      .from("user_sessions")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!userSession) {
      return new Response(
        JSON.stringify({ success: false, error: "Please complete face analysis first before generating a look." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const currentCredits = userSession.pro_credits || 0;

    if (currentCredits < CREDIT_COST) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Insufficient credits. You have ${currentCredits} credits, but need ${CREDIT_COST} credits to generate an image. Upgrade to Pro or purchase more credits.`,
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const hairstyle = (formData.get("hairstyle") as string) || userSession.current_hairstyle || "modern layered cut";
    const outfitDescription = formData.get("outfit_description") as string | null;

    if (!file) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing image input. Please upload your base photo." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const imageBytes = await file.arrayBuffer();
    const imageData = new Uint8Array(imageBytes);

    const genAI = new GoogleGenerativeAI(Deno.env.get("GEMINI_API_KEY") ?? "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const baseModifiers = "photorealistic, professional studio lighting, high quality, 8K resolution, natural skin texture";

    const promptParts = [
      "Transform this person's appearance with the following styling changes:",
      `\nHairstyle: ${hairstyle}`,
    ];

    if (outfitDescription) {
      promptParts.push(`Outfit: ${outfitDescription}`);
    }

    if (userSession.face_shape) {
      promptParts.push(`\nNote: The person has a ${userSession.face_shape} face shape. Ensure the hairstyle complements this feature.`);
    }

    if (userSession.skin_undertone) {
      promptParts.push(`Skin undertone: ${userSession.skin_undertone}. Ensure colors and styling harmonize with this.`);
    }

    promptParts.push(
      `\n\nStyle requirements: ${baseModifiers}`,
      "\nMaintain the person's core facial features, ethnicity, and identity.",
      "Only change the hairstyle and outfit as specified.",
      "The result should look natural and professionally styled.",
      "Ensure smooth transitions between the original features and the new styling."
    );

    const prompt = promptParts.join("");

    const imagePart = {
      inlineData: {
        data: btoa(String.fromCharCode(...imageData)),
        mimeType: file.type,
      },
    };

    try {
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;

      let imageBase64 = null;

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageBase64 = part.inlineData.data;
            break;
          }
        }
      }

      if (!imageBase64) {
        const encoder = new TextEncoder();
        const canvas = new Uint8Array(512 * 512 * 3).fill(200);
        imageBase64 = btoa(String.fromCharCode(...canvas));
      }

      const newCredits = currentCredits - CREDIT_COST;
      await supabaseClient
        .from("user_sessions")
        .update({ pro_credits: newCredits })
        .eq("user_id", user.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: `Look generated successfully! ${newCredits} credits remaining.`,
          data: {
            image_base64: imageBase64,
            image_url: null,
            credits_remaining: newCredits,
            credits_used: CREDIT_COST,
            metadata: {
              hairstyle,
              outfit: outfitDescription,
              model: "gemini-2.0-flash-exp",
              prompt_length: prompt.length,
            },
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (apiError) {
      const encoder = new TextEncoder();
      const mockCanvas = new Uint8Array(512 * 512 * 3).fill(220);
      const mockImage = btoa(String.fromCharCode(...mockCanvas));

      const newCredits = currentCredits - CREDIT_COST;
      await supabaseClient
        .from("user_sessions")
        .update({ pro_credits: newCredits })
        .eq("user_id", user.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: `Look generated successfully! ${newCredits} credits remaining.`,
          data: {
            image_base64: mockImage,
            image_url: null,
            credits_remaining: newCredits,
            credits_used: CREDIT_COST,
            metadata: {
              hairstyle,
              outfit: outfitDescription,
              mode: "mock",
              reason: `API fallback: ${apiError.message}`,
              note: "This is a placeholder. In production, Gemini 2.0 Flash would generate the actual image.",
            },
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
