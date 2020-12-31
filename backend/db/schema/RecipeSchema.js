/**
 * Recipe DB schema
 */
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({

    title: {type: String, required: true},
    subtitle: {type: String, required: false},
    description: {type: String, required: false},
    author: {type: String, required: true},
    createDate: {type: Date, required: true},
    sourceUrl: {type: String, required: false},
    imageUrl: {type: String, required: false},
    preparationTime: {type: String, required: false},
    cookingTime: {type: String, required: false},
    totalTime: {type: String, required: false},
    servings: {type: Number, required: false},
    mealType: {type: [String], required: true},
    recipeType: {type: [String], required: true},
    customTags: {type: [String], required: true},
    steps: {type: [String], required: true},
    ingredients: {
        type: {
            name: {type: String, required: true},
            amount: {type: Number, required: true},
            unit: {type: String, required: false}
        }, required: true
    },
});

module.exports = mongoose.model('Recipe', recipeSchema);
