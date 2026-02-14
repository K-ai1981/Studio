import { Recipe } from './types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Rustic Truffle Mushroom Risotto',
    description: 'A creamy, comforting Italian classic elevated with the earthy aroma of black truffles and finished with aged parmesan.',
    ingredients: [
      '1.5 cups Arborio rice',
      '4 cups vegetable broth, warm',
      '1 cup dry white wine',
      '2 tbsp olive oil',
      '1 shallot, minced',
      '8oz cremini mushrooms, sliced',
      '1 tsp truffle oil',
      '1/2 cup Parmesan cheese, grated',
      '2 tbsp unsalted butter'
    ],
    instructions: [
      'Heat olive oil in a large pan over medium heat. Sauté shallots until translucent.',
      'Add mushrooms and cook until browned. Remove half for garnish.',
      'Add rice to the pan and toast for 1-2 minutes until edges are translucent.',
      'Deglaze with white wine and stir until absorbed.',
      'Slowly add warm broth one ladle at a time, stirring constantly until liquid is absorbed before adding more.',
      'Continue for 18-20 minutes until rice is al dente.',
      'Remove from heat. Stir in butter, parmesan, and truffle oil.',
      'Serve immediately, topped with reserved mushrooms.'
    ],
    cookingTime: '45 mins',
    difficulty: 'Medium',
    imageUrl: 'https://picsum.photos/seed/risotto/800/600',
    chefNotes: 'The key to a perfect risotto is patience. Never stop stirring to release the starch for that signature creamy texture.',
    tags: ['Italian', 'Vegetarian', 'Dinner'],
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Pan-Seared Scallops with Lemon Butter',
    description: 'Perfectly caramelized scallops resting on a bed of pea purée, drizzled with a zesty lemon garlic butter sauce.',
    ingredients: [
      '1 lb large sea scallops',
      '2 tbsp unsalted butter',
      '1 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 lemon, juiced and zested',
      '1 cup frozen peas',
      'Salt and black pepper to taste',
      'Fresh parsley for garnish'
    ],
    instructions: [
      'Pat scallops very dry with paper towels. Season generously with salt and pepper.',
      'Heat olive oil and half the butter in a skillet over high heat until smoking.',
      'Sear scallops for 2 minutes per side without moving them to get a golden crust.',
      'Remove scallops. Lower heat, add remaining butter, garlic, and lemon juice to the pan.',
      'Blanch peas and blend with a touch of mint and cream for the puree.',
      'Plate the puree, top with scallops, and drizzle with the pan sauce.'
    ],
    cookingTime: '20 mins',
    difficulty: 'Hard',
    imageUrl: 'https://picsum.photos/seed/scallops/800/600',
    chefNotes: 'Ensure your pan is screaming hot before adding the scallops to achieve that restaurant-quality sear.',
    tags: ['Seafood', 'Gluten-Free', 'Date Night'],
    createdAt: Date.now() - 100000
  }
];
