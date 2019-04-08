import React from 'react';
import {
  ListGroupItem,
  ListGroupItemText
} from 'reactstrap';
import PropTypes from 'prop-types';

const MessageList = props => {
  return (
    <>
      <ListGroupItem>
        <ListGroupItemText>{props.content}</ListGroupItemText>
      </ListGroupItem>
    </>
  );
};

MessageList.propTypes = {
  content: PropTypes.string.isRequired
};

export default MessageList;
