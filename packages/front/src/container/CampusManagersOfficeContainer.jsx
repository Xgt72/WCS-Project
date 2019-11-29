import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { updateCampusManagersOffice, displayHireCampusManager, campusManagerIdCalendarToDisplay } from '../redux/actions/actions';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Button,
} from 'reactstrap';
import HireCampusManagerContainer from "../container/HireCampusManagerContainer";

class CampusManagersOfficeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hireCampusManagerDisplay: {
                opacity: "0",
                zIndex: "-100",
            }
        }
    }

    componentDidMount() {
        const { playerId, updateCampusManagersOffice, playerToken } = this.props;
        fetch(`/getOnePlayerCampusManagers/${playerId}`, {
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
            .then(data => {
                if (data.length > 0) {
                    updateCampusManagersOffice(data);
                }
            })
            .catch(
                (err) => {
                    console.log(err.message);
                },
            );
    }

    hireCampusManager = (e) => {
        this.props.displayHireCampusManager(true);
        this.setState({
            hireCampusManagerDisplay: {
                opacity: "1",
                zIndex: "100",
            },
        });
    };

    render() {
        const { opacity, zIndex } = this.state.hireCampusManagerDisplay;
        const { campusManagersOffice, hireCampusManagerIsDisplay, campusManagerIdCalendarToDisplay } = this.props;

        return (
            <>
                <Container>
                    <Row>
                        <h2 className="w-100">Campus Managers Office</h2>
                    </Row>
                    {
                        campusManagersOffice.length < 2 &&
                        <Row className="justify-content-center">
                            <Button
                                type="button"
                                className="genericButton"
                                onClick={this.hireCampusManager}
                            >
                                Hire a new campus manager
                            </Button>
                        </Row>
                    }
                    {
                        campusManagersOffice.length > 0 &&
                        <Row className="no-gutters justify-content-around">
                            {
                                campusManagersOffice.map(campusManager =>
                                    <Col key={campusManager.id} className="campusManager m-3" xs="8" md="5" lg="3">
                                        <Card>
                                            <CardImg top width="20%" src="https://via.placeholder.com/300" alt={campusManager.name} />
                                            <CardBody className="d-flex flex-column align-items-center">
                                                <CardTitle className="text-center">{campusManager.name}</CardTitle>
                                                <Link to="/campusManagers" onClick={() => campusManagerIdCalendarToDisplay(campusManager.id)}>
                                                    <Button
                                                        className="genericButton d-block"
                                                    >
                                                        Manage the schedule
                                                    </Button>
                                                </Link>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )
                            }
                        </Row>
                    }
                </Container>
                {hireCampusManagerIsDisplay &&
                    <HireCampusManagerContainer
                        opacity={opacity}
                        zIndex={zIndex}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.playerId,
    campusManagersOffice: state.campusManagersOffice,
    hireCampusManagerIsDisplay: state.hireCampusManagerIsDisplay,
    playerToken: state.playerToken,
});

const mapDispatchToProps = {
    updateCampusManagersOffice,
    displayHireCampusManager,
    campusManagerIdCalendarToDisplay,
};

const CampusManagersOfficeContainer = connect(mapStateToProps, mapDispatchToProps)(CampusManagersOfficeComponent);

CampusManagersOfficeComponent.propTypes = {
    playerId: PropTypes.number.isRequired,
    campusManagersOffice: PropTypes.array.isRequired,
    hireCampusManagerIsDisplay: PropTypes.bool.isRequired,
    playerToken: PropTypes.string.isRequired,
    updateCampusManagersOffice: PropTypes.func.isRequired,
    displayHireCampusManager: PropTypes.func.isRequired,
    campusManagerIdCalendarToDisplay: PropTypes.func.isRequired,
};

export default CampusManagersOfficeContainer;