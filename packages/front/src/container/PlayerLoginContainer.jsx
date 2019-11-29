import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { updatePlayerToken, updatePlayerId, updateIsLogged } from '../redux/actions/actions';
import {
    Container,
    Row,
    Col,
    Button,
} from 'reactstrap';

class PlayerLoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    login = () => {
        const { email, password } = this.state;
        const { updatePlayerToken, updatePlayerId, updateIsLogged } = this.props;
        if (email !== "" && password !== "") {
            fetch("/api/player/login", {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'auth-token',
                    'Access-Control-Expose-Headers': 'auth-token',
                }),
                body: JSON.stringify({ email: email, password: password }),
            })
                .then((res) => {
                    if (res.ok) {
                        updatePlayerToken(res.headers.get('auth-token'));
                        return res.json();
                    } else {
                        return res.text().then(text => { throw new Error(text) });
                    }
                })
                .then(data => {
                    updatePlayerId(data.id);
                    updateIsLogged();
                })
                .catch(
                    (err) => {
                        alert(err.message);
                    },
                );
        } else {
            alert("you need to enter a valid email and password");
        }
    }

    render() {
        const { isLogged } = this.props;
        return (
            <Container>
                {isLogged && <Redirect to="/buildings" />}
                <Row>
                    <h2 className="w-100">You need to Log you to start the game</h2>
                </Row>
                <form className="d-flex flex-column">
                    <Row className="no-gutters justify-content-xs-center justify-content-lg-between">
                        <Col className="m-2 d-flex flex-row justify-content-center" lg="2">
                            <label htmlFor="email">Email</label>
                        </Col>
                        <Col className="m-2 d-flex flex-row justify-content-center" lg="3">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
                                value={this.state.email}
                            />
                        </Col>
                        <Col className="m-2 d-flex flex-row justify-content-center" lg="2">
                            <label htmlFor="password">Password</label>
                        </Col>
                        <Col className="m-2 d-flex flex-row justify-content-center" lg="3">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={this.onChange}
                                value={this.state.password}
                            />
                        </Col>
                    </Row>
                    <Button
                        type="button"
                        className="genericButton"
                        onClick={this.login}
                    >
                        Start
                    </Button>
                </form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogged: state.isLogged,
});

const mapDispatchToProps = {
    updatePlayerToken,
    updatePlayerId,
    updateIsLogged,
};

const PlayerLoginContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerLoginComponent);

PlayerLoginComponent.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    updatePlayerToken: PropTypes.func.isRequired,
    updatePlayerId: PropTypes.func.isRequired,
    updateIsLogged: PropTypes.func.isRequired,
};

export default PlayerLoginContainer;