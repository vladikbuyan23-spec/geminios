
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    // Guidelines state API_KEY is available in process.env.
    // Using a typeof check to prevent ReferenceError in environments without 'process'.
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("GeminiOS: Error accessing process.env.API_KEY", e);
  }
  return "";
};

export const chatWithGemini = async (message: string, history: { role: string; content: string }[] = []) => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("Neural Link API Key not found. Please configure the system.");
    }
    const ai = new GoogleGenAI({ apiKey });
    
    const contents = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));
    
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: "You are GeminiOS Assistant, the primary intelligence of the GeminiOS mobile platform. You are helpful, sleek, and high-tech. Use markdown for formatting. Keep responses concise for mobile screens.",
      }
    });

    return response.text || "No response received from Neural Core.";
  } catch (error: any) {
    console.error("Gemini AI Core Failure:", error);
    return `System Error: ${error.message || "Unknown neural error"}`;
  }
};

export const generateImage = async (prompt: string) => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) return null;
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Vision Core Failure:", error);
    return null;
  }
};
