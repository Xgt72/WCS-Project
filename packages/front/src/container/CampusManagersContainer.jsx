import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
    Container, Row, Col
} from 'reactstrap';
import DayActivities from "../components/DayActivities";
import DayHours from "../components/DayHours";

class CampusManagersComponent extends Component {

    componentDidMount() {
        let activities = document.getElementsByClassName("addActivity");
        for (let i = 0; i < activities.length; i++) {
            activities[i].addEventListener("click", this.chooseActivity);
        }
    }

    chooseActivity = (e) => {
        console.log(e.target);
    }

    render() {
        return (
            <>
                <Container>
                    <Row className="no-gutters mt-2">
                        <Col className="mx-xs-1 ml-md-4 mr-lg-1 my-2" md="6" lg="3">
                            <Row className="no-gutters">
                                <Col className="mt-5" xs="4" lg="4">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities dayName="Monday" />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 ml-md-4 mx-lg-1 my-2" md="4" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-md-none" xs="4">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities dayName="Tuesday" />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 ml-md-4 mx-lg-1 my-2" md="6" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-lg-none" xs="4" md="4" lg="1">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities dayName="Wednesday" />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 ml-md-4 mx-lg-1 my-2" md="4" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-md-none" xs="4">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities dayName="Thuesday" />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 mx-md-auto mx-lg-1 my-2" md="6" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-lg-none" xs="4" md="4" lg="2">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities dayName="Friday" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

// const mapStateToProps = (state) => ({
//     playerId: state.playerId,
//     playerBuildings: state.playerBuildings,
//   });

//   const mapDispatchToProps = {
//     addBuilding,
//     updateIndicators,
//   };

//   const BuildingsContainer = connect(mapStateToProps, mapDispatchToProps)(BuildingsComponent);

//   BuildingsComponent.propTypes = {
//     playerId: PropTypes.number.isRequired,
//     playerBuildings: PropTypes.array.isRequired,
//     addBuilding: PropTypes.func.isRequired,
//     updateIndicators: PropTypes.func.isRequired,
//   };

export default CampusManagersComponent;