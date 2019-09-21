import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { AppState } from '../../reducers';
import { AppActions } from '../../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { addPostRequest } from '../../actions/postActions';
import { selectErrors, selectAuth } from '../../selectors/selectors';
interface PostFormProps {}
interface PostFormState {
  text: string;
}

type Props = PostFormProps & LinkDispatchProps & LinkStateProp;

class PostForm extends Component<Props, PostFormState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const newPost: any = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPostRequest(newPost);
    this.setState({ text: '' });
  };
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(({ [e.target.name]: e.target.value } as unknown) as PostFormState);
  };
  render() {
    const { errors } = this.props;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

interface LinkStateProp {
  auth: any;
  errors: any;
}
interface LinkDispatchProps {
  addPostRequest: (newPost: any) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  auth: selectAuth(state),
  errors: selectErrors(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: PostFormProps
): LinkDispatchProps => ({
  addPostRequest: bindActionCreators(addPostRequest, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
