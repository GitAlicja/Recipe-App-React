import React from 'react';

class RecipeDetails extends React.Component {

    render() {
        const recipe = this.props.recipe;

        const getFunnyAnswer = () => {
            const answers = ["Good luck!", "Have fun!", "Find it out", "Hm...", "Let's see", "No idea", "Only God knows", "Top secret"];
            return answers[Math.floor(Math.random() * answers.length)];
        };

        return (
            <div className="recipe-main-container">
                <div className="recipe-header-container">
                    <h2>{recipe.title}</h2>
                    {recipe.subtitle ? (<h4>{recipe.subtitle}</h4>) : undefined}
                    <p>Created by {recipe.author} on {recipe.createDate}</p>
                </div>

                <div className="recipe-image-container">
                    {recipe.imageUrl ? (<img src={recipe.imageUrl} alt={recipe.title}></img>) : (<img src='../../public/standard-imgages/nadine-primeau--bLkT8wGV0I-unsplash.jpg' alt='Products you could use to cook a healthy dish'></img>)}
                    {recipe.description ? (<p>{recipe.description}</p>) : undefined}
                </div>

                <div>
                    <p>Meal Type: {recipe.mealType.join(', ')}</p>
                    <p>Recipe Type: {recipe.recipeType.join(', ')}</p>
                    <p>My Tags: {recipe.customTags.join(', ')}</p>
                    {recipe.servings ? (<p>Serves: {recipe.servings}</p>) : undefined}
                </div>

                <div className="recipe-icons-container">
                    <p>{recipe.preparationTime ? `Prep: ${recipe.preparationTime}` : getFunnyAnswer()}</p>
                    <p>{recipe.cookingTime ? `Cook: ${recipe.cookingTime}` : getFunnyAnswer()}</p>
                    <p>{recipe.totalTime ? `Total: ${recipe.totalTime}` : getFunnyAnswer()}</p>
                </div>

                <div className="recipe-ingredients-container">
                    <h4>Ingredients</h4>
                    <ul>
                        {recipe.ingredients.map((ingredient, key) => (<li key={key}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>))}
                    </ul>
                </div>

                <div className="recipe-instructions_container">
                    <h4>Instructions</h4>
                    <ol>
                        {recipe.steps.map((step, key) => (<li key={key}>{step}</li>))}
                    </ol>
                </div>

                <div>
                    {recipe.sourceUrl ? (<p>Check the original recipe <a href={recipe.sourceUrl}>here</a></p>) : (<p>No source was named!</p>)}
                </div>

            </div>
        );
    }
}

export default RecipeDetails;