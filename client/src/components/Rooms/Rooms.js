import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, ListGroup, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Rooms.css';

import { connect } from 'react-redux';
import { retrieveUsers } from '../../redux/actions/auth';
import { getRooms, getUserRooms } from '../../redux/actions/room';

import RoomList from './components/roomList';
import Buttons from './utils/btns';
import CrudModal from '../shared/components/crudModal';
import { useWindowDimensions } from '../shared/utils/windowDimensions';

const Rooms = ({
  retrieveUsers,
  getRooms,
  getUserRooms,
  auth: { user, allUsers },
  room: { room }
}) => {
  const { width } = useWindowDimensions();
  const [invokedLoc, setInvokedLoc] = useState('');
  const [roomId, setRoomId] = useState('');
  const [targetRoom, setTargetRoom] = useState('');
  const [modal, setModal] = useState(false);

  const handleModal = () => setModal(!modal);
  const onUpdate = e => {
    setInvokedLoc('edit');
    setRoomId(e.target.id);
    setTargetRoom(e.target.getAttribute('room'));
    setModal(true);
  };
  const onDelete = e => {
    setInvokedLoc('delete');
    setRoomId(e.target.id);
    setTargetRoom(e.target.getAttribute('room'));
    setModal(true);
  };
  const filterRooms = e =>
    e.target.name === 'all' ? getRooms() : getUserRooms();

  useEffect(() => {
    retrieveUsers();
    getRooms();
  }, [retrieveUsers, getRooms]);

  let roomList = [];
  if (room !== null && allUsers !== null) {
    roomList = room.map(r => {
      let creatorName = '';

      for (let elem of allUsers)
        if (r.user === elem._id) {
          creatorName = elem.name;
          break;
        }

      const formatDate = moment(r.date_created).format('YYYY-MM-DD HH:mm:ss');

      return (
        <RoomList
          key={r._id}
          id={r._id}
          name={r.room_name}
          date={formatDate}
          creator={creatorName}
          currUser={user ? user.name : null}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      );
    });
  }

  return (
    <Fragment>
      <CrudModal
        invokedLoc={invokedLoc}
        modal={modal}
        handleModal={handleModal}
        targetRoom={targetRoom}
        roomId={roomId}
      />
      <Row className="m-spacing">
        <Col className="order-first" />
        <Col lg={6} className="order-2 order-lg-1">
          <ListGroup>{roomList}</ListGroup>
        </Col>
        <Col
          lg={2}
          className={`order-1 order-lg-2 ${width < 992 ? 'text-center' : ''}`}
        >
          <h5>Filter rooms:</h5>
          <ButtonGroup vertical={width < 992 ? false : true}>
            <Buttons
              btnText="All Rooms"
              btnName="all"
              btnColor="primary"
              handleClick={filterRooms}
            />
            <Buttons
              btnText="Your Rooms"
              btnName="user"
              btnColor="success"
              handleClick={filterRooms}
            />
          </ButtonGroup>
        </Col>
        <Col className="order-last" />
      </Row>
    </Fragment>
  );
};

Rooms.propTypes = {
  retrieveUsers: PropTypes.func.isRequired,
  getRooms: PropTypes.func.isRequired,
  getUserRooms: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  room: state.room
});

export default connect(mapStateToProps, {
  retrieveUsers,
  getRooms,
  getUserRooms
})(Rooms);
