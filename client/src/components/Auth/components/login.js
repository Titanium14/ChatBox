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
import { login } from '../../../redux/actions/auth';

import TextFieldGroup from '../../shared/components/textFieldGroup';

const Login = ({ login, isAuthenticated, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) return <Redirect to="/Dashboard" />;

  return (
    <Card>
      <CardHeader className="text-center" tag="h2">
        Log In
      </CardHeader>
      <CardBody className="s-field-padding">
        <Form onSubmit={e => onSubmit(e)}>
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={e => onChange(e)}
            error={error.email}
          />
          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={e => onChange(e)}
            error={error.password}
          />
          <FormGroup row>
            <Button color="primary" block>
              Login
            </Button>
          </FormGroup>
        </Form>
        <Button href="/Auth/register" color="link" block>
          Create account
        </Button>
      </CardBody>
    </Card>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login })(Login);
