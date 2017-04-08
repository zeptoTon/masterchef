import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Recipe from './Recipe';
import RecipeList from './RecipeList';


class App extends Component {
    constructor() {
        super();
        this.state = {
            notFound: false,
            numberOfRecipes: null,
            numberOfPages: null
        };
    }

    componentDidMount () {
        fetch('/status')
            .then(res => {
                if (res.status === 404) {
                    throw new Error();
                }
                return res;
            })
            .then(res => res.json())
            .then(status => {
                this.setState({ ...status });
            })
            .catch(err => {
                this.setState({
                    'notFound': true
                });
            });
    }
    render () {
        const { numberOfPages, numberOfRecipes, notFound } = this.state;
        return (
            <Router>
                <div>
                    <h1>Welcome to MasterChef!</h1>
                    {notFound ? (
                        <p>Server is busy at the moment. Please try again later.</p>
                    ) : (
                            <div>
                                <Switch>
                                    <Route path='/pages/:page' render={props => <RecipeList {...props} numberOfPages={numberOfPages} numberOfRecipes={numberOfRecipes} />}>
                                    </Route>
                                    <Route path='/recipes/:name' component={Recipe} />
                                    <Redirect exact path='/' to="/pages/1" />
                                </Switch>
                            </div>
                        )}
                </div>
            </Router>
        );
    }
}

export default App;
