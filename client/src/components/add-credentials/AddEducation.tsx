import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';
import { History } from 'history';
import { AppState } from '../../reducers';
import { AppActions } from '../../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

interface AddEducationProps {
  history: History;
}
interface AddEducationState {
  school: string;
  degree: string;
  fieldofstudy: string;
  from_date: string;
  to_date: string;
  current: boolean;
  description: string;
  disabled: boolean;
}
type Props = AddEducationProps & LinkDispatchProps & LinkStateProp;

class AddEducation extends Component<Props, AddEducationState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from_date: '',
      to_date: '',
      current: false,
      description: '',
      disabled: false
    };
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      current: this.state.current,
      description: this.state.description
    };
    console.log(eduData);
    this.props.addEducation(eduData, this.props.history);
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(({
      [e.target.name]: e.target.value
    } as unknown) as AddEducationState);
  };

  onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(({
      disabled: !this.state.disabled,
      current: !this.state.current
    } as unknown) as AddEducationState);
  };
  render() {
    const { error } = this.props;
    return (
      <div style={{ minHeight: '100vh' }} className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-board text-center">Add education</h1>
              <p className="lead tex-center">Add any school, bootcamp etc that you have attended</p>
              <small className="display-block pb3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={error.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={error.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={error.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from_date"
                  type="date"
                  value={this.state.from_date}
                  onChange={this.onChange}
                  error={error.from_date}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to_date"
                  type="date"
                  value={this.state.to_date}
                  onChange={this.onChange}
                  error={error.to_date}
                  disabled={`${this.state.disabled}`}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current ? 'Current' : ''}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={error.description}
                  info="Tell us about the the program that you were in"
                />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface LinkStateProp {
  profile: any;
  error: any;
}
interface LinkDispatchProps {
  addEducation: (eduData: any, history: any) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  profile: state.profile.profiletest[0],
  error: state.error
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: AddEducationProps
): LinkDispatchProps => ({
  addEducation: bindActionCreators(addEducation, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation as any));
