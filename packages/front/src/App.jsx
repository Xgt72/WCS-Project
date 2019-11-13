import React, { Component } from 'react';
import "./app.css";
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import BuildingsContainer from './container/BuildingsContainer';
import PlayerMenuComponent from './container/PlayerMenu';
import CampusManagementComponent from "./container/CampusManagementContainer";
import CampusManagersComponent from "./container/CampusManagersContainer";
import TrainersComponent from "./container/TrainersContainer";

class App extends Component {
  render() {
    return (
      <div>
        <PlayerMenuComponent />
        <Switch>
          <Route exact path="/" component={Header} />
          <Route path="/buildings" component={BuildingsContainer} />
          <Route path="/campusManagement" component={CampusManagementComponent} />
          <Route path="/campusManagers" component={CampusManagersComponent} />
          <Route path="/trainers" component={TrainersComponent} />
        </Switch>
      </div>
    );
  }
}

export default App;
