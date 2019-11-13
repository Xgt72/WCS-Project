import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { updateIndicators } from '../redux/actions/actions';
import './playerIndicators.css';
import Indicator from '../components/Indicator';

class PlayerIndicatorsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player_name: '',
    };
  }

  componentDidMount() {
    // get the player name
    fetch(`/getPlayerById/${this.props.playerId}`,
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
    return (
      <Container>
        <h2 className="text-center">{this.state.player_name}</h2>
        <Row>
          {this.props.playerIndicators.map(
            (indicator) => (
              <Col sm="6" xl="3" key={indicator.id}>
                <Indicator name={indicator.name} value={indicator.value} />
              </Col>
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
});

const mapDispatchToProps = {
  updateIndicators,
};

const PlayerIndicatorsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerIndicatorsComponent);

export default PlayerIndicatorsContainer;
