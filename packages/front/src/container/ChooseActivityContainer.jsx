import React, { Component } from "react";
import "./chooseActivity.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { displayChooseActivities, addActivityInCMC, removeActivityInCMC } from '../redux/actions/actions';
import { Container, Row, Col } from "reactstrap";

class ChooseActivityComponent extends Component {

    validateActivity = (e) => {
        const { addActivityInCMC, campusManagerIdToDisplaySchedule } = this.props;
        let activityId = e.currentTarget.id;
        let activityDay = this.props.periodSelected.offsetParent.childNodes[0].childNodes[0].innerText;
        switch (activityDay) {
            case "Monday":
                activityDay = 1;
                break;
            case "Tuesday":
                activityDay = 2;
                break;
            case "Wednesday":
                activityDay = 3;
                break;
            case "Thursday":
                activityDay = 4;
                break;
            case "Friday":
                activityDay = 5;
                break;
            default:
                break;
        }
        let activityPeriod = this.props.periodSelected.classList[1];

        let activity = {
            campus_manager_id: this.props.campusManagerIdToDisplaySchedule,
            activity_id: activityId,
            morning: activityPeriod === "morning" ? true : false,
            afternoon: activityPeriod === "afternoon" ? true : false,
            day: activityDay
        };

        fetch(`/getActivityById/${activityId}`)
            .then(res => res.json())
            .then(data => {
                this.props.periodSelected.innerHTML = `<p>${data.name}</>`;
                this.props.periodSelected.style.backgroundColor = `#${data.color}`;
                this.props.periodSelected.childNodes[0].style.color = "black";

                // update the state of campusManagerPlanning, in the store
                addActivityInCMC(activity, campusManagerIdToDisplaySchedule);

                this.props.displayChooseActivities(false);
            });
    }

    removeActivity = () => {
        const { removeActivityInCMC, campusManagerIdToDisplaySchedule } = this.props;
        if (this.props.periodSelected.innerHTML !== "<p>Add activity</p>") {
            let activityDay = this.props.periodSelected.offsetParent.childNodes[0].childNodes[0].innerText;
            switch (activityDay) {
                case "Monday":
                    activityDay = 1;
                    break;
                case "Tuesday":
                    activityDay = 2;
                    break;
                case "Wednesday":
                    activityDay = 3;
                    break;
                case "Thursday":
                    activityDay = 4;
                    break;
                case "Friday":
                    activityDay = 5;
                    break;
                default:
                    break;
            }
            let activityPeriod = this.props.periodSelected.classList[1];

            let activityToRemove = {
                morning: activityPeriod === "morning" ? true : false,
                afternoon: activityPeriod === "afternoon" ? true : false,
                day: activityDay
            };

            // remove activity into the state of campusManagerPlanning, in the store
            removeActivityInCMC(activityToRemove, campusManagerIdToDisplaySchedule);

            this.props.periodSelected.innerHTML = "<p>Add activity</>";
            this.props.periodSelected.style.backgroundColor = "rgba(244, 113, 115, 0.3)";
            this.props.periodSelected.childNodes[0].style.color = "grey";
        }
        this.props.displayChooseActivities(false);
    }

    render() {
        const { opacity, zIndex, activitiesTemplate } = this.props;
        return (
            <div className="chooseActivity" style={{ opacity: opacity, zIndex: zIndex }}>
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col className="activitiesChoice">
                            <h3>Choose an activity to add</h3>
                            <Row className="no-gutters justify-content-around">
                                {activitiesTemplate.map(
                                    activity =>
                                        <Col
                                            key={activity.id}
                                            id={activity.id}
                                            className="selectActivity text-center m-2"
                                            xs="5"
                                            md="4"
                                            lg="3"
                                            onClick={this.validateActivity}
                                        >
                                            <h4>{activity.name}</h4>
                                            <p>cost: {activity.value}€</p>
                                        </Col>
                                )}
                                <Col
                                    className="removeActivity text-center m-2"
                                    xs="5"
                                    md="4"
                                    lg="3"
                                    onClick={this.removeActivity}
                                >
                                    <h4>Remove activity</h4>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    campusManagerIdToDisplaySchedule: state.campusManagerIdToDisplaySchedule,
});

const mapDispatchToProps = {
    displayChooseActivities,
    addActivityInCMC,
    removeActivityInCMC,
};

const ChooseActivityContainer = connect(mapStateToProps, mapDispatchToProps)(ChooseActivityComponent);

ChooseActivityComponent.propTypes = {
    displayChooseActivities: PropTypes.func.isRequired,
    addActivityInCMC: PropTypes.func.isRequired,
    removeActivityInCMC: PropTypes.func.isRequired,
    campusManagerIdToDisplaySchedule: PropTypes.number.isRequired,
};

export default ChooseActivityContainer;