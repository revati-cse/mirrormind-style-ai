import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

const getGenAI = () => {
  const apiKey = process.env.VITE_GOOGLE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeStyleFn = createServerFn("POST", async (imageBase64: string) => {
  const ai = getGenAI();
  if (!ai) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      scores: [
        { k: "Professionalism", v: 88, c: "text-cyan" },
        { k: "Attractiveness", v: 91, c: "text-magenta" },
        { k: "Confidence", v: 95, c: "text-purple" },
        { k: "Trendiness", v: 84, c: "text-cyan" },
      ],
      notes: [
        "Swap the brown belt for a brushed-chrome buckle to lift trendiness by ~9 points.",
        "Add a single chain accent — your aesthetic profile under-indexes on metals.",
        "Push to a darker base palette; your undertone is cool, the warm khaki is dragging cohesion.",
      ]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        "You are an elite AI fashion stylist. Analyze this outfit. Return a JSON object with exactly this structure: { scores: [{ k: string, v: number, c: string }], notes: string[] }. The 'k' strings must be exactly 'Professionalism', 'Attractiveness', 'Confidence', 'Trendiness'. The 'v' is a score 0-100. The 'c' is either 'text-cyan', 'text-magenta', or 'text-purple' based on the score's vibe. The 'notes' should be 3 highly specific, actionable styling tips (e.g., 'Swap the brown belt...'). Keep notes short.",
        { inlineData: { data: imageBase64.split(",")[1], mimeType: "image/jpeg" } }
      ],
      config: { responseMimeType: "application/json" }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Failed to analyze style.");
  }
});
