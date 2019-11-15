import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Container, Row, Col
} from 'reactstrap';
import { displayChooseActivities } from '../redux/actions/actions';
import DayActivities from "../components/DayActivities";
import DayHours from "../components/DayHours";
import ChooseActivityContainer from '../components/ChooseActivity';

class CampusManagersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseActivityDisplay: {
                opacity: "0",
                zIndex: "-100",
            },
            periodSelected: undefined,

        };
    }

    componentDidMount() {
        let activities = document.getElementsByClassName("addActivity");
        for (let i = 0; i < activities.length; i++) {
            activities[i].addEventListener("click", this.chooseActivity);
        }
    }

    chooseActivity = (e) => {
        if (e.target.classList.length > 0) {
            this.setState({
                periodSelected: e.target
            });
        } else {
            this.setState({
                periodSelected: e.target.offsetParent
            });
        }
        this.props.displayChooseActivities(true);
        this.setState({
            chooseActivityDisplay: {
                opacity: "1",
                zIndex: "100",
            }
        });

    }

    render() {
        const { opacity, zIndex, } = this.state.chooseActivityDisplay;
        let { activitiesTemplate, chooseActivitiesIsDisplay } = this.props;
        let tpl = activitiesTemplate.slice(0,7);

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
                                    <DayActivities dayName="Monday" action={this.chooseActivity} />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 ml-md-4 mx-lg-1 my-2" md="4" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-md-none" xs="4">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities dayName="Tuesday" action={this.chooseActivity} />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 ml-md-4 mx-lg-1 my-2" md="6" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-lg-none" xs="4" md="4" lg="1">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities dayName="Wednesday" action={this.chooseActivity} />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 ml-md-4 mx-lg-1 my-2" md="4" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-md-none" xs="4">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities dayName="Thuesday" action={this.chooseActivity} />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-xs-1 mx-md-auto mx-lg-1 my-2" md="6" lg="2">
                            <Row className="no-gutters">
                                <Col className="mt-5 d-lg-none" xs="4" md="4" lg="2">
                                    <DayHours />
                                </Col>
                                <Col>
                                    <DayActivities dayName="Friday" action={this.chooseActivity} />
                                </Col>
                            </Row>
                        </Col>
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
});

const mapDispatchToProps = {
    displayChooseActivities,
};

const CampusManagersContainer = connect(mapStateToProps, mapDispatchToProps)(CampusManagersComponent);

CampusManagersComponent.propTypes = {
    playerId: PropTypes.number.isRequired,
    activitiesTemplate: PropTypes.array.isRequired,
    displayChooseActivities: PropTypes.func.isRequired,
};

export default CampusManagersContainer;