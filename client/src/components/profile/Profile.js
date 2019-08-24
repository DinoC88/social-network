import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { getProfileByid, getCurrentEducationById, getCurrentExperienceById } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileByid(this.props.match.params.id);
      this.props.getCurrentEducationById(this.props.match.params.id);
      this.props.getCurrentExperienceById(this.props.match.params.id);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading, education, experience } = this.props.profile;
    let profileContent;
    
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile[0]} />
          <ProfileAbout profile={profile[0]} />
          <ProfileCreds
            education={education}
            experience={experience}
          />
        </div>
      );
    }
    return (
      <div style={{minHeight: "100vh"}} className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByid: PropTypes.func.isRequired,
  getCurrentEducationById: PropTypes.func.isRequired,
  getCurrentExperienceById: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  experience: state.profile,
  education: state.education
});

export default connect(
  mapStateToProps,
  { getProfileByid, getCurrentEducationById, getCurrentExperienceById }
)(Profile);