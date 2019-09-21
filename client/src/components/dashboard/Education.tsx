import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { AppState } from '../../reducers';
import { AppActions } from '../../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { deleteEduRequest } from '../../actions/profileActions';
import { selectEducation } from '../../selectors/selectors';

interface EducationProps {}
interface EducationState {}

type Props = EducationProps & LinkDispatchProps & LinkStateProp;

class Education extends Component<Props, EducationState> {
  onDeleteClick(id: number) {
    this.props.deleteEduRequest(id);
  }
  render() {
    const education = this.props.education
      ? this.props.education.map((edu: any) => (
          <tr key={edu.id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
              <Moment format="YYYY/MM/DD">{edu.from_date}</Moment> -{' '}
              {edu.current === 1 ? ' Now' : <Moment format="YYYY/MM/DD">{edu.to_date}</Moment>}
            </td>
            <td>
              <div className="d-none d-md-block">
                <button onClick={this.onDeleteClick.bind(this, edu.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      : null;
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

interface LinkStateProp {
  education: any;
}
interface LinkDispatchProps {
  deleteEduRequest: (id: number) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  education: selectEducation(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: EducationProps
): LinkDispatchProps => ({
  deleteEduRequest: bindActionCreators(deleteEduRequest, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Education);
