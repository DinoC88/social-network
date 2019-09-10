import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

interface ProfileProps {
  profile: any;
}
interface ProfileState {}

class ProfileAbout extends Component<ProfileProps, ProfileState> {
  render() {
    const { profile } = this.props;
    // Get first name
    const firstName = profile.name ? profile.name.trim().split(' ') : '';

    // Skill List
    const skills = profile.skills.split(',').map((skill: string, index: number) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? <span>{firstName} does not have a bio</span> : <span>{profile.bio}</span>}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">{skills}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
