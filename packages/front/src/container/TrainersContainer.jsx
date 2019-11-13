import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
    Container, Row, Col, Button,
} from 'reactstrap';

class TrainerComponent extends Component {
    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <p>Trainers works</p>
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

export default TrainerComponent;