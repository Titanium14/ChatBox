import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const Buttons = ({
  id,
  roomName,
  btnText,
  btnName,
  btnColor,
  handleClick,
  size
}) => {
  return (
    <Button
      className="s-parent-width"
      room={roomName}
      id={id}
      name={btnName}
      color={btnColor}
      onClick={e => handleClick(e)}
      size={size}
    >
      {btnText}
    </Button>
  );
};

Buttons.propTypes = {
  id: PropTypes.string,
  btnText: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
  btnColor: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  size: PropTypes.string
};

export default Buttons;
