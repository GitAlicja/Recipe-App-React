const dotenv = require('dotenv');
dotenv.config();

const RecipeSchema = require('./models/RecipeSchema');

const db = require('./db');
const { Mongoose } = require('mongoose');

db.connect().then(() => {

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


    RecipeSchema.create(recipe).then(() => {
        console.log("Recipe created!");
        db.close();
    });
});
