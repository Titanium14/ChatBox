import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Button,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import PropTypes from 'prop-types';

const MessageList = ({
  content,
  date,
  username,
  avatar,
  isSameUser,
  isRuleApply
}) => {
  if (username === '') username = 'Deleted';
  return (
    <Fragment>
      {isRuleApply ? <hr /> : <Fragment></Fragment>}
      {isSameUser ? (
        <Row noGutters>
          <Col lg={1} />
          <Col lg={11}>
            <CardText tag="p" className="s-element-spacer">
              {content}
              <Button outline color="danger" size="sm">
                Delete
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
              <CardText tag="p" className="s-element-spacer">
                {content}
                <Button outline color="danger" size="sm">
                  Delete
                </Button>
              </CardText>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

MessageList.propTypes = {
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isSameUser: PropTypes.bool.isRequired,
  isRuleApply: PropTypes.bool.isRequired
};

export default MessageList;
