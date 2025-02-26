import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { AppState } from '../../reducers';
import { AppActions } from '../../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { deleteExpRequest } from '../../actions/profileActions';
import { selectExperience } from '../../selectors/selectors';

interface ExperienceProps {}
interface ExperienceState {}

type Props = ExperienceProps & LinkDispatchProps & LinkStateProp;

class Experience extends Component<Props, ExperienceState> {
  onDeleteClick(id: number) {
    this.props.deleteExpRequest(id);
  }
  render() {
    const experience = this.props.experience
      ? this.props.experience.map((exp: any) => (
          <tr key={exp.id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              <Moment format="YYYY/MM/DD">{exp.from_date}</Moment> -{' '}
              {exp.current === 1 ? ' Now' : <Moment format="YYYY/MM/DD">{exp.to_date}</Moment>}
            </td>
            <td>
              <div className="d-none d-md-block">
                <button onClick={this.onDeleteClick.bind(this, exp.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      : null;
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

interface LinkStateProp {
  experience: any;
}
interface LinkDispatchProps {
  deleteExpRequest: (id: number) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  experience: selectExperience(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: ExperienceProps
): LinkDispatchProps => ({
  deleteExpRequest: bindActionCreators(deleteExpRequest, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Experience);
