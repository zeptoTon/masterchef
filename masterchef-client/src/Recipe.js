import React, { Component } from 'react';

/**
 * Helper function for Recipe Component
 * @param {name, quantity}
 */
const Ingredients = ({ name, quantity }) => {
    let description;
    if(typeof quantity === 'number'){
        description = `${quantity} x ${name}`;
    }else{
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
        this.state = {
            recipe: null,
            notFound: false
        };
    }

    componentDidMount() {
        const { name } = this.props.match.params;
        fetch(`/recipes/${name}.json`)
            .then((res)=>{
                if (res.status === 404) {
                    throw new Error();
                }
                return res;
            })
            .then(res => res.json())
            .then(recipe => {
                this.setState({ recipe });
            })
            .catch(err=>{
                this.setState({
                    'notFound': true
                });
            });
    }
    render() {
        const {recipe, notFound} = this.state;
        const { name } = this.props.match.params;

        return (
            <div className="Recipe">
                {recipe ? (
                    <div>
                        <h1>{name}</h1>
                        <p>Cooking Time: <b>{recipe.cookingTimeInMinutes} minutes</b></p>
                        <img src={recipe.imageUrl} alt={name} />
                        <ul>
                            {recipe.ingredients.map((v) => <Ingredients {...v} />)}
                        </ul>
                    </div>
                ) : (
                    notFound ? (
                        <p>Sorry, this recipe doesn't exist or may have been removed</p>
                    ) : (
                        <p>Loading Recipe....</p>
                    )
                )}
            </div>
        );
    }
}

export default Recipe;
