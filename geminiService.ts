
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, LinkItem } from "./types";

export const enhanceProfile = async (profile: UserProfile, links: LinkItem[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a social media branding expert. 
      Analyze this profile:
      Name: ${profile.name}
      Current Bio: ${profile.bio}
      Links: ${links.map(l => l.title).join(', ')}
      
      Suggest a better, more engaging bio (max 150 chars) and suggest catchy titles for their links.
      Return the result in JSON format.`,
      config: {
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
