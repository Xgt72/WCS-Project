import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import { addBuilding, updateIndicators } from '../redux/actions/actions';
import PlayerIndicatorsContainer from './PlayerIndicatorsContainer';


class BuildingsComponent extends Component {
  constructor(props) {
    super(props);
    this.buyBuilding = this.buyBuilding.bind(this);
  }

  componentDidMount() {
    const { playerId, addBuilding, updateIndicators } = this.props;

    fetch(`/getOnePlayerBuildings/${playerId}`,
      {
        method: 'GET',
        headers: new Headers(),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            addBuilding(res[i]);
          }
        },
      )
      .catch(
        (err) => {
          console.log(err.message);
        },
      );


    fetch(`/getIndicatorsByPlayerId/${playerId}`,
      {
        method: 'GET',
        headers: new Headers(),
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

  async buyBuilding(template_id) {
    const { playerId, addBuilding, updateIndicators } = this.props;
    const buildingInfo = { player_id: playerId, building_template_id: template_id };
    await fetch('/buyBuilding',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(buildingInfo),
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
            addBuilding(res.building);
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
        headers: new Headers(),
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
    return (
      <>
        <Container>
          <PlayerIndicatorsContainer />
          <Row>
            <Col sm="6" xl="3">
              <Button onClick={() => this.buyBuilding(1)}>Buy a Classroom</Button>
            </Col>
            <Col sm="6" xl="3">
              <Button onClick={() => this.buyBuilding(2)}>Buy a Parking</Button>
            </Col>
            <Col sm="6" xl="3">
              <Button onClick={() => this.buyBuilding(3)}>Buy a Cafeteria</Button>
            </Col>
            <Col sm="6" xl="3">
              <Button onClick={() => this.buyBuilding(4)}>Buy a Dorms</Button>
            </Col>
          </Row>
          <Row>
            {this.props.playerBuildings.map((building) => <Col sm="6" xl="3" key={building.id}><p>{building.name}</p></Col>)}
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerId: state.playerId,
  playerBuildings: state.playerBuildings,
});

const mapDispatchToProps = {
  addBuilding,
  updateIndicators,
};

const BuildingsContainer = connect(mapStateToProps, mapDispatchToProps)(BuildingsComponent);

BuildingsComponent.propTypes = {
  playerId: PropTypes.number.isRequired,
  playerBuildings: PropTypes.array.isRequired,
  addBuilding: PropTypes.func.isRequired,
  updateIndicators: PropTypes.func.isRequired,
};

export default BuildingsContainer;
