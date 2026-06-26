import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function main() {
  try {
    console.log("Testing gemini-flash-latest...");
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const response = await model.generateContent("hello");
    console.log("✅ SUCCESS:", response.response.text().trim());
  } catch (err) {
    console.error("❌ FAILED:", err.message || err);
  }
}

main();
