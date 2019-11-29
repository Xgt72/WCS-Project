import React, { Component } from 'react';
import "./app.css";
import { Switch, Route, Redirect } from 'react-router-dom';
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
import PlayerLoginContainer from "./container/PlayerLoginContainer";

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
    const { isLogged } = this.props;
    return (
      <div>
        <PlayerMenuComponent />
        <Switch>
          <Route exact path="/" component={Header} />
          <Route exact path="/buildings">
            {isLogged ? <BuildingsContainer /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/campusManagement">
            {isLogged ? <CampusManagementComponent /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/campusManagersOffice">
            {isLogged ? <CampusManagersOfficeContainer /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/campusManagers">
            {isLogged ? <CampusManagersScheduleContainer /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/trainers">
            {isLogged ? <TrainersComponent /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/playerLogin" component={PlayerLoginContainer} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerId: state.playerId,
  isLogged: state.isLogged,
});

const mapDispatchToProps = {
  initActivitiesTemplate,
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

AppComponent.propTypes = {
  playerId: PropTypes.number.isRequired,
  isLogged: PropTypes.bool.isRequired,
  initActivitiesTemplate: PropTypes.func.isRequired,
};

export default AppContainer;
