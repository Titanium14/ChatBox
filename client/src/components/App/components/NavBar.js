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
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../redux/actions/authActions';

import CreateRoom from './createRoom';

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
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const currentPage = this.props.location.pathname;

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
              <CreateRoom />
            </NavLink>
            <NavLink
              active={currentPage === '/JoinRoom' ? true : false}
              href="/JoinRoom">
              Join a Room
            </NavLink>
            <NavLink
              active={currentPage === '/UserRooms' ? true : false}
              href="/UserRooms">
              Your Rooms
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(NavBar));
