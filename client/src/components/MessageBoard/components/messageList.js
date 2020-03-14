import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Button,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const MessageList = ({
  id,
  userId,
  storeUser,
  content,
  date,
  username,
  avatar,
  isSameUser,
  isRuleApply,
  onDelete
}) => {
  if (username === '') username = 'Deleted';
  return (
    <Fragment>
      {isRuleApply ? <hr /> : <Fragment></Fragment>}
      {isSameUser ? (
        <Row noGutters>
          <Col lg={1} />
          <Col lg={11}>
            <CardText
              tag="p"
              className="s-element-spacer s-msg-line s-btn-override"
            >
              {content}
              <Button outline id="PopoverLegacy" color="danger" size="sm">
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </CardText>
          </Col>
        </Row>
      ) : (
        <Fragment>
          <Row noGutters>
            <Col lg={1}>
              <CardImg
                className="rounded-circle m-img-center s-image-size"
                src={avatar}
              />
            </Col>
            <Col lg={11}>
              <CardTitle tag="h4" className="s-display-msg s-element-spacer">
                {username}
              </CardTitle>
              {'  '}
              <CardSubtitle
                tag="small"
                className="s-display-msg s-element-spacer"
              >
                {date}
              </CardSubtitle>
              <CardText tag="p" className="s-element-spacer s-btn-override">
                {content}
                {storeUser === userId ? (
                  <Button outline id="PopoverLegacy" color="danger" size="sm">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                ) : (
                  <Fragment></Fragment>
                )}
              </CardText>
            </Col>
          </Row>
        </Fragment>
      )}
      <UncontrolledPopover
        trigger="legacy"
        placement="right"
        target="PopoverLegacy"
      >
        <PopoverHeader>Delete this message?</PopoverHeader>
        <PopoverBody>
          <p>Are you really sure you want to delete this message?</p>
          <Button
            id={id}
            onClick={e => onDelete(e)}
            color="danger"
            size="sm"
            block
          >
            Yes, delete this message
          </Button>
        </PopoverBody>
      </UncontrolledPopover>
    </Fragment>
  );
};

MessageList.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  storeUser: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isSameUser: PropTypes.bool.isRequired,
  isRuleApply: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default MessageList;
