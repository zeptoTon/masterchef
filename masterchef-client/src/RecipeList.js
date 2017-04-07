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
 * TODO: show empty message if no recipe
 */
class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page || 1,
            recipes: null,
        };
    }

    _getRecipes() {
        if (this.props.numberOfRecipes >= this.state.page) {
            fetch(`/pages/${this.state.page}.json`)
                .then(res => res.json())
                .then(recipes => {
                    this.setState({ recipes });
                });
        }
    }

    componentDidMount() {
        this._getRecipes();
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.numberOfRecipes !== this.props.numberOfRecipes || this.state.page !== prevState.page) {
            this._getRecipes();
        }
    }

    render() {
        const { numberOfPages, numberOfRecipes } = this.props;
        const { recipes, page } = this.state;
        return (
            <div>
                {numberOfRecipes !== 0 ? (
                    recipes ? (
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

                ) : (
                        <p>Sorry, we currently have no recipes for you</p>
                    )}
            </div>

        );
    }
}

export default RecipeList;
