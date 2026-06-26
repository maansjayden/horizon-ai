import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS setup to allow request from Vite development server
app.use(cors());
app.use(express.json());

// Initialize Google Gen AI
// Note: We use process.env.GEMINI_API_KEY. If not found, we fallback or return errors.
const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;

if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.trim() !== '') {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn("⚠️ WARNING: GEMINI_API_KEY is not configured. Real API calls will fail.");
}

app.post('/api/evaluate-answer', async (req, res) => {
  const { question, userAnswer, idealConcepts } = req.body;

  if (!question || userAnswer === undefined || !idealConcepts) {
    return res.status(400).json({ error: "Missing required fields: question, userAnswer, idealConcepts" });
  }

  // If API key is missing, return a clean simulated response so that the app doesn't break
  if (!genAI) {
    return res.status(503).json({
      error: "Gemini API key is not configured on the server. Please add GEMINI_API_KEY to your .env file."
    });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const prompt = `
You are a professional technical recruiter and AI career coach named Aura. 
Evaluate the user's answer to the following interview question.

Interview Question:
"${question}"

Required Domain Structural Concepts:
${JSON.stringify(idealConcepts)}

User's Answer:
"${userAnswer}"

Evaluation Rules:
1. Act as a constructive but realistic technical recruiter.
2. Determine which of the "Required Domain Structural Concepts" the user's answer semantically addresses. The user doesn't need to use the exact wording, but the core idea should be represented. Place matched concepts in "matchedConcepts".
3. Evaluate the quality of the answer and assign a score (0 to 100).
4. If the answer is blank, extremely short (under 15 characters), or is a dodge like "idk", "pass", "no idea", assign a score between 0 and 15, and call it out as a red flag in the feedback.
5. Provide a realistic, concise critique (2-4 sentences max) explaining the score and what they could do to improve (e.g. mention specific tools or action verbs).

You MUST return ONLY a JSON object matching this schema. Do not write markdown blocks (no \`\`\`json). Output raw JSON:
{
  "score": number (0 to 100),
  "feedback": string,
  "matchedConcepts": string[] (subset of the required structural concepts)
}
`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const responseText = result.response.text();
    const evaluationData = JSON.parse(responseText);

    return res.json(evaluationData);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Failed to evaluate response via Gemini API.",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Serve static assets in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

// Fallback all non-API GET requests to React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Express proxy server running at http://localhost:${port}`);
});
