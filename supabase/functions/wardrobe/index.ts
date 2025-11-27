import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const FREE_TIER_LIMIT = 15;

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
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const action = pathParts[pathParts.length - 1];

    if (req.method === "POST" && action === "upload") {
      const { count: itemCount } = await supabaseClient
        .from("wardrobe_items")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);

      if ((itemCount || 0) >= FREE_TIER_LIMIT) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Wardrobe Full - Upgrade to Pro for Unlimited Storage. You've reached the 15-item limit for the Free Tier.",
          }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const formData = await req.formData();
      const file = formData.get("file") as File;
      const itemCategory = (formData.get("item_category") as string) || "uncategorized";
      const itemName = formData.get("item_name") as string | null;
      const itemDescription = formData.get("item_description") as string | null;

      if (!file || !file.name) {
        return new Response(
          JSON.stringify({ success: false, error: "No filename provided" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const fileBytes = await file.arrayBuffer();
      if (fileBytes.byteLength === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "Empty file uploaded" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (fileBytes.byteLength > 10 * 1024 * 1024) {
        return new Response(
          JSON.stringify({ success: false, error: "File too large. Maximum size is 10MB" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid image file format. Supported formats: JPEG, PNG, WEBP" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const timestamp = Date.now();
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const serviceRoleClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const { data: uploadData, error: uploadError } = await serviceRoleClient.storage
        .from("wardrobe_assets")
        .upload(fileName, fileBytes, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        return new Response(
          JSON.stringify({ success: false, error: `Upload failed: ${uploadError.message}` }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: publicUrlData } = serviceRoleClient.storage
        .from("wardrobe_assets")
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      const wardrobeData = {
        user_id: user.id,
        item_url: publicUrl,
        item_category: itemCategory,
        item_name: itemName,
        item_description: itemDescription,
        metadata: {
          original_filename: file.name,
          file_size: fileBytes.byteLength,
          content_type: file.type,
        },
      };

      const { data: insertData, error: insertError } = await supabaseClient
        .from("wardrobe_items")
        .insert(wardrobeData)
        .select()
        .single();

      if (insertError) {
        return new Response(
          JSON.stringify({ success: false, error: `Database insert failed: ${insertError.message}` }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `Successfully added ${itemName || "item"} to your wardrobe!`,
          data: {
            item_id: insertData.id,
            item_url: publicUrl,
            item_category: itemCategory,
            uploaded_at: insertData.created_at,
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (req.method === "GET" && action === "items") {
      const category = url.searchParams.get("category");

      let query = supabaseClient
        .from("wardrobe_items")
        .select("*")
        .eq("user_id", user.id);

      if (category) {
        query = query.eq("item_category", category);
      }

      const { data: items, error: fetchError } = await query.order("created_at", { ascending: false });

      if (fetchError) {
        return new Response(
          JSON.stringify({ success: false, error: `Fetch failed: ${fetchError.message}` }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `Retrieved ${items?.length || 0} wardrobe items`,
          data: {
            items: items || [],
            count: items?.length || 0,
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (req.method === "GET" && action === "credits") {
      const { data: userSession } = await supabaseClient
        .from("user_sessions")
        .select("pro_credits")
        .eq("user_id", user.id)
        .maybeSingle();

      const credits = userSession?.pro_credits || 0;

      return new Response(
        JSON.stringify({
          success: true,
          message: `You have ${credits} Pro credits`,
          data: {
            credits,
            credit_cost_per_generation: 50,
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid endpoint" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
