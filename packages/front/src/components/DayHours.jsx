import React, { Component } from "react";
import {
    Row, Col
} from 'reactstrap';
import "./dayHours.css";

class DayHours extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="hours">
                <Row className="no-gutters pr-xs-2 pr-lg-0">
                    <Col className="mr-xs-1 mr-sm-3 mr-lg-0">
                        <ul>
                            <li>9 AM</li>
                            <li>10 AM</li>
                            <li>11 AM</li>
                            <li>12 AM</li>
                        </ul>
                    </Col>
                </Row>
                <Row className="no-gutters pr-xs-2 pr-lg-0">
                    <Col className="mr-xs-1 mr-sm-3 mr-lg-0">
                        <ul>
                            <li>1 PM</li>
                        </ul>
                    </Col>
                </Row>
                <Row className="no-gutters pr-xs-2 pr-lg-0">
                    <Col className="mr-xs-1 mr-sm-3 mr-lg-0">
                        <ul>
                            <li>2 PM</li>
                            <li>3 PM</li>
                            <li>4 PM</li>
                            <li>5 PM</li>
                            <li>6 PM</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DayHours;