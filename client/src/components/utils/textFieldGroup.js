import React from 'react';
import { FormGroup, Input, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  err,
  info,
  type,
  onChange,
  disabled,
  classes
}) => {
  return (
    <FormGroup row>
      <Input
        type={type}
        className={
          err ? `is-invalid ${classes ? classes : ''}` : classes ? classes : ''
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {err && <FormFeedback>{err}</FormFeedback>}
    </FormGroup>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  err: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  classes: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
