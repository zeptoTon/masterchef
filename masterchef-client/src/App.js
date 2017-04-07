import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
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

    componentDidMount() {
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
    render() {
        const { numberOfPages, numberOfRecipes, notFound } = this.state;
        return (
            <Router>
                <div>
                    <h1>Welcome</h1>
                    {notFound ? (
                        <p>Server is busy at the moment. Please try again later.</p>
                    ) : (
                            <Switch >
                                <Route path='/pages/:page' render={props => <RecipeList {...props} numberOfPages={numberOfPages} numberOfRecipes={numberOfRecipes} />} />
                                <Route path='/recipes/:name' component={Recipe} />
                                <Route path='/' render={props => <RecipeList {...props} numberOfPages={numberOfPages} numberOfRecipes={numberOfRecipes} />} />
                            </Switch>
                        )}
                </div>
            </Router>
        );
    }
}

export default App;



        // <div className="App">
        //     <div className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <h2>Welcome to React</h2>
        //     </div>
        //     <p className="App-intro">
        //     To get started, edit <code>src/App.js</code> and save to reload.
        //     </p>
        // </div>