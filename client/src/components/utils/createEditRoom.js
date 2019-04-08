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

// The following imports below are for Redux.
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoom, editRoom } from '../../redux/actions/roomActions';

// Importing all components to be used within this file.
/* utils/.... */
import TextFieldGroup from './textFieldGroup';

class CreateEditRoom extends Component {
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

  // This method occurs only if there are any changes in props.
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // If, when re-rendered, there are any lingering errors, store in state.
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
    if (this.state.modal || this.props.editAct) {
      if (this.props.invokedLocation === 'NavBar') {
        const newRoom = { roomName: this.state.roomName };
        // This points to a method inside "redux/actions/roomAction.js"
        this.props.createRoom(newRoom);
      } else if (this.props.invokedLocation === 'displayRoom') {
        const editRoom = { roomName: this.state.roomName };
        // This points to a method inside "redux/actions/roomAction.js"
        this.props.editRoom(this.props.roomId, editRoom);
      }

      setTimeout(() => {
        if (
          Object.entries(this.state.errors).length === 0 &&
          this.state.errors.constructor === Object
        ) {
          this.props.history.push('/');
          this.props.history.push('/JoinRoom');

          if (this.props.invokedLocation === 'NavBar') {
            this.setState(prevState => ({
              modal: !prevState.modal
            }));
          }
        }
      }, 300);
    }
  }

  render() {
    const { errors } = this.state;

    const invoked = this.props.invokedLocation;
    const isAuth = this.props.auth.isAuthenticated;

    // This variable contains all buttons pertaining to any authenticated users.
    const authBtns = (
      <>
        <Button color="primary">
          {invoked === 'NavBar' ? <>Create</> : <>Edit</>}
        </Button>{' '}
        <Button
          color="secondary"
          onClick={this.props.onToggle ? this.props.onToggle : this.toggle}>
          Cancel
        </Button>
      </>
    );

    // This variable contains all buttons pertaining to any non-authenticated users.
    const guestBtns = (
      <Button
        color="info"
        href="/Auth/login"
        onClick={this.props.onToggle ? this.props.onToggle : this.toggle}>
        Login
      </Button>
    );

    return (
      <>
        {invoked === 'NavBar' ? (
          <span onClick={this.toggle}>Create a Room</span>
        ) : (
          <></>
        )}
        <Modal
          isOpen={this.state.modal || this.props.editAct ? true : false}
          toggle={this.props.onToggle ? this.props.onToggle : this.toggle}
          className={this.props.className}>
          <ModalHeader tag="h3">
            {isAuth && invoked === 'NavBar' ? (
              <>Let's create a room!</>
            ) : isAuth && invoked === 'displayRoom' ? (
              <>Rename your room</>
            ) : (
              <>Please login to create a room.</>
            )}
          </ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              {isAuth ? (
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
            <ModalFooter>{isAuth ? authBtns : guestBtns}</ModalFooter>
          </Form>
        </Modal>
      </>
    );
  }
}

CreateEditRoom.propTypes = {
  createRoom: PropTypes.func.isRequired,
  editRoom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editAct: PropTypes.bool,
  onToggle: PropTypes.func,
  invokedLocation: PropTypes.string.isRequired,
  roomId: PropTypes.string
};

// This will take the array from the Redux store and map it onto the
// array saved in state.
const mapStateToProps = state => ({
  auth: state.auth,
  room: state.room,
  errors: state.errors
});

// The connect method connects this component to the Redux store.
export default connect(
  mapStateToProps,
  { createRoom, editRoom }
)(withRouter(CreateEditRoom));
