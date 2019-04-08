import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';

// The following imports below are for Redux.
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../redux/actions/authActions';

// Importing all components to be used within this file.
/* src/components/...... */
import CreateEditRoom from '../../utils/createEditRoom';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onLogoutClick(e) {
    e.preventDefault();
    // This points to a method inside "redux/actions/authAction.js"
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // This variable is used to help determine the current location of the
    // website to apply the active property on the nav items.
    const currentPage = this.props.location.pathname;

    // This variable contains all links pertaining to any authenticated users.
    const authLinks = (
      <>
        <NavItem active={currentPage === '/Dashboard' ? true : false}>
          <NavLink href="/Dashboard">
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-circle s-profile-img"
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            {user.name}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Auth/login" onClick={this.onLogoutClick}>
            Logout
          </NavLink>
        </NavItem>
      </>
    );

    // This variable contains all links pertaining to any non-authenticated users.
    const guestLinks = (
      <>
        <NavItem active={currentPage === '/Auth/register' ? true : false}>
          <NavLink href="/Auth/register">Sign Up</NavLink>
        </NavItem>
        <NavItem active={currentPage === '/Auth/login' ? true : false}>
          <NavLink href="/Auth/login">Login</NavLink>
        </NavItem>
      </>
    );

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <h3 className="m-main-color">ChatBox</h3>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavLink
              active={currentPage === '/CreateRoom' ? true : false}
              href="#">
              <CreateEditRoom invokedLocation="NavBar" />
            </NavLink>
            <NavLink
              active={currentPage === '/JoinRoom' ? true : false}
              href="/JoinRoom">
              Join a Room
            </NavLink>
          </Nav>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// This will take the array from the Redux store and map it onto the
// array saved in state.
const mapStateToProps = state => ({
  auth: state.auth
});

// The connect method connects this component to the Redux store.
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(NavBar));
