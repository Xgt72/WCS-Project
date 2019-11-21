import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { displayChooseActivities, campusManagerCalendarIsSaved } from '../redux/actions/actions';
import {
    Container, Row, Col, Button
} from 'reactstrap';
import DayActivities from "../components/DayActivities";
import DayHours from "../components/DayHours";
import ChooseActivityContainer from './ChooseActivityContainer';

class CampusManagersScheduleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseActivityDisplay: {
                opacity: "0",
                zIndex: "-100",
            },
            periodSelected: undefined,
            updatedCalendar: {
                monday: {
                    morning: null,
                    afternoon: null
                },
                tuesday: {
                    morning: null,
                    afternoon: null
                },
                wednesday: {
                    morning: null,
                    afternoon: null
                },
                thursday: {
                    morning: null,
                    afternoon: null
                },
                friday: {
                    morning: null,
                    afternoon: null
                }
            },
            campusManagerName: "",
        };
    }

    componentDidMount() {
        this.organizeCalendar();
        fetch(`/getPlayerCampusManagerById/${this.props.campusManagerIdToDisplaySchedule}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.statusText);
            })
            .then(data => {
                this.setState({ campusManagerName: data.name });
            })
            .catch(
                (err) => {
                    console.log(err.message);
                },
            );

    }

    chooseActivity = (e) => {
        this.setState({
            periodSelected: e.currentTarget
        });
        this.props.displayChooseActivities(true);
        this.setState({
            chooseActivityDisplay: {
                opacity: "1",
                zIndex: "100",
            }
        });
    }

    validatePlanning = () => {
        const { campusManagerOneCalendar, campusManagerTwoCalendar, campusManagerIdToDisplaySchedule, campusManagerCalendarIsSaved } = this.props;
        let updatedCalendar = campusManagerIdToDisplaySchedule === campusManagerOneCalendar.campusManagerId ?
            campusManagerOneCalendar.calendar :
            campusManagerTwoCalendar.calendar;

        if (updatedCalendar.length > 0) {
            fetch(`/getCampusManagerActivitiesCalendarByCampusManagerId/${campusManagerIdToDisplaySchedule}`)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error(res.statusText);
                })
                .then(
                    (res) => {
                        if (res.length > 0) {
                            for (let i = 0; i < res.length; i++) {
                                fetch(`/deleteCampusManagerActivityCalendar/${res[i].id}`,
                                    {
                                        method: 'DELETE',
                                        headers: new Headers({
                                            'Content-Type': 'application/json',
                                        }),
                                    })
                                    .then((res) => {
                                        if (res.ok) {
                                            return res.json();
                                        }
                                        throw new Error(res.statusText);
                                    })
                                    .catch(
                                        (err) => {
                                            console.log(err.message);
                                        },
                                    );
                            }
                        }
                        let calendar = {
                            campus_manager_id: campusManagerIdToDisplaySchedule,
                            activities: updatedCalendar
                        };
                        fetch("/addActivitiesInCampusManagerCalendar",
                            {
                                method: 'POST',
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                }),
                                body: JSON.stringify(calendar),
                            })
                            .then((res) => {
                                if (res.ok) {
                                    return res.json();
                                }
                                throw new Error(res.statusText);
                            })
                            .then(
                                (res) => {
                                    if (typeof res === 'object') {
                                        campusManagerCalendarIsSaved(campusManagerIdToDisplaySchedule);
                                        alert("schedule saved");
                                    } else {
                                        alert(res);
                                    }
                                },
                            )
                            .catch(
                                (err) => {
                                    console.log(err.message);
                                },
                            );
                    },
                )
                .catch(
                    (err) => {
                        console.log(err.message);
                    },
                );
        }
    }

    organizeCalendar = () => {
        let { activitiesTemplate, campusManagerOneCalendar, campusManagerTwoCalendar, campusManagerIdToDisplaySchedule } = this.props;

        let updatedCalendar = this.state.updatedCalendar;
        let previousCalendar = [];

        if (campusManagerIdToDisplaySchedule === campusManagerOneCalendar.campusManagerId) {
            previousCalendar = campusManagerOneCalendar.calendar;
        } else if (campusManagerIdToDisplaySchedule === campusManagerTwoCalendar.campusManagerId) {
            previousCalendar = campusManagerTwoCalendar.calendar;
        }

        previousCalendar.map(activity => {
            let { name, color } = activitiesTemplate[activity.activity_id - 1];

            switch (activity.day) {
                case 1:
                    if (activity.morning) {
                        updatedCalendar.monday.morning = { name: name, color: color };
                    } else {
                        updatedCalendar.monday.afternoon = { name: name, color: color };
                    }
                    break;
                case 2:
                    if (activity.morning) {
                        updatedCalendar.tuesday.morning = { name: name, color: color };
                    } else {
                        updatedCalendar.tuesday.afternoon = { name: name, color: color };
                    }
                    break;
                case 3:
                    if (activity.morning) {
                        updatedCalendar.wednesday.morning = { name: name, color: color };
                    } else {
                        updatedCalendar.wednesday.afternoon = { name: name, color: color };
                    }
                    break;
                case 4:
                    if (activity.morning) {
                        updatedCalendar.thursday.morning = { name: name, color: color };
                    } else {
                        updatedCalendar.thursday.afternoon = { name: name, color: color };
                    }
                    break;
                case 5:
                    if (activity.morning) {
                        updatedCalendar.friday.morning = { name: name, color: color };
                    } else {
                        updatedCalendar.friday.afternoon = { name: name, color: color };
                    }
                    break;
                default:
                    break;
            }
            return activity;
        });
        this.setState({ updatedCalendar: updatedCalendar });
    }

    render() {
        const { opacity, zIndex, } = this.state.chooseActivityDisplay;
        let { activitiesTemplate, chooseActivitiesIsDisplay } = this.props;
        let tpl = activitiesTemplate.slice(0, 7);

        return (
            <>
                <Container>
                    {this.state.campusManagerName !== "" &&
                        <Row>
                            <h2 className="w-100">Schedule of {this.state.campusManagerName}</h2>
                        </Row>
                    }
                    <Row className="no-gutters mt-2">
                        <Col className="mx-xs-1 ml-md-4 mr-lg-1 my-2" md="6" lg="3">
                            <Row className="no-gutters">
                                <Col className="mt-5" xs="4" lg="4">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities
                                        dayName="Monday"
                                        action={this.chooseActivity}
                                        dayActivities={this.state.updatedCalendar.monday}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 ml-md-4 mx-lg-1 my-2" md="4" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-md-none" xs="4">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities
                                        dayName="Tuesday"
                                        action={this.chooseActivity}
                                        dayActivities={this.state.updatedCalendar.tuesday}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 ml-md-4 mx-lg-1 my-2" md="6" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-lg-none" xs="4" md="4" lg="1">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities
                                        dayName="Wednesday"
                                        action={this.chooseActivity}
                                        dayActivities={this.state.updatedCalendar.wednesday}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 ml-md-4 mx-lg-1 my-2" md="4" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-md-none" xs="4">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities
                                        dayName="Thursday"
                                        action={this.chooseActivity}
                                        dayActivities={this.state.updatedCalendar.thursday}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 mx-md-auto mx-lg-1 my-2" md="6" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-lg-none" xs="4" md="4" lg="2">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities
                                        dayName="Friday"
                                        action={this.chooseActivity}
                                        dayActivities={this.state.updatedCalendar.friday}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Row className="no-gutters justify-content-around w-100 m-2">
                            <Button
                                type="button"
                                className="genericButton m-2"
                                onClick={() => { this.validatePlanning() }}
                            >
                                Validate this schedule
                            </Button>
                            <Link to="/campusManagersOffice">
                                <Button
                                    type="button"
                                    className="genericButton m-2"
                                >
                                    Go back to the Campus Managers Office
                                </Button>
                            </Link>
                        </Row>
                    </Row>
                </Container>
                {chooseActivitiesIsDisplay &&
                    <ChooseActivityContainer
                        opacity={opacity}
                        zIndex={zIndex}
                        activitiesTemplate={tpl}
                        periodSelected={this.state.periodSelected}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.playerId,
    activitiesTemplate: [...state.activitiesTemplate],
    chooseActivitiesIsDisplay: state.chooseActivitiesIsDisplay,
    campusManagerOneCalendar: state.campusManagerOneCalendar,
    campusManagerTwoCalendar: state.campusManagerTwoCalendar,
    campusManagerIdToDisplaySchedule: state.campusManagerIdToDisplaySchedule,
});

const mapDispatchToProps = {
    displayChooseActivities,
    campusManagerCalendarIsSaved,
};

const CampusManagersScheduleContainer = connect(mapStateToProps, mapDispatchToProps)(CampusManagersScheduleComponent);

CampusManagersScheduleComponent.propTypes = {
    playerId: PropTypes.number.isRequired,
    activitiesTemplate: PropTypes.array.isRequired,
    chooseActivitiesIsDisplay: PropTypes.bool.isRequired,
    campusManagerOneCalendar: PropTypes.object.isRequired,
    campusManagerTwoCalendar: PropTypes.object.isRequired,
    campusManagerIdToDisplaySchedule: PropTypes.number.isRequired,
    displayChooseActivities: PropTypes.func.isRequired,
    campusManagerCalendarIsSaved: PropTypes.func.isRequired,
};

export default CampusManagersScheduleContainer;