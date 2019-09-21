import React from 'react';
import { History } from 'history';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { AppActions } from '../../types/types';
import { AppState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { registerRequest } from '../../actions/authActions';
import { selectErrors, selectIsAuth } from '../../selectors/selectors';

interface RegisterProps {
  history: History;
}
interface RegisterState {
  name: string;
  email: string;
  password: string;
  password2: string;
}

type Props = RegisterProps & LinkDispatchProps & LinkStateProp;

class Register extends React.Component<Props, RegisterState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
    };
  }
  componentDidMount() {
    if (this.props.isAuth) {
      this.props.history.push('/dashboard');
    }
  }
  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState(({ [e.target.name]: e.target.value } as unknown) as RegisterState);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerRequest(newUser, this.props.history);
  };
  render() {
    const { error } = this.props;

    return (
      <div style={{ minHeight: '100vh' }} className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Devnet account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={error.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={error.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={error.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={error.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface Errors {
  name: string;
  email: string;
  password: string;
  password2: string;
}

interface LinkStateProp {
  isAuth: boolean;
  error: Errors;
}
interface LinkDispatchProps {
  registerRequest: (userData: any, history: any) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  isAuth: selectIsAuth(state),
  error: selectErrors(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  registerRequest: bindActionCreators(registerRequest, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register as any));
