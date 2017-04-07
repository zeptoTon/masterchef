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
  render() {
    return (
    <Router>
        <div>
            <h1>Welcome</h1>
            <Switch>
                <Route path='/pages/:page' component={RecipeList} />
                <Route path='/recipes/:name' component={Recipe} />
                <Route path='/' component={RecipeList} />
            </Switch>
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