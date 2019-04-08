import React from 'react';
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

// Importing all components to be used within this file.
/* JoinRoom/components/.... */
import MessageList from './messageList';

const MessageBoard = props => {
  let msgList = [];
  if (Array.isArray(props.msgs) && props.msgs.length !== 0) {
    let lastUser = '';
    msgList = props.msgs.map((ml, i) => {
      let username = '';
      let avatar = '';
      // This variable will determine if the last sent message is from the same user.
      let sameUser = false;
      // This variable will determine if a horizontal rule is applied in messageList.js.
      let applyRule = false;

      props.auth.allUsers.forEach(elem => {
        if (ml.user === elem.id) {
          username = elem.name;
          avatar = elem.avatar;
        }
      });

      if (i === 0) lastUser = '';
      username === lastUser ? (sameUser = true) : (lastUser = username);
      if (!sameUser) applyRule = true;

      return (
        <MessageList
          key={ml._id}
          id={ml._id}
          content={ml.msgContent}
          date={ml.sendDate}
          time={ml.sendTime}
          username={username}
          avatar={avatar}
          sameUser={sameUser}
          applyRule={applyRule}
        />
      );
    });
  } else {
    if (props.msgs.constructor !== Object) {
      msgList = props.msgs;
    }
  }

  return (
    <>
      <Row className="m-spacing">
        <Col />
        <Col lg={8}>
          <Button color="primary" onClick={props.onReturn} block>
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
              <CardTitle tag="h1">Welcome to the room!</CardTitle>
              {msgList}
            </CardBody>
          </Card>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col />
        <Col lg={8}>
          <Form onSubmit={props.onSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="message"
                placeholder="Enter message"
                onChange={props.onChange}
              />
            </FormGroup>
          </Form>
        </Col>
        <Col />
      </Row>
    </>
  );
};

MessageBoard.propTypes = {
  msgs: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  auth: PropTypes.object.isRequired,
  message: PropTypes.string,
  onReturn: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default MessageBoard;
