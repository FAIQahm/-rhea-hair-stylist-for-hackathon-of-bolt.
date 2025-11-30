const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
    console.log("--- STARTING DIAGNOSTIC ---");

    // 1. Load API Key
    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        try {
            const env = fs.readFileSync('.env', 'utf8');
            const match = env.match(/GEMINI_API_KEY=(.*)/);
            if (match) apiKey = match[1].trim();
        } catch (e) {
            console.log("Could not read .env file");
        }
    }

    if (!apiKey) {
        console.error("FATAL: No API Key found in process or .env");
        return;
    }

    console.log(`API Key loaded: ${apiKey.substring(0, 5)}...`);
    const genAI = new GoogleGenerativeAI(apiKey);

    // 2. Test Gemini 1.5 Flash
    console.log("\nTesting gemini-1.5-flash...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, are you working?");
        console.log("SUCCESS: gemini-1.5-flash responded: " + result.response.text());
    } catch (e) {
        console.error("FAILED: gemini-1.5-flash error:");
        console.error(e.message);
    }

    // 3. Test Gemini Pro (Fallback)
    console.log("\nTesting gemini-pro (fallback)...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello, are you working?");
        console.log("SUCCESS: gemini-pro responded: " + result.response.text());
    } catch (e) {
        console.error("FAILED: gemini-pro error:");
        console.error(e.message);
    }
    console.log("--- DIAGNOSTIC COMPLETE ---");
}

test();
