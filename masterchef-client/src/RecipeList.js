import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RecipeList.css';


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
            page: props.match.params.page || 1,
            recipes: null,
        };
    }

    _getRecipes () {
        if (this.props.numberOfRecipes >= this.state.page) {
            fetch(`/pages/${this.state.page}.json`)
                .then(res => res.json())
                .then(recipes => {
                    this.setState({ recipes });
                });
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            'page': parseInt(nextProps.match.params.page, 10)
        });
    }

    componentDidMount () {
        this._getRecipes();
    }
    componentDidUpdate (prevProps, prevState) {

        if (prevProps.numberOfRecipes !== this.props.numberOfRecipes ||
            this.state.page !== prevState.page) {
            this._getRecipes();
        }
    }

    render () {
        const { numberOfPages, numberOfRecipes } = this.props;
        const { recipes, page } = this.state;
        const nextPage = parseInt(page, 10) + 1;
        const prevPage = parseInt(page, 10) - 1;
        return (
            <div>
                {numberOfRecipes !== 0 ? (
                    recipes ? (
                        <div className="recipe-list">
                            <table >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Cooking Time</th>
                                        <th>Main Ingredients</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipes.map(v => <RecipeRow key={v.name} {...v} />)}
                                </tbody>
                            </table>

                            <div className="pagination">
                                {0 < prevPage && <Link to={`/pages/${prevPage}`} >Prev</Link>}

                                {numberOfPages >= nextPage &&
                                    <Link to={`/pages/${nextPage}`} >Next</Link>}
                            </div>
                        </div>
                    ) : (<p>Loading...</p>)

                ) : (
                        <p>Sorry, we currently have no recipes for you</p>
                    )}
            </div>
        );
    }
}

export default RecipeList;
