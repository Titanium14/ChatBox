import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../../redux/actions/auth';

import CrudModal from '../../shared/components/crudModal';
import { authLinks, guestLinks } from '../utils/links';

const NavBar = ({
  auth: { user, isAuthenticated },
  logout,
  history,
  location: { pathname }
}) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleModal = () => setModal(!modal);

  const onLogout = e => {
    e.preventDefault();
    logout(history);
  };

  const aLinks = authLinks(user ? user : null, pathname, onLogout);
  const gLinks = guestLinks(pathname);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <h3 className="m-main-color">ChatBox</h3>
      </NavbarBrand>
      <NavbarToggler onClick={handleOpen} />
      <Collapse isOpen={open} navbar>
        <Nav className="mr-auto" navbar>
          <NavLink active={pathname === '/CreateRoom' ? true : false} href="#">
            <CrudModal
              invokedLoc="navbar"
              modal={modal}
              handleModal={handleModal}
            />
          </NavLink>
          <NavLink active={pathname === '/Rooms' ? true : false} href="/Rooms">
            Join a Room
          </NavLink>
        </Nav>
        <Nav className="ml-auto" navbar>
          {isAuthenticated ? aLinks : gLinks}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(withRouter(NavBar));
