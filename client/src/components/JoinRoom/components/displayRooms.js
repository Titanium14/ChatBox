import React, { Component } from 'react';
import { Row, Col, ListGroup, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';

// Importing all components to be used within this file.
/* JoinRoom/components/.... */
import RoomList from './RoomList';
import Buttons from './buttons';

/* src/components/.... */
import CreateEditRoom from '../../utils/createEditRoom';

class DisplayRooms extends Component {
  constructor(props) {
    super(props);

    this.state = { width: 0 };

    this.resizeHandler = this.resizing.bind(this);

    // This event listener is monitoring the size of the window.
    window.addEventListener('resize', this.resizeHandler);
  }

  resizing() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.resizing();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizing);
  }

  render() {
    let roomList = [];
    if (Array.isArray(this.props.rooms) && this.props.rooms.length !== 0) {
      roomList = this.props.rooms.map(rl => {
        let creatorName = '';
        this.props.auth.allUsers.forEach(elem => {
          if (rl.user === elem.id) creatorName = elem.name;
        });
        return (
          <RoomList
            key={rl._id}
            id={rl._id}
            name={rl.roomName}
            date={rl.dateCreated}
            creator={creatorName}
            onOperation={this.props.onOperation}
            auth={this.props.auth}
          />
        );
      });
    }

    return (
      <>
        <CreateEditRoom
          editAct={this.props.editAct}
          onToggle={this.props.onToggle}
          invokedLocation="displayRoom"
          roomId={this.props.roomId}
        />
        <Row className="m-spacing">
          <Col className="order-first" />
          <Col lg={6} className="order-2 order-lg-1">
            <ListGroup>{roomList}</ListGroup>
          </Col>
          <Col
            lg={2}
            className={`order-1 order-lg-2 ${
              this.state.width < 992 ? 'text-center' : ''
            }`}>
            <h5>Filter rooms:</h5>
            <ButtonGroup vertical={this.state.width < 992 ? false : true}>
              <Buttons
                btnText="All Rooms"
                btnName="all"
                btnColor="primary"
                handleClick={this.props.onFilter}
              />
              <Buttons
                btnText="Your Rooms"
                btnName="user"
                btnColor="success"
                handleClick={this.props.onFilter}
              />
            </ButtonGroup>
          </Col>
          <Col className="order-last" />
        </Row>
      </>
    );
  }
}

DisplayRooms.propTypes = {
  rooms: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  auth: PropTypes.object.isRequired,
  editAct: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onOperation: PropTypes.func.isRequired,
  roomId: PropTypes.string
};

export default DisplayRooms;
