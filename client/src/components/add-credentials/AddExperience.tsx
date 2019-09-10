import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileActions';
import { History } from 'history';
import { AppState } from '../../reducers';
import { AppActions } from '../../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

interface AddExperienceProps {
  history: History;
}
interface AddExperienceState {
  company: string;
  title: string;
  location: string;
  from_date: string;
  to_date: string;
  current: boolean;
  description: string;
  disabled: boolean;
}
type Props = AddExperienceProps & LinkDispatchProps & LinkStateProp;

class AddExperience extends Component<Props, AddExperienceState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      from_date: '',
      to_date: '',
      current: false,
      description: '',
      disabled: false
    };
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(({
      [e.target.name]: e.target.value
    } as unknown) as AddExperienceState);
  };

  onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(({
      disabled: !this.state.disabled,
      current: !this.state.current
    } as unknown) as AddExperienceState);
  };
  render() {
    const { error } = this.props;
    console.log(this.state.disabled);
    return (
      <div style={{ minHeight: '100vh' }} className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-board text-center">Add experience</h1>
              <p className="lead tex-center">Add any job or position that you have had in the past or current</p>
              <small className="display-block pb3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={error.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={error.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={error.location}
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
                    Current
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={error.description}
                  info="Tell us about the the position"
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
  addExperience: (eduData: any, history: any) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  profile: state.profile.profiletest[0],
  error: state.error
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: AddExperienceState
): LinkDispatchProps => ({
  addExperience: bindActionCreators(addExperience, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience as any));
