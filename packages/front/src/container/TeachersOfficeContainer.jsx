import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { updateTeachersOffice, displayHireTeacher, teacherIdCalendarToDisplay } from '../redux/actions/actions';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Button,
} from 'reactstrap';
import PlayerIndicatorsContainer from "../container/PlayerIndicatorsContainer";
import HireTeacherContainer from "../container/HireTeacherContainer";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class TeachersOfficeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hireTeacherDisplay: {
                opacity: "0",
                zIndex: "-100",
            }
        }
    }

    componentDidMount() {
        const { playerId, updateTeachersOffice, playerToken } = this.props;
        fetch(`${SERVER_ADDRESS}/getOnePlayerTeachers/${playerId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'auth-token': `${playerToken}`,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.statusText);
            })
            .then(data => {
                if (data.length > 0) {
                    updateTeachersOffice(data);
                }
            })
            .catch(
                (err) => {
                    console.log(err.message);
                },
            );
    }

    hireTeacher = (e) => {
        this.props.displayHireTeacher(true);
        this.setState({
            hireTeacherDisplay: {
                opacity: "1",
                zIndex: "100",
            },
        });
    };

    render() {
        const { opacity, zIndex } = this.state.hireTeacherDisplay;
        const { teachersOffice, hireTeacherIsDisplay, teacherIdCalendarToDisplay } = this.props;

        return (
            <>
                <Container>
                    <PlayerIndicatorsContainer />
                    <Row>
                        <h2 className="w-100">Trainers Office</h2>
                    </Row>
                    {
                        teachersOffice.length < 2 &&
                        <Row className="justify-content-center">
                            <Button
                                type="button"
                                className="genericButton"
                                onClick={this.hireTeacher}
                            >
                                Hire a new trainer
                            </Button>
                        </Row>
                    }
                    {
                        teachersOffice.length > 0 &&
                        <Row className="no-gutters justify-content-around">
                            {
                                teachersOffice.map(teacher =>
                                    <Col key={teacher.id} className="teacher m-3" xs="8" md="5" lg="3">
                                        <Card>
                                            <CardImg top width="20%" src="https://via.placeholder.com/300" alt={teacher.name} />
                                            <CardBody className="d-flex flex-column align-items-center">
                                                <CardTitle className="text-center">{teacher.name}</CardTitle>
                                                <Link to="/teacherSchedule" onClick={() => teacherIdCalendarToDisplay(teacher.id)}>
                                                    <Button
                                                        className="genericButton d-block"
                                                    >
                                                        Manage the schedule
                                                    </Button>
                                                </Link>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )
                            }
                        </Row>
                    }
                </Container>
                {hireTeacherIsDisplay &&
                    <HireTeacherContainer
                        opacity={opacity}
                        zIndex={zIndex}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.playerId,
    teachersOffice: state.teachersOffice,
    hireTeacherIsDisplay: state.hireTeacherIsDisplay,
    playerToken: state.playerToken,
});

const mapDispatchToProps = {
    updateTeachersOffice,
    displayHireTeacher,
    teacherIdCalendarToDisplay,
};

const TeachersOfficeContainer = connect(mapStateToProps, mapDispatchToProps)(TeachersOfficeComponent);

TeachersOfficeComponent.propTypes = {
    playerId: PropTypes.number.isRequired,
    teachersOffice: PropTypes.array.isRequired,
    hireTeacherIsDisplay: PropTypes.bool.isRequired,
    playerToken: PropTypes.string.isRequired,
    updateTeachersOffice: PropTypes.func.isRequired,
    displayHireTeacher: PropTypes.func.isRequired,
    teacherIdCalendarToDisplay: PropTypes.func.isRequired,
};

export default TeachersOfficeContainer;