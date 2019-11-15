import React, { Component } from 'react';
import "./app.css";
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Header from './components/Header';
import BuildingsContainer from './container/BuildingsContainer';
import PlayerMenuComponent from './container/PlayerMenu';
import CampusManagementComponent from "./container/CampusManagementContainer";
import CampusManagersContainer from "./container/CampusManagersContainer";
import TrainersComponent from "./container/TrainersContainer";
import { initActivitiesTemplate } from './redux/actions/actions';

class AppComponent extends Component {

  componentDidMount() {
    const { initActivitiesTemplate } = this.props;
    fetch("/getAllActivities")
      .then(res => res.json())
      .then(data => {
        let activities = data.length > 12 ? data.splice(0, 12) : data;
        initActivitiesTemplate(activities);
      });
  }

  render() {
    return (
      <div>
        <PlayerMenuComponent />
        <Switch>
          <Route exact path="/" component={Header} />
          <Route path="/buildings" component={BuildingsContainer} />
          <Route path="/campusManagement" component={CampusManagementComponent} />
          <Route path="/campusManagers" component={CampusManagersContainer} />
          <Route path="/trainers" component={TrainersComponent} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerId: state.playerId
});

const mapDispatchToProps = {
  initActivitiesTemplate,
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

AppComponent.propTypes = {
  playerId: PropTypes.number.isRequired,
  initActivitiesTemplate: PropTypes.func.isRequired,
};

export default AppContainer;
