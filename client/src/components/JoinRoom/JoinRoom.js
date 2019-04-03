import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRooms } from '../../redux/actions/roomActions';

class JoinRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    const allRooms = this.props.getRooms();
    this.setState({ rooms: allRooms });
  }

  render() {
    const { user } = this.props.auth;

    // Create a new component for this.
    // const displayRooms = this.state.rooms.map();

    return (
      <Row className="m-spacing">
        <Col />
        <Col lg={10}>
          <h1>Welcome, {user.name}</h1>
        </Col>
        <Col />
      </Row>
    );
  }
}

JoinRoom.propTypes = {
  auth: PropTypes.object.isRequired,
  room: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  room: state.room
});

export default connect(
  mapStateToProps,
  { getRooms }
)(JoinRoom);
