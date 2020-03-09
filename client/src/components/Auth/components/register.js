import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { register } from '../../../redux/actions/auth';

import TextFieldGroup from '../../shared/components/textFieldGroup';

const Register = ({ register, isAuthenticated, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    passConfirmed: ''
  });

  const { name, email, password, password2, passConfirmed } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setFormData({ ...formData, passConfirmed: 'Passwords do not match' });
    } else {
      setFormData({ ...formData, passConfirmed: '' });
      register(name, email, password);
    }
  };

  if (isAuthenticated) return <Redirect to="/Dashboard" />;

  return (
    <Card>
      <CardHeader className="text-center" tag="h2">
        Sign Up
      </CardHeader>
      <CardBody className="s-field-padding">
        <Form noValidate onSubmit={e => onSubmit(e)}>
          <TextFieldGroup
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            error={error.name}
          />
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={e => onChange(e)}
            error={error.email}
            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
          />
          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={e => onChange(e)}
            error={error.password}
          />
          <TextFieldGroup
            placeholder="Confirm password"
            name="password2"
            type="password"
            value={password2}
            onChange={e => onChange(e)}
            error={passConfirmed}
          />
          <FormGroup row>
            <Button color="primary" block>
              Sign Up
            </Button>
          </FormGroup>
        </Form>
        <Button href="/Auth/login" color="link" block>
          Have an account?
        </Button>
      </CardBody>
    </Card>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register })(Register);
