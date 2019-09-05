import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';

interface PrivateRouteProps extends RouteProps {
	component: any;
	isSignedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
	const { component: Component, isSignedIn, ...rest } = props;

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				isSignedIn ? (
					<Component {...routeProps} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: routeProps.location }
						}}
					/>
				)}
		/>
	);
};

const mapStateToProps = (state: AppState) => ({
	isSignedIn: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
