import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
    Container,
    Row,
    Col,
    Form,
    Input,
    FormGroup,
    Button
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import { updatePlayerId } from '../redux/actions/actions';


class RegisterPlayerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            validPassword: "",
            playerIsRegistered: false,
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = () => {
        const { username, email, password, validPassword, playerIsRegistered } = this.state;
        const { updatePlayerId } = this.props;
        if (username !== "" && email !== "" && password !== "" && validPassword !== "") {
            if (password === validPassword) {
                fetch("/api/createPlayer/", {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify({ player_name: username, email: email, password: password }),
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            return res.text().then(text => { throw new Error(text) });
                        }
                    })
                    .then(data => {
                        updatePlayerId(data.player.id);
                        this.setState({ playerIsRegistered: !playerIsRegistered });
                    })
                    .catch(
                        (err) => {
                            alert(err.message);
                        },
                    );
            } else {
                alert("your password and confirmed password are not the same");
            }
        } else {
            alert("you need to enter a valid username, email and password");
        }
    };

    render() {
        const { username, email, password, validPassword, playerIsRegistered } = this.state;
        return (
            <Container>
                {playerIsRegistered && <Redirect to="/playerLogin" />}
                <Row>
                    <h2 className="w-100">Create your account to start the game</h2>
                </Row>
                <Row>
                    <Col xs={{ offset: 2, size: 8 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={this.onChange}
                                    placeholder="your username"
                                />
                            </FormGroup>
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
                            <FormGroup>
                                <Input
                                    type="password"
                                    name="validPassword"
                                    value={validPassword}
                                    onChange={this.onChange}
                                    placeholder="confirm your password"
                                />
                            </FormGroup>
                            <FormGroup className="d-flex flex-row justify-content-center">
                                <Button className="genericButton m-2" onClick={this.handleSubmit}>
                                    Register
                                </Button>
                                <Link to="/playerLogin">
                                    <Button
                                        className="genericButton m-2"
                                    >
                                        Login
                                    </Button>
                                </Link>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const matStateToProps = (state) => ({

});

const mapDispatchToProps = {
    updatePlayerId,
};

const RegisterPlayerContainer = connect(matStateToProps, mapDispatchToProps)(RegisterPlayerComponent);

RegisterPlayerComponent.propTypes = {
    updatePlayerId: PropTypes.func.isRequired,
};

export default RegisterPlayerContainer;