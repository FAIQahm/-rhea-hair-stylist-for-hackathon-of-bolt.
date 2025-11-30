const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testImagen() {
    console.log("--- TESTING IMAGEN AVAILABILITY ---");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // List of models to try
    const modelsToTest = [
        "imagen-3.0-generate-001",
        "imagen-4.0-generate-001", // User requested
        "gemini-pro-vision" // Just as a control
    ];

    for (const modelName of modelsToTest) {
        console.log(`\nTesting: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            // Imagen usually takes a simple prompt string for generation, 
            // but the SDK method might differ. 
            // For standard Gemini it's generateContent. 
            // For Imagen via this SDK, it might not be supported directly or use the same method.
            // We'll try generateContent first as a connectivity check.
            const result = await model.generateContent("A photo of a robot holding a red skateboard");
            console.log(`SUCCESS: ${modelName} responded!`);
            console.log(result.response.text());
        } catch (e) {
            console.log(`FAILED: ${modelName}`);
            console.log(`Error: ${e.message}`);
        }
    }
}

// Load env if needed (simple hack for node script)
const fs = require('fs');
try {
    const env = fs.readFileSync('.env', 'utf8');
    const match = env.match(/GEMINI_API_KEY=(.*)/);
    if (match) process.env.GEMINI_API_KEY = match[1].trim();
} catch (e) { }

testImagen();
