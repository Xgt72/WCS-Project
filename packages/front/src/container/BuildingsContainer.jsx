import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container, Row, Button,
} from 'reactstrap';
import { addBuilding, updateIndicators, initBuildings } from '../redux/actions/actions';
import PlayerIndicatorsContainer from './PlayerIndicatorsContainer';


class BuildingsComponent extends Component {
  constructor(props) {
    super(props);
    this.buyBuilding = this.buyBuilding.bind(this);
  }

  componentDidMount() {
    const { playerId, addBuilding, updateIndicators, playerToken } = this.props;

    fetch(`/getOnePlayerBuildings/${playerId}`,
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

  async buyBuilding(template_id) {
    const { playerId, addBuilding, updateIndicators, playerToken } = this.props;
    const buildingInfo = { player_id: playerId, building_template_id: template_id };
    await fetch('/buyBuilding',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'auth-token': `${playerToken}`,
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

  componentWillUnmount() {
    const { initBuildings } = this.props;
    initBuildings();
  }

  render() {
    return (
      <>
        <Container>
          <PlayerIndicatorsContainer />
          <Row className="justify-content-around">
            <Button className="genericButton m-2" onClick={() => this.buyBuilding(1)}>Buy a Classroom</Button>
            <Button className="genericButton m-2" onClick={() => this.buyBuilding(2)}>Buy a Parking</Button>
            <Button className="genericButton m-2" onClick={() => this.buyBuilding(3)}>Buy a Cafeteria</Button>
            <Button className="genericButton m-2" onClick={() => this.buyBuilding(4)}>Buy a Dorms</Button>
          </Row>
          <Row className="justify-content-around">
            {this.props.playerBuildings.map((building) => <p key={building.id} className="m-2">{building.name}</p>)}
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerId: state.playerId,
  playerBuildings: state.playerBuildings,
  playerToken: state.playerToken,
});

const mapDispatchToProps = {
  addBuilding,
  updateIndicators,
  initBuildings,
};

const BuildingsContainer = connect(mapStateToProps, mapDispatchToProps)(BuildingsComponent);

BuildingsComponent.propTypes = {
  playerId: PropTypes.number.isRequired,
  playerBuildings: PropTypes.array.isRequired,
  playerToken: PropTypes.string.isRequired,
  addBuilding: PropTypes.func.isRequired,
  updateIndicators: PropTypes.func.isRequired,
  initBuildings: PropTypes.func.isRequired,
};

export default BuildingsContainer;
