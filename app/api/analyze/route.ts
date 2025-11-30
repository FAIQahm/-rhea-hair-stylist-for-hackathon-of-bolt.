import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString("base64");

        const prompt = `
    Act as a world-class hair stylist and cutting expert with over 30 years of experience. Your clients include A-list actors, professional footballers, and top business executives.
    
    Task:
    1. Analyze the face shape, skin undertone, and key demographic features (approximate age, gender presentation) from the photo.
    2. Recommend the absolute best, most flattering hairstyle for them.
    3. Explain WHY this specific cut works for their unique features.
    4. Provide professional styling advice.
    5. Generate a "Lookalike Search Query" to find a model who looks similar to the client wearing this style.

    JSON Schema:
    {
      "face_shape": "string",
      "skin_undertone": "string",
      "gender": "string (Male, Female, or Non-binary)",
      "recommended_style": "string",
      "expert_name": "string (Use 'Rhea' or a professional stylist name)",
      "expert_reasoning": "string",
      "styling_tips": {
        "hairstyle_dos": ["string", "string"],
        "hairstyle_donts": ["string", "string"],
        "color_recommendations": ["string", "string"]
      },
      "image_search_query": "string (A highly specific query to find a lookalike. Format: '[Gender] [Age Group] with [Face Shape] face and [Skin Tone] skin wearing [Hairstyle]', e.g., 'Young adult asian male with square face and tan skin wearing textured crop haircut')"
    }
    `;

        let result;
        try {
            console.log("Attempting User-Requested Model: models/gemini-3-pro-image-preview...");
            const model = genAI.getGenerativeModel({ model: "models/gemini-3-pro-image-preview" });
            result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: file.type,
                    },
                },
            ]);
            console.log("models/gemini-3-pro-image-preview Success");
        } catch (e: any) {
            console.error("models/gemini-3-pro-image-preview FAILED:", e.message);
            console.log("Attempting gemini-flash-latest fallback...");
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
                result = await model.generateContent([
                    prompt,
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: file.type,
                        },
                    },
                ]);
                console.log("gemini-flash-latest Success");
            } catch (flashLatestError: any) {
                console.error("gemini-flash-latest FAILED:", flashLatestError.message);
                console.log("Attempting Gemini 1.5 Flash fallback...");
                try {
                    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                    result = await model.generateContent([
                        prompt,
                        {
                            inlineData: {
                                data: base64Image,
                                mimeType: file.type,
                            },
                        },
                    ]);
                    console.log("Gemini 1.5 Flash Success");
                } catch (fallbackError: any) {
                    console.error("Gemini 1.5 Flash FAILED:", fallbackError.message);
                    console.log("Attempting Gemini Pro fallback...");
                    try {
                        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                        result = await model.generateContent([
                            prompt,
                            {
                                inlineData: {
                                    data: base64Image,
                                    mimeType: file.type,
                                },
                            },
                        ]);
                        console.log("Gemini Pro Success");
                    } catch (finalError: any) {
                        console.error("Gemini Pro FAILED:", finalError.message);
                        throw finalError;
                    }
                }
            }
        }

        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const data = JSON.parse(jsonStr);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze image" },
            { status: 500 }
        );
    }
}
