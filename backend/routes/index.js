const userRoutes = require('./UserRoutes');
const recipeRoutes = require('./RecipeRoutes');

const setup = app => {
    app.use('/user', userRoutes);
    app.use('/recipe', recipeRoutes);
};

module.exports.setup = setup;
