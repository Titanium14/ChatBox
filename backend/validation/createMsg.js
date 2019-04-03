const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMessageInput(data) {
  let errors = {};

  data.msgContent = !isEmpty(data.msgContent) ? data.msgContent : '';

  if (Validator.isEmpty(data.msgContent)) {
    errors.msgContent = 'Please enter a message';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
