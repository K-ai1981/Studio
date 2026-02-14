import React, { useState, useEffect } from 'react';
import { INITIAL_RECIPES } from './constants';
import { Recipe, GenerationStatus, GenerateRecipeParams } from './types';
import { generateRecipeContent, generateRecipeImage } from './services/geminiService';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetail } from './components/RecipeDetail';
import { CreateRecipeModal } from './components/CreateRecipeModal';
import { Button } from './components/Button';
import { Search, Plus, ChefHat, Instagram, Twitter, Facebook, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Recipe Generation
  const handleGenerateRecipe = async (params: GenerateRecipeParams) => {
    setGenerationStatus('generating-text');
    try {
      // 1. Generate Text
      const content = await generateRecipeContent(params.prompt, params.dietaryRestrictions);
      
      setGenerationStatus('generating-image');
      
      // 2. Generate Image
      const imageUrl = await generateRecipeImage(content.title + ", " + content.description);
      
      const newRecipe: Recipe = {
        id: Date.now().toString(),
        ...content,
        imageUrl,
        createdAt: Date.now()
      };

      setRecipes(prev => [newRecipe, ...prev]);
      setGenerationStatus('complete');
      setIsModalOpen(false);
      setSelectedRecipe(newRecipe); // Open the new recipe immediately
      
      // Reset status after a brief moment
      setTimeout(() => setGenerationStatus('idle'), 500);

    } catch (error) {
      console.error("Generation failed", error);
      setGenerationStatus('error');
    }
  };

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
    r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-chef-900">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-chef-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-chef-900 rounded-lg flex items-center justify-center">
                <ChefHat className="text-white w-6 h-6" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight">Le Chef AI</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-chef-600">
            <a href="#" className="hover:text-chef-900 transition-colors">Recipes</a>
            <a href="#" className="hover:text-chef-900 transition-colors">Masterclasses</a>
            <a href="#" className="hover:text-chef-900 transition-colors">Ingredients</a>
            <a href="#" className="hover:text-chef-900 transition-colors">About</a>
          </div>

          <div className="flex items-center space-x-4">
             <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-chef-400" />
                <input 
                  type="text" 
                  placeholder="Search recipes..." 
                  className="pl-9 pr-4 py-2 bg-chef-50 border border-chef-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-chef-900 w-48 transition-all focus:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <Button onClick={() => setIsModalOpen(true)} size="sm" className="hidden sm:flex">
                <Plus className="w-4 h-4 mr-2" /> New Recipe
             </Button>
             <button className="sm:hidden p-2 text-chef-800">
               <Menu className="w-6 h-6" />
             </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-chef-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center">
          <span className="text-orange-400 font-medium tracking-widest uppercase text-sm mb-4">Culinary Intelligence</span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold mb-6 leading-tight max-w-4xl">
            Where Artificial Intelligence <br/> Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">Haute Cuisine</span>
          </h1>
          <p className="text-chef-200 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
            Generate exquisite recipes, visualize stunning dishes, and master the art of cooking with your personal AI sous-chef.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" onClick={() => setIsModalOpen(true)}>
              <ChefHat className="w-5 h-5 mr-2" /> Create Recipe
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => {
              const el = document.getElementById('recipes-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Browse Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full" id="recipes-grid">
        <div className="flex justify-between items-end mb-10">
           <div>
             <h2 className="font-serif text-4xl font-bold text-chef-900 mb-2">Latest Creations</h2>
             <p className="text-chef-500">Discover recipes curated by our AI and community.</p>
           </div>
           
           {/* Mobile Search - only visible on small screens */}
           <div className="sm:hidden w-full mt-4">
               <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-chef-400" />
                <input 
                  type="text" 
                  placeholder="Search recipes..." 
                  className="pl-9 pr-4 py-3 bg-white border border-chef-200 rounded-lg text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
           </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={setSelectedRecipe}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-chef-300">
            <ChefHat className="w-16 h-16 text-chef-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-chef-900 mb-2">No recipes found</h3>
            <p className="text-chef-500 mb-6">Try searching for something else, or ask the AI to invent it!</p>
            <Button onClick={() => {setSearchQuery(''); setIsModalOpen(true);}}>
              Create New Recipe
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-chef-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center space-x-2 mb-4">
                  <ChefHat className="text-chef-900 w-6 h-6" />
                  <span className="font-serif text-xl font-bold">Le Chef AI</span>
               </div>
               <p className="text-chef-500 text-sm max-w-sm">
                 Pioneering the future of gastronomy through generative AI. 
                 Every recipe is a unique creation designed to inspire your inner chef.
               </p>
            </div>
            <div>
              <h4 className="font-bold text-chef-900 mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-chef-600">
                <li><a href="#" className="hover:text-orange-600">Trending Recipes</a></li>
                <li><a href="#" className="hover:text-orange-600">Weekly Menu</a></li>
                <li><a href="#" className="hover:text-orange-600">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-chef-900 mb-4">Connect</h4>
              <div className="flex space-x-4 text-chef-400">
                <a href="#" className="hover:text-chef-900"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-chef-900"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-chef-900"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-chef-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-chef-400">
            <p>© 2024 Le Chef AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}

      {isModalOpen && (
        <CreateRecipeModal 
          onClose={() => setIsModalOpen(false)} 
          onGenerate={handleGenerateRecipe}
          status={generationStatus}
        />
      )}
      
      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 sm:hidden z-30">
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="shadow-xl w-14 h-14 !p-0 rounded-full flex items-center justify-center bg-chef-900"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

    </div>
  );
};

export default App;
