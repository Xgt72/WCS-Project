import React, { Component } from "react";
import "./hireTeacher.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { displayHireTeacher, updateTeachersOffice, updateIndicators } from '../redux/actions/actions';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Button,
} from "reactstrap";

class HireTeacherComponent extends Component {

    async hireTeacher(name) {
        const {
            playerId,
            teachersOffice,
            displayHireTeacher,
            updateTeachersOffice,
            updateIndicators,
            playerToken
        } = this.props;
        const teacher = {
            player_id: playerId,
            teacherName: name
        }
        await fetch("/hireTeacher",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'auth-token': `${playerToken}`,
                }),
                body: JSON.stringify(teacher),
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
                        updateTeachersOffice([...teachersOffice, res.teacher]);
                        alert("you hired this trainer");
                        displayHireTeacher(false);
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

        await fetch(`/getIndicatorsByPlayerId/${playerId}`,
            {
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
            .then(
                (res) => {
                    const indicators = res.slice(0, 4);
                    updateIndicators(indicators);
                },
            )
            .catch(
                (err) => {
                    console.log(err.message);
                },
            );
    }

    render() {
        const { opacity, zIndex } = this.props;
        return (
            <div className="hireTeacher" style={{ opacity: opacity, zIndex: zIndex }}>
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col className="activitiesChoice">
                            <h3>Choose the trainer you want to hire</h3>
                            <Row className="no-gutters justify-content-around">
                                <Col className="teacher m-3" xs="8" md="5" lg="3">
                                    <Card>
                                        <CardImg top width="20%" src="https://via.placeholder.com/300" alt="Elisabeth" />
                                        <CardBody className="d-flex flex-column align-items-center">
                                            <CardTitle className="text-center">Elisabeth</CardTitle>
                                            <Button
                                                className="genericButton d-block"
                                                onClick={() => { this.hireTeacher("Elisabeth") }}
                                            >
                                                Hire
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="teacher m-3" xs="8" md="5" lg="3">
                                    <Card>
                                        <CardImg top width="20%" src="https://via.placeholder.com/300" alt="Nicolas" />
                                        <CardBody className="d-flex flex-column align-items-center">
                                            <CardTitle className="text-center">Nicolas</CardTitle>
                                            <Button
                                                className="genericButton d-block"
                                                onClick={() => { this.hireTeacher("Nicolas") }}
                                            >
                                                Hire
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="teacher m-3" xs="8" md="5" lg="3">
                                    <Card>
                                        <CardImg top width="20%" src="https://via.placeholder.com/300" alt="Basile" />
                                        <CardBody className="d-flex flex-column align-items-center">
                                            <CardTitle className="text-center">Basile</CardTitle>
                                            <Button
                                                className="genericButton d-block"
                                                onClick={() => { this.hireTeacher("Basile") }}
                                            >
                                                Hire
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="teacher m-3" xs="8" md="5" lg="3">
                                    <Card>
                                        <CardImg top width="20%" src="https://via.placeholder.com/300" alt="Jenny" />
                                        <CardBody className="d-flex flex-column align-items-center">
                                            <CardTitle className="text-center">Jenny</CardTitle>
                                            <Button
                                                className="genericButton d-block"
                                                onClick={() => { this.hireTeacher("Jenny") }}
                                            >
                                                Hire
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.playerId,
    teachersOffice: state.teachersOffice,
    playerToken: state.playerToken,
});

const mapDispatchToProps = {
    displayHireTeacher,
    updateTeachersOffice,
    updateIndicators,
};

const HireTeacherContainer = connect(mapStateToProps, mapDispatchToProps)(HireTeacherComponent);

HireTeacherComponent.propTypes = {
    playerId: PropTypes.number.isRequired,
    teachersOffice: PropTypes.array.isRequired,
    playerToken: PropTypes.string.isRequired,
    displayHireTeacher: PropTypes.func.isRequired,
    updateTeachersOffice: PropTypes.func.isRequired,
    updateIndicators: PropTypes.func.isRequired,
};

export default HireTeacherContainer;