import React from 'react';
import { Row, Col, ListGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import MessageList from './messageList';

const MessageBoard = props => {
  let msgList = [];
  if (Array.isArray(props.msgs) && props.msgs.length !== 0) {
    msgList = props.msgs.map(ml => (
      <MessageList
        key={ml._id}
        id={ml._id}
        content={ml.msgContent}
        time={ml.sendDate}
      />
    ));
  } else {
    if (props.msgs.constructor !== Object) {
      msgList = props.msgs;
    }
  }

  return (
    <>
      <Row>
        <Col />
        <Col lg={1}>
          <Button color="primary" onClick={props.onReturn}>
            Return
          </Button>
        </Col>
        <Col lg={10} />
      </Row>
      <Row className="m-spacing">
        <Col />
        <Col lg={10}>
          <ListGroup>{msgList}</ListGroup>
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
  onReturn: PropTypes.func.isRequired
};

export default MessageBoard;
