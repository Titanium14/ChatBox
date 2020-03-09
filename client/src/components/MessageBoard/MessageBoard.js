import React, { Fragment, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import moment from 'moment';

import './MessageBoard.css';

import { connect } from 'react-redux';
import { retrieveUsers } from '../../redux/actions/auth';
import { getRoomById } from '../../redux/actions/room';
import { getMessages, postMessage } from '../../redux/actions/messages';

import MessageList from './components/messageList';

const MessageBoard = ({
  auth: { isAuthenticated, allUsers },
  room: { selectedRoom },
  messages: { messages },
  history: {
    location: { hash },
    push
  },
  retrieveUsers,
  getRoomById,
  getMessages,
  postMessage
}) => {
  const [formData, setFormData] = useState({ content: '' });

  const { content } = formData;

  const onChange = e => setFormData({ [e.target.name]: e.target.value });
  const onReturn = () => push('/Rooms');

  const onSubmit = e => {
    e.preventDefault();

    postMessage(hash.substr(1), content);
  };

  useEffect(() => {
    if (isAuthenticated) {
      retrieveUsers();
      getRoomById(hash.substr(1));
      getMessages(hash.substr(1));
    }
  }, [isAuthenticated, hash, retrieveUsers, getRoomById, getMessages]);

  console.log(isAuthenticated);

  if (!isAuthenticated && isAuthenticated !== null)
    return <Redirect to="/Auth/login" />;

  let msgList = [];
  if (messages !== null && allUsers !== null) {
    let lastUser = '';
    msgList = messages.map(m => {
      let username = '';
      let avatar = '';
      for (let elem of allUsers) {
        if (m.user === elem._id) {
          username = elem.name;
          avatar = elem.avatar;
          break;
        }
      }

      let isSameUser = false;
      let isRuleApply = false;
      username === lastUser ? (isSameUser = true) : (lastUser = username);
      if (!isSameUser) isRuleApply = true;

      const formatDate = moment(m.send_date).format('YYYY-MM-DD HH:mm:ss');

      return (
        <MessageList
          key={m._id}
          content={m.content}
          date={formatDate}
          username={username}
          avatar={avatar}
          isSameUser={isSameUser}
          isRuleApply={isRuleApply}
        />
      );
    });
  }

  return (
    <Fragment>
      <Row className="m-spacing">
        <Col />
        <Col lg={8}>
          <Button color="primary" onClick={onReturn} block>
            Return
          </Button>
        </Col>
        <Col />
      </Row>
      <Row className="m-spacing">
        <Col />
        <Col lg={8}>
          <Card className="s-max-height">
            <CardBody>
              <CardTitle tag="h1">
                Welcome to {selectedRoom ? selectedRoom.room_name : 'the room'}!
              </CardTitle>
              {msgList}
            </CardBody>
          </Card>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col />
        <Col lg={8}>
          <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
              <Input
                type="text"
                name="content"
                placeholder="Enter message"
                onChange={e => onChange(e)}
              />
            </FormGroup>
          </Form>
        </Col>
        <Col />
      </Row>
    </Fragment>
  );
};

MessageBoard.propTypes = {
  auth: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  retrieveUsers: PropTypes.func.isRequired,
  getRoomById: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  postMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  room: state.room,
  messages: state.messages
});

export default connect(mapStateToProps, {
  retrieveUsers,
  getRoomById,
  getMessages,
  postMessage
})(withRouter(MessageBoard));
