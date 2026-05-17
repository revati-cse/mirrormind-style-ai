import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

const getGenAI = () => {
  const apiKey = process.env.VITE_GOOGLE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const chatWithStylistFn = createServerFn("POST", async (history: { role: string, text: string }[]) => {
  const ai = getGenAI();
  if (!ai) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { text: "I'm currently operating in offline simulation mode. But looking at your recent interactions, I'd suggest leaning into structured silhouettes and monochrome palettes for your next event." };
  }

  try {
    const formattedHistory = history.map(h => ({
      role: h.role === "ai" ? "model" : "user",
      parts: [{ text: h.text }]
    }));
    
    const contents = [
      { role: "user", parts: [{ text: "System Context: You are 'MirrorMind AI', an elite, slightly futuristic personal stylist. You speak with a polished, editorial, cyberpunk-adjacent tone. Keep answers concise." }] },
      { role: "model", parts: [{ text: "Understood. I am online." }] },
      ...formattedHistory
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    return { text: response.text || "" };
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Stylist neural link failed.");
  }
});
