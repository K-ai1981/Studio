import React from 'react';
import { X, Clock, BarChart, ChefHat, Printer } from 'lucide-react';
import { Recipe } from '../types';
import { Button } from './Button';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-chef-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow custom-scrollbar">
          {/* Header Image */}
          <div className="relative h-72 sm:h-96 w-full">
            {recipe.imageUrl ? (
              <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-chef-200 flex items-center justify-center">
                 <ChefHat className="w-20 h-20 text-chef-400" />
               </div>
            )}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg z-10"
            >
              <X className="w-6 h-6 text-chef-900" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold mb-2">{recipe.title}</h2>
              <div className="flex items-center space-x-4 text-white/90 text-sm sm:text-base">
                 <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {recipe.cookingTime}</span>
                 <span className="flex items-center"><BarChart className="w-4 h-4 mr-1"/> {recipe.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-12">
            
            {/* Chef's Notes */}
            <div className="bg-chef-50 p-6 rounded-xl border-l-4 border-orange-500 italic text-chef-800 text-lg leading-relaxed">
              <div className="flex items-center mb-2 text-orange-700 font-bold text-sm uppercase tracking-widest">
                <ChefHat className="w-4 h-4 mr-2" /> Chef's Notes
              </div>
              "{recipe.chefNotes}"
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-12">
              {/* Ingredients */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-chef-900 mb-6 pb-2 border-b border-chef-200">Ingredients</h3>
                <ul className="space-y-4">
                  {recipe.ingredients.map((item, idx) => (
                    <li key={idx} className="flex items-start text-chef-800">
                      <span className="w-2 h-2 mt-2 mr-3 bg-orange-400 rounded-full flex-shrink-0"></span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-chef-900 mb-6 pb-2 border-b border-chef-200">Instructions</h3>
                <div className="space-y-8">
                  {recipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex">
                      <div className="flex-shrink-0 mr-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-chef-900 text-white font-serif font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <p className="text-chef-800 text-lg leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

             {/* Tags */}
             <div className="flex flex-wrap gap-2 pt-8 border-t border-chef-100">
                {recipe.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#{tag}</span>
                ))}
             </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-chef-100 flex justify-end space-x-3 flex-shrink-0">
           <Button variant="outline" size="sm" onClick={() => window.print()}>
             <Printer className="w-4 h-4 mr-2" /> Print Recipe
           </Button>
           <Button onClick={onClose} size="sm">Close</Button>
        </div>
      </div>
    </div>
  );
};
