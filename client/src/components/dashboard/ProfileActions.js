import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="row" role="group">
        <div className="col-lg-4 col-lg-offset-1 col-xs-12">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      </div>
        <div className="col-lg-4 col-lg-offset-1 col-xs-12">
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link></div>
      <div className="col-lg-4 col-lg-offset-1 col-xs-12">

      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link></div>
    </div>
  );
};

export default ProfileActions;
