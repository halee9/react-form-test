import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link, Redirect
} from 'react-router-dom'
import FormLevelExample from './FormLevelExample';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={FormLevelExample}/>
      </Router>
    );
  }
}

export default App;
