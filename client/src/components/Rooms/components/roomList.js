import React, { Fragment } from 'react';
import {
  Row,
  Col,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  ButtonGroup
} from 'reactstrap';
import PropTypes from 'prop-types';

import Buttons from '../utils/btns';
import { useWindowDimensions } from '../../shared/utils/windowDimensions';

const RoomList = ({
  id,
  name,
  date,
  creator,
  currUser,
  onUpdate,
  onDelete
}) => {
  const { width } = useWindowDimensions();
  return (
    <Row noGutters>
      <Col lg={12}>
        <ListGroupItem className="s-hover-bg s-remove-padding">
          <Row noGutters>
            <Col>
              <a className="s-link" href={`/MessageBoard#${id}`}>
                <div className="s-apply-padding">
                  <ListGroupItemHeading
                    tag="h3"
                    className="m-element-spacing-bottom"
                  >
                    {name}
                  </ListGroupItemHeading>
                  <ListGroupItemText tag="p">Made on: {date}</ListGroupItemText>
                  <ListGroupItemText tag="p">
                    Created by: {creator}
                  </ListGroupItemText>
                </div>
              </a>
            </Col>
            {currUser === creator ? (
              <Col
                className={`d-flex justify-content-end ${
                  width < 992 ? 'flex-column' : 'flex-row'
                }`}
                lg={3}
              >
                <ButtonGroup className="s-parent-width" vertical>
                  <Buttons
                    id={id}
                    roomName={name}
                    btnText="Edit Room"
                    btnName="edit"
                    btnColor="info"
                    handleClick={e => onUpdate(e)}
                    size="lg"
                  />
                  <Buttons
                    id={id}
                    roomName={name}
                    btnText="Delete Room"
                    btnName="delete"
                    btnColor="danger"
                    handleClick={e => onDelete(e)}
                    size="lg"
                  />
                </ButtonGroup>
              </Col>
            ) : (
              <Fragment></Fragment>
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
  currUser: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default RoomList;
