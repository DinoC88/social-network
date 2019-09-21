import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../types/types';
import { bindActionCreators } from 'redux';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Education from './Education';
import Experience from './Experience';
import { requestProfileToken, requestEduToken, requestExpToken, deleteAccRequest } from '../../actions/profileActions';
import { selectProfile, selectIsProfileLoading, selectUser } from '../../selectors/selectors';

interface DashboardProps {}
interface DashboardState {}

type Props = DashboardProps & LinkDispatchProps & LinkStateProp;

class Dashboard extends React.Component<Props, DashboardState> {
  componentDidMount() {
    this.props.requestProfileToken();
    this.props.requestEduToken();
    this.props.requestExpToken();
  }

  onDeleteClick = () => {
    if (window.confirm('Are you sure? This can not be undone')) {
      this.props.deleteAccRequest();
    }
  };
  render() {
    const { profile, isLoading, user } = this.props;
    let dashboardContent;
    if (!profile || isLoading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged user has empty profile
      if (profile.length === 0) {
        // User is logged but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience />
            <Education />
            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete My Account
            </button>
          </div>
        );
      }
    }
    return (
      <div style={{ minHeight: '100vh' }} className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface LinkStateProp {
  isLoading: boolean;
  profile: any;
  user: any;
}
interface LinkDispatchProps {
  requestProfileToken: () => any;
  requestEduToken: () => any;
  requestExpToken: () => any;
  deleteAccRequest: () => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  isLoading: selectIsProfileLoading(state),
  profile: selectProfile(state),
  user: selectUser(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: DashboardProps
): LinkDispatchProps => ({
  requestProfileToken: bindActionCreators(requestProfileToken, dispatch),
  requestEduToken: bindActionCreators(requestEduToken, dispatch),
  requestExpToken: bindActionCreators(requestExpToken, dispatch),
  deleteAccRequest: bindActionCreators(deleteAccRequest, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
