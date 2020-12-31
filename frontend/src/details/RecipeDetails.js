import React from 'react';

class RecipeDetails extends React.Component {



    render(props) {
        const recipe = this.props.recipe;

        return (
            <div>{recipe.title}</div>
        );
    }
}

export default RecipeDetails;