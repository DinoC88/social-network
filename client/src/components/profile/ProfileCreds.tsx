import React from 'react';
import Moment from 'react-moment';

interface ProfileCredsProps {
  experience: any;
  education: any;
}
interface ProfileCredsState {}

class ProfileCreds extends React.Component<ProfileCredsProps, ProfileCredsState> {
  render() {
    const { experience, education } = this.props;
    const expItems = experience
      ? experience.map((exp: any) => (
          <li key={exp.id} className="list-group-item">
            <h4>{exp.company}</h4>
            <p>
              <Moment format="YYYY/MM/DD">{exp.from_date}</Moment> -
              {exp.to_date === null ? ' Now' : <Moment format="YYYY/MM/DD">{exp.to_date}</Moment>}
            </p>
            <p>
              <strong>Position:</strong> {exp.title}
            </p>
            <p>
              {exp.location === '' ? null : (
                <span>
                  <strong>Location: </strong> {exp.location}
                </span>
              )}
            </p>
            <p>
              {exp.description === '' ? null : (
                <span>
                  <strong>Description: </strong> {exp.description}
                </span>
              )}
            </p>
          </li>
        ))
      : 'No experience';

    const eduItems = education
      ? education.map((edu: any) => (
          <li key={edu.id} className="list-group-item">
            <h4>{edu.school}</h4>
            <p>
              <Moment format="YYYY/MM/DD">{edu.from_date}</Moment> -
              {edu.to_date === null ? ' Now' : <Moment format="YYYY/MM/DD">{edu.to_date}</Moment>}
            </p>
            <p>
              <strong>Degree:</strong> {edu.degree}
            </p>
            <p>
              <strong>Field Of Study:</strong> {edu.fieldofstudy}
            </p>
            <p>
              {edu.description === '' ? null : (
                <span>
                  <strong>Description: </strong> {edu.description}
                </span>
              )}
            </p>
          </li>
        ))
      : 'No education';
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
