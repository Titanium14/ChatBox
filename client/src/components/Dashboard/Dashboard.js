import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Form,
  Button,
  FormGroup
} from 'reactstrap';
import PropTypes from 'prop-types';

// The following imports below are for Redux.
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, deleteUser } from '../../redux/actions/authActions';

// Importing the custom styles in.
import './Dashboard.css';

// Importing all components to be used within this file.
/* src/components/.... */
import TextFieldGroup from '../utils/textFieldGroup';

class Dashboard extends Component {
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
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    // This ensures that the page is only accessed by authenticated users.
    if (!this.props.auth.isAuthenticated) {
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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDelete() {
    this.props.deleteUser(this.props.history);
  }

  onSubmit(e) {
    e.preventDefault();

    const updateUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.editUser(updateUser);

    setTimeout(() => {
      if (
        Object.entries(this.state.errors).length === 0 &&
        this.state.errors.constructor === Object
      ) {
        this.props.history.push('/');
        this.props.history.push('/Dashboard');
      }
    }, 300);
  }

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;

    return (
      <Row className="m-spacing">
        <Col />
        <Col lg={3}>
          <Card>
            <CardBody className="s-card-bg">
              <CardTitle tag="h3" className="text-center">
                {user.name}
              </CardTitle>
              <CardImg
                className="m-img-center s-change-size"
                src={user.avatar}
                alt="User avatar"
              />
              <Button className="m-spacing" color="danger" onClick={this.onDelete} block>
                Delete account
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col lg={5}>
          <Card>
            <CardBody>
              <CardTitle tag="h3" className="text-center">
                Hello, {user.name}! Welcome to your dashboard!
              </CardTitle>
              <hr />
              <Form onSubmit={this.onSubmit} className="s-field-padding">
                <TextFieldGroup
                  classes="s-btns-design"
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  classes="s-btns-design"
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  classes="s-btns-design"
                  placeholder="New password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  classes="s-btns-design"
                  placeholder="Confirm password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <FormGroup row>
                  <Button color="primary" block>
                    Update
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col />
      </Row>
    );
  }
}

Dashboard.propTypes = {
  editUser: PropTypes.func.isRequired,
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
  { editUser, deleteUser }
)(withRouter(Dashboard));
