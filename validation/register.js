const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //convert empty fields to empty strings in order to validate
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = isEmpty(data.password2) ? "" : data.password2;

  //validation checks
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required"
  }

  if (validator.isEmpty(data.email)) {
    errors.email = " Email field is required"
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Valid Email is required"
  }

  if (validator.isEmpty(data.password)) {
    errors.password = " Password field is required"
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = " Confirm password field is required"
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least six characters long, anu!"
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password = "Mpama, passwords must match"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}