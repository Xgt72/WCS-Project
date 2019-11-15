import React, { Component } from "react";
import "./chooseActivity.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from "reactstrap";
import { updateActivitySelected, displayChooseActivities } from '../redux/actions/actions';

class ChooseActivityComponent extends Component {

    validateActivity = (e) => {
        let activityId = e.currentTarget.id;
        // let activityDay = this.props.periodSelected.offsetParent.childNodes[0].childNodes[0].innerText;
        // let activityPeriod = this.props.periodSelected.classList[1];
        // console.log("Day and period:", activityDay, activityPeriod);
        // this.props.updateActivitySelected(Number(activityIdToAdd));
        fetch(`/getActivityById/${activityId}`)
            .then(res => res.json())
            .then(data => {
                this.props.periodSelected.innerHTML = `<p>${data.name}</>`;
                this.props.periodSelected.style.backgroundColor = `#${data.color}`;
                this.props.periodSelected.childNodes[0].style.color = "black";
                this.props.displayChooseActivities(false);
            });
    }

    removeActivity = () => {
        this.props.periodSelected.innerHTML = "<p>Add activity</>";
        this.props.periodSelected.style.backgroundColor = "rgba(244, 113, 115, 0.3)";
        this.props.periodSelected.childNodes[0].style.color = "grey";
        this.props.displayChooseActivities(false);
    }

    render() {
        const { opacity, zIndex, activitiesTemplate } = this.props;
        return (
            <div className="chooseActivity" style={{ opacity: opacity, zIndex: zIndex }}>
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col className="activitiesChoice">
                            <h3>Choose an activity to add</h3>
                            <Row className="no-gutters justify-content-around">
                                {activitiesTemplate.map(
                                    activity =>
                                        <Col key={activity.id} id={activity.id} className="selectActivity text-center m-2" xs="5" md="4" lg="3" onClick={this.validateActivity}>
                                            <h4>{activity.name}</h4>
                                            <p>cost: {activity.value}€</p>
                                        </Col>
                                )}
                                <Col className="removeActivity text-center m-2" xs="5" md="4" lg="3" onClick={this.removeActivity}>
                                    <h4>Remove activity</h4>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    activitySelected: state.activitySelected,
});

const mapDispatchToProps = {
    updateActivitySelected,
    displayChooseActivities,
};

const ChooseActivityContainer = connect(mapStateToProps, mapDispatchToProps)(ChooseActivityComponent);

ChooseActivityComponent.propTypes = {
    activitySelected: PropTypes.number.isRequired,
    updateActivitySelected: PropTypes.func.isRequired,
    displayChooseActivities: PropTypes.func.isRequired,
};

export default ChooseActivityContainer;