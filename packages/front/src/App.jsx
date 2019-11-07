import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import BuildingsContainer from './container/BuildingsContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Header} />
          <Route path="/buildings" component={BuildingsContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
