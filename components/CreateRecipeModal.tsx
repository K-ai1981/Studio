import React, { useState } from 'react';
import { X, Wand2, ChefHat } from 'lucide-react';
import { Button } from './Button';
import { GenerateRecipeParams, GenerationStatus } from '../types';

interface CreateRecipeModalProps {
  onClose: () => void;
  onGenerate: (params: GenerateRecipeParams) => void;
  status: GenerationStatus;
}

export const CreateRecipeModal: React.FC<CreateRecipeModalProps> = ({ onClose, onGenerate, status }) => {
  const [prompt, setPrompt] = useState('');
  const [dietary, setDietary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate({ prompt, dietaryRestrictions: dietary });
  };

  const isGenerating = status.startsWith('generating');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-chef-900/60 backdrop-blur-sm" onClick={isGenerating ? undefined : onClose}></div>
      
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-chef-900 p-6 text-white flex justify-between items-start">
          <div>
            <h2 className="font-serif text-2xl font-bold flex items-center">
              <ChefHat className="w-6 h-6 mr-2 text-orange-400" />
              Ask the Chef AI
            </h2>
            <p className="text-chef-300 text-sm mt-1">Describe what you want to cook, and I'll design a recipe.</p>
          </div>
          {!isGenerating && (
             <button onClick={onClose} className="text-white/70 hover:text-white">
                <X className="w-6 h-6" />
             </button>
          )}
        </div>

        <div className="p-6">
          {status === 'idle' || status === 'error' ? (
             <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-chef-800 mb-1">What are you craving?</label>
                 <textarea
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   className="w-full px-4 py-3 rounded-lg border border-chef-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[100px] resize-none"
                   placeholder="e.g., A spicy thai noodle dish with shrimp, or something using kale and chickpeas..."
                   required
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-chef-800 mb-1">Dietary Restrictions (Optional)</label>
                 <input
                   type="text"
                   value={dietary}
                   onChange={(e) => setDietary(e.target.value)}
                   className="w-full px-4 py-2 rounded-lg border border-chef-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                   placeholder="e.g., Gluten-free, Keto, Vegan"
                 />
               </div>

               {status === 'error' && (
                 <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                   Something went wrong. Please try again.
                 </div>
               )}

               <div className="flex justify-end pt-2">
                 <Button type="submit" size="lg" disabled={!prompt.trim()} className="w-full sm:w-auto">
                   <Wand2 className="w-5 h-5 mr-2" /> Generate Recipe
                 </Button>
               </div>
             </form>
          ) : (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="relative w-20 h-20 mb-6">
                 <div className="absolute inset-0 border-4 border-chef-100 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                 <ChefHat className="absolute inset-0 m-auto w-8 h-8 text-chef-800" />
              </div>
              <h3 className="text-xl font-bold text-chef-900 mb-2">
                {status === 'generating-text' ? 'Drafting the Recipe...' : 'Plating the Dish (Generating Image)...'}
              </h3>
              <p className="text-chef-500 max-w-xs mx-auto">
                Our AI Chef is considering flavor combinations and writing the blog post just for you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
