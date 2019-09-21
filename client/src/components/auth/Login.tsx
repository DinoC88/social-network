import React from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { AppState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { AppActions } from '../../types/types';
import { IErrors } from '../../interface/error.interface';
import { loginRequest } from '../../actions/authActions';
import { selectErrors, selectUser, selectIsAuth } from '../../selectors/selectors';

interface LoginProps {
  history: any;
}
interface LoginState {
  email: string;
  password: string;
}

type Props = LoginProps & LinkDispatchProps & LinkStateProp;

class Login extends React.Component<Props, LoginState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    if (this.props.isAuth) {
      this.props.history.push('/dashboard');
    }
  }
  private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: LoginState = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginRequest(userData, this.props.history);
  };
  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState(({ [e.target.name]: e.target.value } as unknown) as LoginState);
  };
  public render() {
    const { error } = this.props;
    return (
      <div style={{ minHeight: '100vh' }} className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your Devnet account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Adress"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={error.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={error.password}
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

interface LinkStateProp {
  isAuth: boolean;
  user: any;
  error: IErrors;
}
interface LinkDispatchProps {
  loginRequest: (userData: any, history: any) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  isAuth: selectIsAuth(state),
  user: selectUser(state),
  error: selectErrors(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  loginRequest: bindActionCreators(loginRequest, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login as any);
