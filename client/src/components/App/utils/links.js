import React, { Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';

export const authLinks = (user, pathname, onLogout) => (
  <Fragment>
    <NavItem active={pathname === '/Dashboard' ? true : false}>
      <NavLink href="/Dashboard">
        <img
          src={user ? user.avatar : null}
          alt={user ? user.name : null}
          className="rounded-circle s-profile-img"
          title="You must have a Gravatar connected to your email to display an image"
        />{' '}
        {user ? user.name : null}
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/Auth/login" onClick={e => onLogout(e)}>
        Logout
      </NavLink>
    </NavItem>
  </Fragment>
);

export const guestLinks = pathname => (
  <Fragment>
    <NavItem active={pathname === '/Auth/register' ? true : false}>
      <NavLink href="/Auth/register">Sign Up</NavLink>
    </NavItem>
    <NavItem active={pathname === '/Auth/login' ? true : false}>
      <NavLink href="/Auth/login">Login</NavLink>
    </NavItem>
  </Fragment>
);
