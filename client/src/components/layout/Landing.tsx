import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { History } from 'history';

interface LandingProps {
	history: History;
}

interface LandingState {}

type Props = LandingProps & LinkStateProp;

class Landing extends React.Component<Props, LandingState> {
	componentDidMount() {
		if (this.props.auth) {
			this.props.history.push('/dashboard');
		}
	}
	render() {
		return (
			<div style={{ minHeight: '100vh' }} className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">Dev Network</h1>
								<p className="lead">
									{' '}
									Create a developer profile/portfolio, share posts and get help from other developers
								</p>
								<hr />
								<Link to="/register" className="btn btn-lg btn-info mr-2">
									Sign Up
								</Link>
								<Link to="/login" className="btn btn-lg btn-light">
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

interface LinkStateProp {
	auth: boolean;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
	auth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
