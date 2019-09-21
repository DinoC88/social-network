import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../types/types';
import { bindActionCreators } from 'redux';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { IProfile } from '../../interface/profile.interface';
import { requestProfiles } from '../../actions/profileActions';
import { selectProfiles, selectIsProfileLoading } from '../../selectors/selectors';

interface ProfilesProps {}
interface ProfilesState {}

type Props = ProfilesProps & LinkDispatchProps & LinkStateProp;

class Profiles extends React.Component<Props, ProfilesState> {
  componentDidMount() {
    this.props.requestProfiles();
  }
  render() {
    const { profile, isLoading } = this.props;
    let profileItems;
    if (profile === null || isLoading) {
      profileItems = <Spinner />;
    } else {
      if (profile !== undefined) {
        profileItems = profile.map((profileItem: IProfile) => (
          <ProfileItem key={profileItem.id} profile={profileItem} />
        ));
      } else {
        profileItems = <h4>No profiles found</h4>;
      }
    }
    return (
      <div style={{ minHeight: '100vh' }} className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer profiles</h1>
              <p className="lead text-center">Browse and connect with developers</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface LinkStateProp {
  profile: any;
  isLoading: boolean;
}
interface LinkDispatchProps {
  requestProfiles: () => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  profile: selectProfiles(state),
  isLoading: selectIsProfileLoading(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: ProfilesProps
): LinkDispatchProps => ({
  requestProfiles: bindActionCreators(requestProfiles, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
