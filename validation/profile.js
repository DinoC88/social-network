const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 4, max: 40 })) {
    errors.handle = "Handle needs to be between 4 and 40 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is require";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is require";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is require";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};