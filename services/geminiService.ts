
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getWeddingAdvice(prompt: string, context?: any) {
  try {
    const systemInstruction = `
      You are 'EverAfter AI', a world-class luxury event planner. 
      You help users with planning weddings, burials (memorials), naming ceremonies, graduations, coronations, birthdays, and job promotions.
      Be warm, respectful (especially for memorials), and sophisticated.
      Provide structured advice for itineraries, speeches (vows, eulogies, commencement, acceptance), and themes.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a suggestion right now. Let's try another idea!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI Assistant. Please check your internet connection.";
  }
}

export async function generateBudgetEstimate(totalBudget: number, eventType: string = "Wedding") {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a detailed percentage breakdown for a ${eventType} with a total budget of $${totalBudget}. Return as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            breakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  amount: { type: Type.NUMBER },
                  percentage: { type: Type.NUMBER },
                },
                required: ["category", "amount", "percentage"]
              }
            }
          },
          required: ["breakdown"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Budget Generation Error:", error);
    return null;
  }
}
