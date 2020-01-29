import React, { Component } from "react";
import "./hireCampusManager.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { displayHireCampusManager, updateCampusManagersOffice, updateIndicators } from '../redux/actions/actions';
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

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class HireCampusManagerComponent extends Component {

    async hireCampusManager(name) {
        const {
            playerId,
            campusManagersOffice,
            displayHireCampusManager,
            updateCampusManagersOffice,
            updateIndicators,
            playerToken
        } = this.props;
        const campusManager = {
            player_id: playerId,
            campusManagerName: name
        }
        await fetch(`${SERVER_ADDRESS}/hireCampusManager`,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'auth-token': `${playerToken}`,
                }),
                body: JSON.stringify(campusManager),
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
                        updateCampusManagersOffice([...campusManagersOffice, res.campusManager]);
                        alert("you hired this campus manager");
                        displayHireCampusManager(false);
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

        await fetch(`${SERVER_ADDRESS}/getIndicatorsByPlayerId/${playerId}`,
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
            <div className="hireCampusManager" style={{ opacity: opacity, zIndex: zIndex }}>
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col className="activitiesChoice">
                            <h3>Choose the campus manager you want to hire</h3>
                            <Row className="no-gutters justify-content-around">
                                <Col className="campusManager m-3" xs="8" md="5" lg="3">
                                    <Card>
                                        <CardImg top width="20%" src="https://via.placeholder.com/300" alt="Marylou" />
                                        <CardBody className="d-flex flex-column align-items-center">
                                            <CardTitle className="text-center">Marylou</CardTitle>
                                            <Button
                                                className="genericButton d-block"
                                                onClick={() => { this.hireCampusManager("Marylou") }}
                                            >
                                                Hire
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="campusManager m-3" xs="8" md="5" lg="3">
                                    <Card>
                                        <CardImg top width="20%" src="https://via.placeholder.com/300" alt="Maxime" />
                                        <CardBody className="d-flex flex-column align-items-center">
                                            <CardTitle className="text-center">Maxime</CardTitle>
                                            <Button
                                                className="genericButton d-block"
                                                onClick={() => { this.hireCampusManager("Maxime") }}
                                            >
                                                Hire
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="campusManager m-3" xs="8" md="5" lg="3">
                                    <Card>
                                        <CardImg top width="20%" src="https://via.placeholder.com/300" alt="Clément" />
                                        <CardBody className="d-flex flex-column align-items-center">
                                            <CardTitle className="text-center">Clément</CardTitle>
                                            <Button
                                                className="genericButton d-block"
                                                onClick={() => { this.hireCampusManager("Clément") }}
                                            >
                                                Hire
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="campusManager m-3" xs="8" md="5" lg="3">
                                    <Card>
                                        <CardImg top width="20%" src="https://via.placeholder.com/300" alt="Laëticia" />
                                        <CardBody className="d-flex flex-column align-items-center">
                                            <CardTitle className="text-center">Laëticia</CardTitle>
                                            <Button
                                                className="genericButton d-block"
                                                onClick={() => { this.hireCampusManager("Laëticia") }}
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
    campusManagersOffice: state.campusManagersOffice,
    playerToken: state.playerToken,
});

const mapDispatchToProps = {
    displayHireCampusManager,
    updateCampusManagersOffice,
    updateIndicators,
};

const HireCampusManagerContainer = connect(mapStateToProps, mapDispatchToProps)(HireCampusManagerComponent);

HireCampusManagerComponent.propTypes = {
    playerId: PropTypes.number.isRequired,
    campusManagersOffice: PropTypes.array.isRequired,
    playerToken: PropTypes.string.isRequired,
    displayHireCampusManager: PropTypes.func.isRequired,
    updateCampusManagersOffice: PropTypes.func.isRequired,
    updateIndicators: PropTypes.func.isRequired,
};

export default HireCampusManagerContainer;