import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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

import { connect } from 'react-redux';
import { updateUser, deleteUser } from '../../redux/actions/auth';

import './Dashboard.css';

import TextFieldGroup from '../shared/components/textFieldGroup';

const Dashboard = ({
  auth: { isAuthenticated, user },
  error,
  updateUser,
  deleteUser
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    passConfirmed: ''
  });

  const { name, email, password, password2, passConfirmed } = formData;

  const onChange = e => setFormData({ [e.target.name]: e.target.value });
  const onDelete = () => deleteUser();

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setFormData({ ...formData, passConfirmed: 'Passwords do not match' });
    } else {
      setFormData({ ...formData, passConfirmed: '' });
      updateUser(name, email, password);
    }
  };

  if (!isAuthenticated) return <Redirect to="/Auth/login" />;

  return (
    <Row className="m-spacing">
      <Col />
      <Col lg={3}>
        <Card>
          <CardBody className="s-card-bg">
            <CardTitle tag="h3" className="text-center">
              {user ? user.name : null}
            </CardTitle>
            <CardImg
              className="m-img-center s-change-size"
              src={user ? user.avatar : null}
              alt="User avatar"
            />
            <Button
              className="m-spacing"
              color="danger"
              onClick={() => onDelete()}
              block
            >
              Delete account
            </Button>
          </CardBody>
        </Card>
      </Col>
      <Col lg={5}>
        <Card>
          <CardBody>
            <CardTitle tag="h3" className="text-center">
              Hello, {user ? user.name : null}!
            </CardTitle>
            <hr />
            <Form onSubmit={e => onSubmit(e)} className="s-field-padding">
              <TextFieldGroup
                classes="s-btns-design"
                placeholder="Name"
                name="name"
                type="text"
                value={name}
                onChange={e => onChange(e)}
                error={error.name}
              />
              <TextFieldGroup
                classes="s-btns-design"
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={e => onChange(e)}
                error={error.email}
              />
              <TextFieldGroup
                classes="s-btns-design"
                placeholder="New password"
                name="password"
                type="password"
                value={password}
                onChange={e => onChange(e)}
                error={error.password}
              />
              <TextFieldGroup
                classes="s-btns-design"
                placeholder="Confirm password"
                name="password2"
                type="password"
                value={password2}
                onChange={e => onChange(e)}
                error={passConfirmed}
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
};

Dashboard.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { updateUser, deleteUser })(Dashboard);
