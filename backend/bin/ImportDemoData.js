/**
 * Import demo data to MongoDB and exit.
 */
const dotenv = require('dotenv');
const DbConnection = require('../db/connection/DbConnection');
const RecipeModel = require('../db/model/RecipeModel');

const recipe = {
    title: 'MISO MUSHROOMS WITH CHICKPEAS AND KALE',
    subtitle: 'Demo subtitle',
    description: 'Hello and apologies for going quiet on social media and not replying to comments for a few days, but I have been caked in sanding dust and covered in paint splatters.',
    author: 'Ala',
    createDate: new Date(),
    sourceUrl: 'https://www.lazycatkitchen.com/miso-mushrooms-chickpeas-kale/',
    imageUrl: 'https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2020/10/miso-mushrooms-close-800x1200.jpg',
    preparationTime: '20 min',
    cookingTime: '30 min',
    totalTime: '50 min',
    servings: 4,
    mealType: ['dinner', 'lunch'],
    recipeType: ['vegan', 'glutenfree'],
    customTags: ['my favourite'],
    steps: ['ssdvdh', 'sifchfsduvzfeuf0', 'shfusdghvudhbdfibh'],
    ingredients: [
        {name: 'carrots', amount: 200, unit: 'gramm'},
        {name: 'mushrooms', amount: 0.3, unit: 'kg'},
        {name: 'butter', amount: 3, unit: 'spoons'}
    ],
};

(async () => {
    dotenv.config();
    await DbConnection.connect();
    await RecipeModel.create(recipe);
    console.log("Recipe created!");
    await DbConnection.close();
})();
