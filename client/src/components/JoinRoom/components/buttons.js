import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const Buttons = props => {
  return (
    <Button
      className="s-parent-width"
      id={props.id}
      name={props.btnName}
      color={props.btnColor}
      onClick={props.handleClick}
      size={props.size}>
      {props.btnText}
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
