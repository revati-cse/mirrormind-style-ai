import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

const getGenAI = () => {
  const apiKey = process.env.VITE_GOOGLE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateOutfitMatchesFn = createServerFn("POST", async (imageBase64: string) => {
  const ai = getGenAI();
  if (!ai) {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    return {
      matches: [
        { name: "Shadow Shell J1", fit: "98%", tone: "text-cyan", price: "$145", brand: "Zara", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80" },
        { name: "Vortex Slacks", fit: "92%", tone: "text-magenta", price: "$89", brand: "H&M", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80" },
        { name: "Vertex Kicks", fit: "95%", tone: "text-purple", price: "$180", brand: "Nike", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
      ],
      reasoning: "Based on the texture and silhouette of the uploaded item, we are leaning into a techwear aesthetic with high-contrast matte fabrics and subtle chrome accents."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        "You are an elite AI fashion matcher. Look at this clothing item. Return a JSON object with { matches: [{ name: string, fit: string (e.g. '98%'), tone: string ('text-cyan', 'text-magenta', 'text-purple'), price: string, brand: string, img: string (use a realistic unsplash url placeholder) }], reasoning: string }. Give 3-4 matching items that would complete an outfit with this item. Choose realistic brands (Zara, Nike, Myntra, etc.).",
        { inlineData: { data: imageBase64.split(",")[1], mimeType: "image/jpeg" } }
      ],
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Failed to generate matches.");
  }
});
