import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Container, Row, Button
} from 'reactstrap';

class PlayerMenuComponent extends Component {

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
                        <Link to="/teachersOffice">
                            <Button
                                className="genericButton m-2"
                            >
                                Trainers Office
                            </Button>
                        </Link>
                        <Link to="/playerRegister">
                            <Button
                                className="genericButton m-2"
                            >
                                Register
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

export default PlayerMenuComponent;