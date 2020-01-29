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
    Form,
    FormGroup,
    Input
} from 'reactstrap';

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

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
    };

    handleSubmit = () => {
        const { email, password } = this.state;
        const { updatePlayerToken, updatePlayerId, updateIsLogged } = this.props;
        if (email !== "" && password !== "") {
            fetch(`${SERVER_ADDRESS}/api/player/login`, {
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
    };

    render() {
        const { email, password } = this.state;
        const { isLogged } = this.props;
        return (
            <Container>
                {isLogged && <Redirect to="/buildings" />}
                <Row>
                    <h2 className="w-100">You need to Log you to start the game</h2>
                </Row>
                <Row>
                    <Col xs={{ offset: 2, size: 8 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    placeholder="your email address"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    placeholder="your password"
                                />
                            </FormGroup>
                            <FormGroup className="d-flex flex-row justify-content-center">
                                <Button
                                    type="button"
                                    className="genericButton"
                                    onClick={this.handleSubmit}
                                >
                                    Start
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
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