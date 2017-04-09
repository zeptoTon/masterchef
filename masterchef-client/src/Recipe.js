import React, { Component } from 'react';
import './Recipe.css';


/**
 * Helper function for Recipe Component
 * @param {name, quantity}
 */
const Ingredients = ({ name, quantity }) => {
    let description;
    if (typeof quantity === 'number') {
        description = `${quantity} x ${name}`;
    } else {
        description = `${quantity} ${name}`;
    }
    return (
        <li>{description}</li>
    );
};

/**
 * Recipe component when user choose specific recipe
 * TODO: add star recipe
 */
class Recipe extends Component {

    constructor(props) {
        super(props);
        if (props.match === undefined) throw new Error(
            'need to be created with React Router to provide {match} props'
        );
        this.state = {
            recipe: null,
            notFound: false
        };
    }

    componentDidMount () {
        const { name } = this.props.match.params;
        fetch(`/recipes/${name}.json`)
            .then((res) => {
                if (res.status === 404) {
                    throw new Error();
                }
                return res;
            })
            .then(res => res.json())
            .then(recipe => {
                this.setState({ recipe });
            })
            .catch(err => {
                this.setState({
                    'notFound': true
                });
            });
    }
    render () {
        const { recipe, notFound } = this.state;
        const { name } = this.props.match.params;

        return (
            <div className="recipe">
                {recipe ? (
                    <div>
                        <h1>{name}</h1>
                        <div className="img-wrapper">
                            <img src={recipe.imageUrl} alt={name} />
                        </div>
                        <div className="detail-panel">
                            <p className='content'>Cooking Time:
                            <b>{recipe.cookingTimeInMinutes} minutes</b></p>
                            <ul>
                                {recipe.ingredients.map((v, i) => <Ingredients key={i} {...v} />)}
                            </ul>
                        </div>
                    </div>
                ) : (
                        notFound ? (
                            <p className="not-found">
                                Sorry, this recipe doesn't exist or may have been removed
                            </p>
                        ) : (
                                <p className="loading">Loading Recipe....</p>
                            )
                    )}
            </div>
        );
    }
}

export default Recipe;
