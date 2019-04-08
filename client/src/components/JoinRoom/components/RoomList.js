import React from 'react';
import {
  Row,
  Col,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  ButtonGroup
} from 'reactstrap';
import PropTypes from 'prop-types';

// Importing all components to be used within this file.
/* JoinRoom/components/.... */
import Buttons from './buttons';

const RoomList = props => {
  return (
    <Row noGutters>
      <Col lg={12}>
        <ListGroupItem className="s-hover-bg s-remove-padding">
          <Row noGutters>
            <Col>
              <a className="s-link" href={`/JoinRoom#${props.id}`}>
                <div className="s-apply-padding">
                  <ListGroupItemHeading
                    tag="h3"
                    className="m-element-spacing-bottom">
                    {props.name}
                  </ListGroupItemHeading>
                  <ListGroupItemText tag="p">
                    Made on: {props.date}
                  </ListGroupItemText>
                  <ListGroupItemText tag="p">
                    Created by: {props.creator}
                  </ListGroupItemText>
                </div>
              </a>
            </Col>
            {props.auth.user.name === props.creator ? (
              <Col
                className={`d-flex justify-content-end ${
                  props.width < 992 ? 'flex-column' : 'flex-row'
                }`}
                lg={3}>
                <ButtonGroup className="s-parent-width" vertical>
                  <Buttons
                    id={props.id}
                    btnText="Edit Room"
                    btnName="edit"
                    btnColor="info"
                    handleClick={props.onOperation}
                    size="lg"
                  />
                  <Buttons
                    id={props.id}
                    btnText="Delete Room"
                    btnName="delete"
                    btnColor="danger"
                    handleClick={props.onOperation}
                    size="lg"
                  />
                </ButtonGroup>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </ListGroupItem>
      </Col>
    </Row>
  );
};

RoomList.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  onOperation: PropTypes.func.isRequired
};

export default RoomList;
