import React from 'react';
import {
  Row,
  Col,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import PropTypes from 'prop-types';

const MessageList = props => {
  let username = props.username;
  if (username === '') username = 'Deleted';
  return (
    <>
      {props.applyRule ? <hr /> : <></>}
      {props.sameUser ? (
        <Row noGutters>
          <Col lg={1} />
          <Col lg={11}>
            <CardText tag="p" className="s-element-spacer">
              {props.content}
            </CardText>
          </Col>
        </Row>
      ) : (
        <>
          <Row noGutters>
            <Col lg={1}>
              <CardImg
                className="rounded-circle m-img-center s-image-size"
                src={props.avatar}
              />
            </Col>
            <Col lg={11}>
              <CardTitle tag="h4" className="s-display-msg s-element-spacer">
                {username}
              </CardTitle>
              {'  '}
              <CardSubtitle
                tag="small"
                className="s-display-msg s-element-spacer">
                {props.date} {props.time}
              </CardSubtitle>
              <CardText tag="p" className="s-element-spacer">
                {props.content}
              </CardText>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

MessageList.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  sameUser: PropTypes.bool.isRequired,
  applyRule: PropTypes.bool.isRequired
};

export default MessageList;
