import React, { Fragment, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoom, editRoom, deleteRoom } from '../../../redux/actions/room';

import TextFieldGroup from './textFieldGroup';
import { authBtns, guestBtns } from '../utils/btns';

const CrudModal = ({
  createRoom,
  editRoom,
  deleteRoom,
  isAuthenticated,
  error,
  modal,
  handleModal,
  invokedLoc,
  targetRoom,
  roomId,
  history
}) => {
  const [formData, setFormData] = useState({ roomName: '' });

  const { roomName } = formData;

  const onChange = e => setFormData({ [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (invokedLoc === 'navbar') createRoom(roomName, history);
    if (invokedLoc === 'edit') editRoom(roomId, roomName, history);
    if (invokedLoc === 'delete') deleteRoom(roomId, history);

    handleModal();
  };

  useEffect(() => {
    if (modal) setFormData({ roomName: targetRoom });
  }, [modal, setFormData, targetRoom]);

  const aBtns = authBtns(invokedLoc, handleModal);
  const gBtns = guestBtns(handleModal);

  return (
    <Fragment>
      {invokedLoc === 'navbar' ? (
        <span onClick={handleModal}>Create a Room</span>
      ) : (
        <Fragment></Fragment>
      )}
      <Modal isOpen={modal} toggle={handleModal}>
        <ModalHeader tag="h3">
          {isAuthenticated && invokedLoc === 'navbar' ? (
            <Fragment>Let's create a room!</Fragment>
          ) : isAuthenticated && invokedLoc === 'edit' ? (
            <Fragment>Rename your room</Fragment>
          ) : isAuthenticated && invokedLoc === 'delete' ? (
            <Fragment>Do you really want to delete this room?</Fragment>
          ) : (
            <Fragment>Please login to create a room.</Fragment>
          )}
        </ModalHeader>
        <Form onSubmit={e => onSubmit(e)}>
          <ModalBody>
            {isAuthenticated && invokedLoc !== 'delete' ? (
              <Row noGutters>
                <Col />
                <Col lg={10}>
                  <TextFieldGroup
                    placeholder="Room name"
                    name="roomName"
                    value={roomName}
                    onChange={e => onChange(e)}
                    error={error.roomName}
                  />
                </Col>
                <Col />
              </Row>
            ) : isAuthenticated && invokedLoc === 'delete' ? (
              <Fragment>Once deleted, this room is forever gone.</Fragment>
            ) : (
              <Fragment>
                You are currently not logged in. Please login to create a new
                room.
              </Fragment>
            )}
          </ModalBody>
          <ModalFooter>{isAuthenticated ? aBtns : gBtns}</ModalFooter>
        </Form>
      </Modal>
    </Fragment>
  );
};

CrudModal.propTypes = {
  createRoom: PropTypes.func.isRequired,
  editRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  modal: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  invokedLoc: PropTypes.string.isRequired,
  targetRoom: PropTypes.string,
  roomId: PropTypes.string,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { createRoom, editRoom, deleteRoom })(
  withRouter(CrudModal)
);
