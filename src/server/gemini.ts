import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

const getGenAI = () => {
  // If no key is set, we return null to use mock data
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

export const analyzeStyleFn = createServerFn("POST", async (imageBase64: string) => {
  const ai = getGenAI();
  if (!ai) {
    // Return mock data after an artificial delay
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
    
    // Create a new array with the system instruction at the beginning
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
