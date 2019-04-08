import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import PropTypes from 'prop-types';

// The following imports below are for Redux.
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../../redux/actions/authActions';

// Importing all components to be used within this file.
/* src/components/...... */
import TextFieldGroup from '../../utils/textFieldGroup';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // This ensures that the page is only accessed by authenticated users.
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  // This method occurs only if there are any changes in props.
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // If, when re-rendered, there are any lingering errors, store in state.
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
    if (this.props.auth.isAuthenticated) {
      this.setState({ isAuthenticated: this.props.auth.isAuthenticated });
      this.props.history.push('/');
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // This points to a method inside "redux/actions/authAction.js"
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <Card>
        <CardHeader className="text-center" tag="h2">
          Sign Up
        </CardHeader>
        <CardBody>
          <Form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextFieldGroup
              placeholder="Confirm password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
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
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// This will take the array from the Redux store and map it onto the
// array saved in state.
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// The connect method connects this component to the Redux store.
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
