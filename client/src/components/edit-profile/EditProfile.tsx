import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import isEmpty from "../../validation/is-empty";
import { History } from 'history';
import { AppState } from "../../reducers";
import { AppActions } from "../../types/types";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { createProfileRequest,requestProfileToken} from "../../actions/profileActions";
import { selectProfile, selectErrors } from '../../selectors/selectors';

interface EditProfileProps {
	history: History;
}
interface EditProfileState {
  displaySocialInputs: boolean,
      handle: string,
      company: string,
      website: string,
      location: string,
      status: string,
      skills: string,
      github: string,
      bio: string,
      twitter: string,
      facebook: string,
      linkedin: string,
      youtube: string,
      instagram: string,
}
type Props = EditProfileProps & LinkDispatchProps & LinkStateProp;

class EditProfile extends Component<Props, EditProfileState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      github: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
    };
  }
  
  componentDidMount() {
    this.props.requestProfileToken();    
  }

  componentWillReceiveProps = (nextProps: any) => {
    if (nextProps.profile[0]) {
      const profile = nextProps.profile[0];
      //Check if profile field doesnt exist and make it empty string if doesnt
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.skills = !isEmpty(profile.skills) ? profile.skills : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.github = !isEmpty(profile.github) ? profile.github : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : "";
      profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : "";
      profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : "";
      profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : "";
      profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : "";

      //set component field state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: profile.skills,
        github: profile.github,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      github: this.state.github,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfileRequest(profileData, this.props.history);
  };
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(({
      [e.target.name]: e.target.value
    }as unknown) as EditProfileState);
  };
  render() {
    const { displaySocialInputs } = this.state;
    const { error } = this.props
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={error.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={error.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={error.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={error.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={error.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div style={{minHeight: "100vh"}} className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some information to get your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={error.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={error.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={error.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={error.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={error.location}
                  info="City and state suggested"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={error.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Name"
                  name="github"
                  value={this.state.github}
                  onChange={this.onChange}
                  error={error.github}
                  info="Your GitHub Link"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={error.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
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
  error: any
}
interface LinkDispatchProps {
  createProfileRequest: (profileData: any, history: any) => any;
  requestProfileToken: () => any
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  profile: selectProfile(state),
  error: selectErrors(state)
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AppActions>,
	props: EditProfileProps
): LinkDispatchProps => ({
  createProfileRequest: bindActionCreators(createProfileRequest, dispatch),
  requestProfileToken: bindActionCreators(requestProfileToken, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile as any));


