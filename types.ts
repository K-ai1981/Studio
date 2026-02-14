export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  imageUrl?: string;
  chefNotes: string;
  tags: string[];
  createdAt: number;
}

export type GenerationStatus = 'idle' | 'generating-text' | 'generating-image' | 'complete' | 'error';

export interface GenerateRecipeParams {
  prompt: string;
  dietaryRestrictions?: string;
}
