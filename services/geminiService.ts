import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

// Initialize Gemini Client
// NOTE: We assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RECIPE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    cookingTime: { type: Type.STRING },
    difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard', 'Expert'] },
    chefNotes: { type: Type.STRING },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ['title', 'description', 'ingredients', 'instructions', 'cookingTime', 'difficulty', 'chefNotes', 'tags']
};

export const generateRecipeContent = async (prompt: string, dietary?: string): Promise<Omit<Recipe, 'id' | 'imageUrl' | 'createdAt'>> => {
  const fullPrompt = `
    You are a world-class Michelin star chef writing a new blog post.
    Create a detailed recipe based on this request: "${prompt}".
    ${dietary ? `Dietary restrictions: ${dietary}.` : ''}
    
    Make the description evocative and storytelling-based, like a high-end food blog.
    Keep instructions clear and professional.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: fullPrompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: RECIPE_SCHEMA,
      systemInstruction: "You are a professional chef. Output strictly JSON.",
    }
  });

  const text = response.text;
  if (!text) throw new Error("No text generated");
  
  return JSON.parse(text);
};

export const generateRecipeImage = async (description: string): Promise<string> => {
  const prompt = `Professional food photography of ${description}, overhead shot, studio lighting, high resolution, delicious, culinary magazine style, 4k.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using flash-image for efficiency and quality
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        // Nano Banana series does not support responseMimeType or Schema
        // We rely on extracting the inlineData
      }
    });

    // Iterate to find image part
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    // Fallback if no image found in parts (though it should be there)
    return 'https://picsum.photos/800/600?grayscale'; 
  } catch (error) {
    console.error("Image generation failed:", error);
    return 'https://picsum.photos/800/600?blur=2';
  }
};
