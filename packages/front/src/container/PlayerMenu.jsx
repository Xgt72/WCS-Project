import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {
    Container, Row, Col, Button
} from 'reactstrap';

class PlayerMenuComponent extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            value: null
        };
    }

    setRedirect = (value) => {
        this.setState({
            redirect: true,
            redirectTo: value
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            switch (this.state.redirectTo) {
                case 1:
                    return <Redirect to="/buildings" />
                case 2:
                    return <Redirect to="/campusManagement" />
                case 3:
                    return <Redirect to="/campusManagers" />
                case 4:
                    return <Redirect to="/trainers" />
                default:
                    break;
            }
        }
    }

    render() {
        return (
            <>
                {this.renderRedirect()}
                <Container>
                    <Row className="justify-content-around m">
                        <Button
                            className="genericButton m-2"
                            onClick={() => this.setRedirect(1)}
                        >
                            Buildings
                        </Button>
                        <Button
                            className="genericButton m-2"
                            onClick={() => this.setRedirect(2)}
                        >
                            Campus Management
                        </Button>
                        <Button
                            className="genericButton m-2"
                            onClick={() => this.setRedirect(3)}
                        >
                            Campus Managers
                        </Button>
                        <Button
                            className="genericButton m-2"
                            onClick={() => this.setRedirect(4)}
                        >
                            Trainers
                        </Button>
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