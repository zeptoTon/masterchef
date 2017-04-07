import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Recipe from './Recipe';
// import RecipeList from './RecipeList';
import App from './App';


// let recipe = {
//     "name": "chicken curry",
//     "cookingTimeInMinutes": 60,
//     "imageUrl": "ABCD",
//     "ingredients": [
//         {
//             "name": "sugar",
//             "quantity": "1 tsp"
//         },
//         {
//             "name": "salt",
//             "quantity": "1 tsp"
//         }
//     ]
// }

// let recipes = [{ "cookingTimeInMinutes": 30, "ingredients": [], "name": "empty recipe" }, { "cookingTimeInMinutes": 60, "ingredients": ["sugar", "salt"], "name": "dummy recipe" }];
// <Recipe {...recipe} />,
    //<RecipeList recipes={recipes} />,
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
