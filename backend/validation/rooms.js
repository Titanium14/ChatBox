const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRoomInput(data) {
  let errors = {};

  data.roomName = !isEmpty(data.roomName) ? data.roomName : '';

  if (Validator.isEmpty(data.roomName)) {
    errors.roomName = 'Room name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
