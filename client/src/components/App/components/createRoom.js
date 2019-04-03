import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoom } from '../../../redux/actions/roomActions';

import TextFieldGroup from '../../utils/textFieldGroup';

class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      roomName: '',
      errors: {}
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.modal) {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
      const newRoom = {
        roomName: this.state.roomName
      };

      this.props.createRoom(newRoom, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;

    const authLinks = (
      <>
        <Button color="primary">Create</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>
          Cancel
        </Button>
      </>
    );

    const guestLinks = (
      <Button color="info" href="/Auth/login" onClick={this.toggle}>
        Login
      </Button>
    );

    return (
      <>
        <span onClick={this.toggle}>Create a Room</span>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            {this.props.auth.isAuthenticated ? (
              <>Let's create a room!</>
            ) : (
              <>Please login to create a room.</>
            )}
          </ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              {this.props.auth.isAuthenticated ? (
                <Row noGutters>
                  <Col />
                  <Col lg={10}>
                    <TextFieldGroup
                      placeholder="Room name"
                      name="roomName"
                      value={this.state.roomName}
                      onChange={this.onChange}
                      error={errors.roomName}
                    />
                  </Col>
                  <Col />
                </Row>
              ) : (
                <>
                  You are currently not logged in. Please login to create a new
                  room.
                </>
              )}
            </ModalBody>
            <ModalFooter>
              {this.props.auth.isAuthenticated ? authLinks : guestLinks}
            </ModalFooter>
          </Form>
        </Modal>
      </>
    );
  }
}

CreateRoom.propTypes = {
  createRoom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  room: state.room,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createRoom }
)(withRouter(CreateRoom));
