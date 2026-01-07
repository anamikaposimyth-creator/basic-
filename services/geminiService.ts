
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateBlogSummary(content: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a punchy, executive summary of the following business blog content in 3 bullet points: ${content}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text || "Summary unavailable at the moment.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate AI summary.";
  }
}

export async function chatWithConcierge(message: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are the AI Concierge for Nexus Global Solutions. Be professional, concise, and helpful. Direct users to Home, About, Services, Blog, or Contact if relevant.",
      }
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Concierge Error:", error);
    return "The concierge is currently offline. Please try again later.";
  }
}
