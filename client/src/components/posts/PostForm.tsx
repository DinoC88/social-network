import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import { AppState } from '../../reducers';
import { AppActions } from '../../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

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
    this.props.addPost(newPost);
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
  addPost: (newPost: any) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  auth: state.auth,
  errors: state.error
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: PostFormProps
): LinkDispatchProps => ({
  addPost: bindActionCreators(addPost, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
