import React from 'react';
import { Clock, ChefHat, Star } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-chef-200 flex flex-col h-full"
      onClick={() => onClick(recipe)}
    >
      <div className="relative h-64 overflow-hidden">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-chef-200 flex items-center justify-center">
            <ChefHat className="w-12 h-12 text-chef-300" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 text-xs text-chef-500 font-medium mb-2 uppercase tracking-wide">
          <span>{recipe.tags[0] || 'Culinary'}</span>
          <span>•</span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" /> {recipe.cookingTime}
          </span>
        </div>
        
        <h3 className="font-serif text-2xl text-chef-900 font-bold mb-3 leading-tight group-hover:text-orange-700 transition-colors">
          {recipe.title}
        </h3>
        
        <p className="text-chef-800 text-sm mb-4 line-clamp-3 leading-relaxed opacity-80 flex-grow">
          {recipe.description}
        </p>

        <div className="pt-4 mt-auto border-t border-chef-100 flex items-center justify-between">
            <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                     <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                     </div>
                 ))}
                 <div className="w-6 h-6 rounded-full bg-chef-100 border-2 border-white flex items-center justify-center text-[10px] text-chef-600 font-bold">
                     +12
                 </div>
            </div>
            <button className="text-orange-700 text-sm font-semibold flex items-center group/btn">
                Read Recipe 
                <span className="ml-1 transition-transform group-hover/btn:translate-x-1">→</span>
            </button>
        </div>
      </div>
    </div>
  );
};
