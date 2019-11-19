import React, { Component } from "react";
import {
    Row, Col
} from 'reactstrap';
import "./dayActivities.css";

class DayActivities extends Component {

    render() {
        const { dayName, action, dayActivities } = this.props;
        return (
            <div className="day">
                <h3>{dayName}</h3>
                <Row className="no-gutters mx-1">
                    <Col
                        style={dayActivities.morning != null ? { backgroundColor: `#${dayActivities.morning.color}` } : {}}
                        className="addActivity morning d-flex justify-content-center align-items-center"
                        onClick={(e) => action(e)}
                    >
                        {dayActivities.morning != null ?
                            <p style={{ color: "black" }}>{dayActivities.morning.name}</p> :
                            <p>Add activity</p>
                        }
                    </Col>
                </Row>
                <Row className="no-gutters mx-1">
                    <Col className="middle">

                    </Col>
                </Row>
                <Row className="no-gutters mx-1">
                    <Col
                        style={dayActivities.afternoon != null ? { backgroundColor: `#${dayActivities.afternoon.color}` } : {}}
                        className="addActivity afternoon d-flex justify-content-center align-items-center"
                        onClick={(e) => action(e)}
                    >
                        {dayActivities.afternoon != null ?
                            <p style={{ color: "black" }}>{dayActivities.afternoon.name}</p> :
                            <p>Add activity</p>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DayActivities;