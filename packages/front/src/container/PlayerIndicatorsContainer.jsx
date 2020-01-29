import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { updateIndicators } from '../redux/actions/actions';
import './playerIndicators.css';
import Indicator from '../components/Indicator';

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class PlayerIndicatorsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player_name: '',
    };
  }

  componentDidMount() {
    const { playerId, playerToken } = this.props;
    // get the player name
    fetch(`${SERVER_ADDRESS}/getPlayerById/${playerId}`,
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
          this.setState({ player_name: res.playerName });
        },
      )
      .catch(
        (err) => {
          console.log(err.message);
        },
      );
  }

  render() {
    const { playerIndicators } = this.props;
    const { player_name } = this.state;
    return (
      <Container>
        <h2 className="text-center">{player_name}</h2>
        <Row className="no-gutters justify-content-around">
          {playerIndicators.map(
            (indicator) => (
              <Indicator key={indicator.id} name={indicator.name} value={indicator.value} />
            ),
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  playerId: state.playerId,
  playerIndicators: state.playerIndicators,
  playerToken: state.playerToken,
});

const mapDispatchToProps = {
  updateIndicators,
};

const PlayerIndicatorsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerIndicatorsComponent);

PlayerIndicatorsComponent.propTypes = {
  playerId: PropTypes.number.isRequired,
  playerIndicators: PropTypes.array.isRequired,
  playerToken: PropTypes.string.isRequired,
  updateIndicators: PropTypes.func.isRequired,
};

export default PlayerIndicatorsContainer;
