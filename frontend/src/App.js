import { useState } from 'react';
import './App.css';
import RecipeDetails from './details/RecipeDetails';

function App() {

  const [recipes, setRecipes] = useState(undefined);

  if (!recipes) {
    fetch('http://localhost:3100/recipe')
      .then(response => response.json())
      .then(setRecipes);
  }

  return (
    <div>
      { recipes ? (<RecipeDetails recipe={recipes[0]} />) : "loading..."}
    </div>
  );
}

export default App;
