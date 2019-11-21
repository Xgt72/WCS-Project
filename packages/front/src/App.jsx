import React, { Component } from 'react';
import "./app.css";
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { initActivitiesTemplate } from './redux/actions/actions';
import PropTypes from 'prop-types';
import Header from './components/Header';
import BuildingsContainer from './container/BuildingsContainer';
import PlayerMenuComponent from './container/PlayerMenu';
import CampusManagementComponent from "./container/CampusManagementContainer";
import CampusManagersScheduleContainer from "./container/CampusManagersScheduleContainer";
import TrainersComponent from "./container/TrainersContainer";
import CampusManagersOfficeContainer from './container/CampusManagersOfficeContainer';

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
          <Route exact path="/buildings" component={BuildingsContainer} />
          <Route exact path="/campusManagement" component={CampusManagementComponent} />
          <Route exact path="/campusManagersOffice" component={CampusManagersOfficeContainer} />
          <Route exact path="/campusManagers" component={CampusManagersScheduleContainer} />
          <Route exact path="/trainers" component={TrainersComponent} />
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
