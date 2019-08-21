import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import { setCurrentUser, logoutUser } from "./actions/authActions";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';



//Check for token
if (localStorage.jwtToken) {
  //Set auth token
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current profile TODO!

    //Redirect to login
    window.location.href = "/login";
  }
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
          <div className="container">      
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        <Footer />
        </div>
      </Router>
      </Provider>

  );
}

export default App;
