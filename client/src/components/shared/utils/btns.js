import React, { Fragment } from 'react';
import { Button } from 'reactstrap';

export const authBtns = (invokedLoc, handleModal) => (
  <Fragment>
    <Button color="primary">
      {invokedLoc === 'navbar' ? (
        <Fragment>Create</Fragment>
      ) : invokedLoc === 'edit' ? (
        <Fragment>Edit</Fragment>
      ) : (
        <Fragment>Delete</Fragment>
      )}
    </Button>{' '}
    <Button color="secondary" onClick={handleModal}>
      Cancel
    </Button>
  </Fragment>
);

export const guestBtns = handleModal => (
  <Button color="info" href="/Auth/login" onClick={handleModal}>
    Login
  </Button>
);
