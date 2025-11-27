import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";
import { GoogleGenerativeAI } from "npm:@google/generative-ai@0.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function generateRealisticPrice(category: string): number {
  const priceRanges: Record<string, [number, number]> = {
    blazer: [129.99, 249.99],
    jacket: [149.99, 299.99],
    coat: [199.99, 399.99],
    dress: [89.99, 199.99],
    pants: [79.99, 149.99],
    trousers: [89.99, 159.99],
    jeans: [69.99, 129.99],
    skirt: [59.99, 119.99],
    shirt: [49.99, 99.99],
    blouse: [59.99, 109.99],
    sweater: [69.99, 139.99],
    shoes: [99.99, 249.99],
    boots: [139.99, 299.99],
    bag: [149.99, 399.99],
    handbag: [179.99, 449.99],
    jewelry: [39.99, 199.99],
    necklace: [49.99, 149.99],
    earrings: [29.99, 99.99],
    bracelet: [39.99, 129.99],
    watch: [199.99, 599.99],
    sunglasses: [89.99, 249.99],
    belt: [39.99, 89.99],
    scarf: [29.99, 79.99],
    hat: [39.99, 99.99],
  };

  const [minPrice, maxPrice] = priceRanges[category.toLowerCase()] || [59.99, 149.99];
  const price = minPrice + Math.random() * (maxPrice - minPrice);
  return Math.round(price * 100) / 100;
}

function generateMockAffiliateLink(category: string, index: number): string {
  const baseUrl = "https://www.example.com/shop";
  const itemId = `${category.replace(/\s+/g, "-")}-${String(index + 1).padStart(3, "0")}`;
  const affiliateId = "rhea-stylist-20";
  return `${baseUrl}/${itemId}?ref=${affiliateId}`;
}

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

    const body = await req.json();
    const { image_url, image_base64 } = body;

    if (!image_url && !image_base64) {
      return new Response(
        JSON.stringify({ success: false, error: "Either image_url or image_base64 must be provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const genAI = new GoogleGenerativeAI(Deno.env.get("GEMINI_API_KEY") ?? "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `Analyze this fashion image and extract detailed information about the visible clothing items and accessories.

Focus ONLY on clearly visible items in the image. Do not hallucinate or invent items that aren't present.

For each distinct clothing item or accessory (maximum 5 items), provide:
1. Item Category (e.g., blazer, dress, shoes, necklace, handbag)
2. Specific Style Description (e.g., "Structured A-line", "Wrap-style", "Chelsea boot")
3. Primary Color (be specific, e.g., "Emerald Green", "Navy Blue", "Burgundy")
4. Fabric Type if identifiable (e.g., "Silk", "Cotton", "Leather", "Denim")
5. Key Style Details (e.g., "Gold buttons", "V-neck", "High-waisted", "Oversized fit")

Format your response as a JSON array with this exact structure:
[
  {
    "item_category": "blazer",
    "style_description": "Structured single-breasted blazer",
    "color": "Emerald Green",
    "fabric": "Silk blend",
    "style_details": "Notched lapels, gold buttons, tailored fit"
  },
  {
    "item_category": "pants",
    "style_description": "High-waisted straight-leg trousers",
    "color": "Black",
    "fabric": "Wool crepe",
    "style_details": "Front pleat, ankle length"
  }
]

CRITICAL: Return ONLY the JSON array. No additional text, explanations, or markdown formatting.`;

    let imagePart;

    if (image_url) {
      const imageResponse = await fetch(image_url);
      const imageBuffer = await imageResponse.arrayBuffer();
      const imageData = new Uint8Array(imageBuffer);
      imagePart = {
        inlineData: {
          data: btoa(String.fromCharCode(...imageData)),
          mimeType: imageResponse.headers.get("content-type") || "image/jpeg",
        },
      };
    } else if (image_base64) {
      const base64Data = image_base64.split(",").pop() || image_base64;
      imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      };
    }

    try {
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      let responseText = response.text();

      responseText = responseText.trim();
      if (responseText.startsWith("```json")) {
        responseText = responseText.substring(7);
      } else if (responseText.startsWith("```")) {
        responseText = responseText.substring(3);
      }
      if (responseText.endsWith("```")) {
        responseText = responseText.substring(0, responseText.length - 3);
      }
      responseText = responseText.trim();

      const parsedData = JSON.parse(responseText);
      const items = [];

      if (Array.isArray(parsedData)) {
        for (let idx = 0; idx < Math.min(parsedData.length, 5); idx++) {
          const itemData = parsedData[idx];
          if (typeof itemData === "object") {
            const category = (itemData.item_category || "clothing item").toLowerCase();
            const styleDesc = itemData.style_description || "Stylish item";
            const color = itemData.color || "Classic";
            const fabric = itemData.fabric || null;
            const details = itemData.style_details || "";

            let title = `${color} ${styleDesc}`.trim();
            if (title.length > 100) {
              title = title.substring(0, 97) + "...";
            }

            items.push({
              item_title: title,
              item_category: category,
              color,
              fabric,
              style_details: details,
              price: generateRealisticPrice(category),
              link: generateMockAffiliateLink(category, idx),
            });
          }
        }
      }

      if (items.length === 0) {
        throw new Error("No items parsed");
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `Found ${items.length} shoppable items in the look`,
          data: {
            items,
            item_count: items.length,
            metadata: {
              model: "gemini-2.0-flash-exp",
              analysis_type: "vision",
            },
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (apiError) {
      const mockItems = [
        {
          item_title: "Structured Blazer",
          item_category: "blazer",
          color: "Emerald Green",
          fabric: "Silk blend",
          style_details: "Notched lapels, gold buttons, tailored fit",
          price: 189.99,
          link: "https://www.example.com/shop/blazer-001",
        },
        {
          item_title: "High-Waisted Trousers",
          item_category: "pants",
          color: "Black",
          fabric: "Wool crepe",
          style_details: "Front pleat, ankle length, classic fit",
          price: 129.99,
          link: "https://www.example.com/shop/trousers-002",
        },
        {
          item_title: "Pointed Toe Pumps",
          item_category: "shoes",
          color: "Nude",
          fabric: "Leather",
          style_details: "3-inch heel, cushioned insole",
          price: 159.99,
          link: "https://www.example.com/shop/shoes-003",
        },
      ];

      return new Response(
        JSON.stringify({
          success: true,
          message: `Found ${mockItems.length} shoppable items in the look`,
          data: {
            items: mockItems,
            item_count: mockItems.length,
            metadata: {
              mode: "mock",
              reason: `API fallback: ${apiError.message}`,
              note: "In production, Gemini Vision would analyze the actual image.",
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
