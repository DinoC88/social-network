import React from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import { IProfile } from '../../interface/profile.interface';

interface ProfileItemProps {
  profile: IProfile;
}

class ProfileItem extends React.Component<ProfileItemProps> {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.name}</h3>
            <p>
              {profile.status} {isEmpty(profile.company) ? null : <span>at {profile.company}</span>}
            </p>
            <p>{isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
            <Link to={`/profile/${profile.userid}`} className="btn btn-info">
              View profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill set</h4>
            <ul className="list-group">
              {profile.skills.split(',').slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
