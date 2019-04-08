import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Importing the custom styles in.
import './JoinRoom.css';

// The following imports below are for Redux.
import { connect } from 'react-redux';
import { getUsers } from '../../redux/actions/authActions';
import {
  getRooms,
  getUserRooms,
  deleteRoom
} from '../../redux/actions/roomActions';
import {
  getMessages,
  postMessage,
  emptyMessages
} from '../../redux/actions/msgActions';

// Importing all components to be used within this file.
/* JoinRoom/.... */
import DisplayRooms from './components/displayRooms';
import MessageBoard from './components/messageBoard';

class JoinRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msgSwitch: false,
      filterSwitch: false,
      editAct: false,

      filterBy: '',
      roomId: '',
      message: ''
    };
  }

  componentDidMount() {
    // This ensures that the page is only accessed by authenticated users.
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/Auth/login');
    } else {
      this.props.getUsers();

      // This timeout ensures that the users are first retrieved, then the
      // rooms, as there would be an error since the creator's name is not
      // yet retrieved if the rooms are retrieved first.
      setTimeout(() => {
        this.props.getRooms();
      }, 300);
    }
  }

  componentDidUpdate() {
    // This ensures that the page is only accessed by authenticated users.
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/Auth/login');
    } else {
      const hash = this.props.location.hash;
      // Occurs when returning to /JoinRoom
      if (hash === '' && this.state.msgSwitch) {
        this.props.emptyMessages();
        this.setState({
          msgSwitch: false
        });
      }
      // Occurs when entering a room, i.e. /JoinRoom#{roomId}
      if (hash !== '' && !this.state.msgSwitch) {
        this.props.getMessages(hash.substr(1));
        this.setState({
          msgSwitch: true
        });
      }
      // Occurs when a filter is applied.
      if (this.state.filterSwitch) {
        this.state.filterBy === 'all'
          ? this.props.getRooms()
          : this.props.getUserRooms(this.props.auth.user.id);
        this.setState({
          filterSwitch: false
        });
      }
    }
  }

  onToggleModal(roomId) {
    // This statement resets the room ID to be an empty string, i.e. no room
    // selected.
    if (this.state.editAct) roomId = '';
    this.setState(prevState => ({
      editAct: !prevState.editAct,
      roomId: roomId
    }));
  }

  onFilterClick(e) {
    const target = e.target;
    const name = target.name;

    this.setState({ filterBy: name, filterSwitch: true });
  }

  // This method contains the delete operation. It also contains the starting
  // process of the update operation.
  onRoomOperation(e) {
    const target = e.target;
    const name = target.name;
    const id = target.id;

    if (name === 'delete') {
      // This points to a method inside "redux/actions/roomAction.js"
      this.props.deleteRoom(id);
      setTimeout(() => {
        this.props.history.push('/');
        this.props.history.push('/JoinRoom');
      }, 300);
    } else {
      this.onToggleModal(id);
    }
  }

  onReturnClick() {
    this.props.history.push('/JoinRoom');
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newMessage = {
      msgContent: this.state.message
    };
    // This points to a method inside "redux/msgAction.js"
    this.props.postMessage(
      this.props.location.hash.substr(1),
      newMessage,
      this.props.history
    );
  }

  render() {
    const rooms = this.props.room;
    const msgs = this.props.messages;

    return (
      <>
        {this.props.location.hash === '' ? (
          <DisplayRooms
            rooms={rooms.room ? rooms.room : rooms}
            auth={this.props.auth}
            editAct={this.state.editAct}
            onToggle={this.onToggleModal.bind(this)}
            onFilter={this.onFilterClick.bind(this)}
            onOperation={this.onRoomOperation.bind(this)}
            roomId={this.state.roomId}
          />
        ) : (
          <MessageBoard
            msgs={msgs.messages ? msgs.messages : msgs}
            auth={this.props.auth}
            message={this.state.message}
            onReturn={this.onReturnClick.bind(this)}
            onChange={this.onChange.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
          />
        )}
      </>
    );
  }
}

JoinRoom.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getRooms: PropTypes.func.isRequired,
  getUserRooms: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  postMessage: PropTypes.func.isRequired,
  emptyMessages: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  room: PropTypes.object,
  messages: PropTypes.object
};

// This will take the array from the Redux store and map it onto the
// array saved in state.
const mapStateToProps = state => ({
  auth: state.auth,
  room: state.room,
  messages: state.messages
});

// The connect method connects this component to the Redux store.
export default connect(
  mapStateToProps,
  {
    getUsers,
    getRooms,
    getUserRooms,
    deleteRoom,
    getMessages,
    postMessage,
    emptyMessages
  }
)(JoinRoom);
