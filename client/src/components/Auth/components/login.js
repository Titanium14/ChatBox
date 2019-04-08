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
import { loginUser } from '../../../redux/actions/authActions';

// Importing all components to be used within this file.
/* src/components/...... */
import TextFieldGroup from '../../utils/textFieldGroup';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    // This points to a method inside "redux/actions/authAction.js"
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <Card>
        <CardHeader className="text-center" tag="h2">
          Log In
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
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
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
  { loginUser }
)(withRouter(Login));
