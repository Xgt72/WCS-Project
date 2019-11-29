import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
    Container, Row, Col, Button
} from 'reactstrap';

class PlayerMenuComponent extends Component {

    login = () => {
        alert("you're login");
    }

    render() {
        return (
            <>
                <Container>
                    <Row className="justify-content-around m">
                        <Link to="/buildings">
                            <Button
                                className="genericButton m-2"
                            >
                                Buildings
                            </Button>
                        </Link>
                        <Link to="/campusManagement">
                            <Button
                                className="genericButton m-2"
                            >
                                Campus Management
                            </Button>
                        </Link>
                        <Link to="/campusManagersOffice">
                            <Button
                                className="genericButton m-2"
                            >
                                Campus Managers Office
                            </Button>
                        </Link>
                        <Link to="/trainers">
                            <Button
                                className="genericButton m-2"
                            >
                                Trainers
                            </Button>
                        </Link>
                        <Link to="/playerLogin">
                            <Button
                                className="genericButton m-2"
                            >
                                Login
                            </Button>
                        </Link>
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

export default PlayerMenuComponent;