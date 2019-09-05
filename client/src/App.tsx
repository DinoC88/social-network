import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './types/types';
import EditProfile from './components/edit-profile/EditProfile';
import AddEducation from './components/add-credentials/AddEducation';
import AddExperience from './components/add-credentials/AddExperience';
import Posts from './components/posts/Posts';
//Check for token
if (localStorage.jwtToken !== undefined) {
	//Set auth token
	setAuthToken(localStorage.jwtToken);
	//Decode token and get user info and exp
	const decoded: any = jwt_decode(localStorage.jwtToken);
	//Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//Logout user
		localStorage.removeItem('jwtToken');
		setAuthToken(false);
		store.dispatch({
			type: SET_CURRENT_USER,
			payload: {}
		});
		//Redirect to login
		window.location.href = '/login';
	}
}

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profiles" component={Profiles} />
						<Route exact path="/profile/:id" component={Profile} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<PrivateRoute path="/create-profile" component={CreateProfile} />
						<PrivateRoute path="/edit-profile" component={EditProfile} />
						<PrivateRoute exact path="/add-education" component={AddEducation} />
						<PrivateRoute exact path="/add-experience" component={AddExperience} />
						<PrivateRoute exact path="/feed" component={Posts} />
					</Switch>
					<Footer />
				</Router>
			</Provider>
		);
	}
}
export default App;
