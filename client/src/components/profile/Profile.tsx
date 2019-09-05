import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/Spinner';
import { RouteComponentProps } from 'react-router-dom';
import { getProfileByid, getCurrentEducationById, getCurrentExperienceById } from '../../actions/profileActions';
import { History } from 'history';
import { AppState } from '../../reducers';
import { AppActions } from '../../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

type RouteParams = {
	id: any;
};
interface RouteProps extends RouteComponentProps<RouteParams>, React.Props<RouteParams> {}
interface ProfileProps {
	history: History;
}
interface ProfileState {
	isLoading: boolean;
}

type Props = ProfileProps & LinkDispatchProps & LinkStateProp & RouteProps;

class Profile extends React.Component<Props, ProfileState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isLoading: true
		};
	}
	async componentDidMount() {
		await this.props.getProfileByid(this.props.match.params.id);
		await this.props.getCurrentEducationById(this.props.match.params.id);
		await this.props.getCurrentExperienceById(this.props.match.params.id);
		this.setState({
			isLoading: false
		});
	}

	render() {
		const { profile, education, experience } = this.props;
		let profileContent;
		if (profile === undefined || education === undefined || experience === undefined || this.state.isLoading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back To Profiles
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<ProfileHeader profile={profile[0]} />
					<ProfileAbout profile={profile[0]} />
					<ProfileCreds education={education} experience={experience} />
				</div>
			);
		}
		return (
			<div style={{ minHeight: '100vh' }} className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

interface LinkStateProp {
	profile: any;
	isLoading: boolean;
	experience: any;
	education: any;
}
interface LinkDispatchProps {
	getProfileByid: (id: number) => any;
	getCurrentEducationById: (id: number) => any;
	getCurrentExperienceById: (id: number) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
	profile: state.profile.profiletest[0],
	isLoading: state.profile.isLoading,
	experience: state.profile.experience[0],
	education: state.profile.education[0]
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
	getProfileByid: bindActionCreators(getProfileByid, dispatch),
	getCurrentEducationById: bindActionCreators(getCurrentEducationById, dispatch),
	getCurrentExperienceById: bindActionCreators(getCurrentExperienceById, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile as any);
