
import { GoogleGenAI, Type } from "@google/genai";
import { InsightResult } from "../types";

export const generateInsight = async (reflection: string): Promise<InsightResult> => {
  // Ensure the key is present and sanitized of any trailing spaces/newlines
  const rawKey = process.env.API_KEY || '';
  const sanitizedKey = rawKey.trim();

  if (!sanitizedKey) {
    throw new Error("API_KEY is missing. Please ensure your environment variable is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: sanitizedKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this work reflection and provide a structured insight snapshot: "${reflection}"`,
      config: {
        systemInstruction: `You are an executive coach and organizational psychologist specializing in workplace dynamics. 
        Your tone is objective, analytical, and professional. Avoid therapeutic jargon ("how does that make you feel"), cliches, or overly soft language.
        Provide high-utility snapshots that help a professional see their situation clearly. 
        
        Structure your response exactly as requested:
        - summary: 1-2 lines summarizing the core situation.
        - themes: 3-5 key professional themes (e.g., "Stakeholder Alignment", "Role Ambiguity").
        - signal: A short indicator of the underlying emotional or energetic state (e.g., "Frustrated / High Agency" or "Cautious / Analytical").
        - prompts: 2 practical, challenging reflection questions.
        - risk: (Optional) A brief note identifying a behavioral pattern like overthinking, avoidance, or impulsivity, only if clearly present.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            themes: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            signal: { type: Type.STRING },
            prompts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            risk: { type: Type.STRING }
          },
          required: ["summary", "themes", "signal", "prompts"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The AI model returned an empty response. This can happen if the input is too brief or restricted.");
    }

    return JSON.parse(text) as InsightResult;
  } catch (error: any) {
    // Catch specific API errors for better user guidance
    const errorMsg = error?.message || '';
    if (errorMsg.includes('API key not valid') || errorMsg.includes('400')) {
      throw new Error("The API key provided is not valid. Please verify that your Gemini API key is correct and active.");
    }
    throw error;
  }
};
