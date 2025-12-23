
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, LinkItem } from "../types";

export const enhanceProfile = async (profile: UserProfile, links: LinkItem[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Eres un experto mundial en branding personal y copywriting. 
      Analiza este perfil de LinkPulse:
      Nombre: ${profile.name}
      Usuario actual: ${profile.username}
      Bio actual: ${profile.bio}
      Enlaces: ${links.map(l => l.title).join(', ')}
      
      Tu tarea es:
      1. Redactar una biografía corta (máximo 140 caracteres) que sea magnética, profesional y genere confianza.
      2. Sugerir títulos para los enlaces actuales que sean irresistibles y aumenten el CTR (Click-Through Rate).
      
      Devuelve la respuesta estrictamente en formato JSON.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            enhancedBio: { type: Type.STRING },
            suggestedTitles: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["enhancedBio", "suggestedTitles"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI enhancement failed:", error);
    return null;
  }
};
