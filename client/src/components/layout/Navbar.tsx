import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../types/types';
import { bindActionCreators } from 'redux';
import { logoutRequest } from '../../actions/authActions';
import { selectUser, selectIsAuth } from '../../selectors/selectors';

interface NavbarProps {}
interface NavbarState {}

type Props = NavbarProps & LinkDispatchProps & LinkStateProp;

class Navbar extends React.Component<Props, NavbarState> {
  onLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.props.logoutRequest();
  };

  render() {
    const { auth, user } = this.props;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="" onClick={this.onLogoutClick} className="nav-link">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            Logout
          </Link>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevNet
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </Link>
              </li>
            </ul>
            {auth ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

interface LinkStateProp {
  auth: boolean;
  user: any;
}
interface LinkDispatchProps {
  logoutRequest: () => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  auth: selectIsAuth(state),
  user: selectUser(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  logoutRequest: bindActionCreators(logoutRequest, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
