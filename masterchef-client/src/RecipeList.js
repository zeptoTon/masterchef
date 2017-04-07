import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


const RecipeRow = ({ name, cookingTimeInMinutes, ingredients }) => {
    return (
        <tr>
            <td><Link to={`/recipes/${name}`} > {name} </Link> </td>
            <td>{cookingTimeInMinutes}</td>
            <td>{ingredients.join(', ')}</td>
        </tr>
    );
};

/**
 * TODO: recipesTotalCount from server
 * TODO: show empty message if no recipe
 */
class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page || 1,
            recipes: null,
            recipesTotalCount: null
        };
    }

    onSelectRecipe() {

    }

    componentDidMount() {
        fetch(`/pages/${this.state.page}.json`)
            .then(res => res.json())
            .then(recipes => {
                this.setState({ recipes });
            });
    }

    render() {
        const { recipes } = this.state;
        return (
            <div>
                {recipes ? (
                    <table >
                        <thead>
                            <tr>
                                <th>Recipe</th>
                                <th>Cooking Time</th>
                                <th>Ingredients</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map(v => <RecipeRow {...v} />)}
                        </tbody>
                    </table >
                ) : (<p>Loading...</p>)
                }
            </div>

        );
    }
}

export default RecipeList;
