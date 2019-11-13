import React, { Component } from "react";
import {
    Row, Col
} from 'reactstrap';
import "./dayActivities.css";

class DayActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: []
        }
    }

    render() {
        const { dayName } = this.props;
        return (
            <div className="day">
                <h3>{dayName}</h3>
                <Row className="no-gutters mx-1">
                    <Col className="addActivity morning d-flex justify-content-center align-items-center">
                        <p>Add activity</p>
                    </Col>
                </Row>
                <Row className="no-gutters mx-1">
                    <Col className="middle">

                    </Col>
                </Row>
                <Row className="no-gutters mx-1">
                    <Col className="addActivity afternoon d-flex justify-content-center align-items-center">
                        <p>Add activity</p>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DayActivities;