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
    if (!Validator.isURL(data.website, {protocols: ['http', 'https'], require_protocol:true })) {
      errors.website = "Not a valid URL. Example http://website.com";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube, {protocols: ['http', 'https'], require_protocol:true })) {
      errors.youtube = "Not a valid URL. Example http://youtube.com";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter, {protocols: ['http', 'https'], require_protocol:true })) {
      errors.twitter = "Not a valid URL. Example http://twitter.com";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook, {protocols: ['http', 'https'], require_protocol:true })) {
      errors.facebook = "Not a valid URL. Example http://facebook.com";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin, {protocols: ['http', 'https'], require_protocol:true })) {
      errors.linkedin = "Not a valid URL. Example http://linkedin.com";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram, {protocols: ['http', 'https'], require_protocol:true })) {
      errors.instagram = "Not a valid URL. Example http://instagram.com";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
