import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import auth0 from 'auth0-js';
import { Auth0Lock } from 'auth0-lock';
import { connect } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';


// components
import { Header, Profiles, Profile } from './components/index.js';

// views
import { LandingView, CategoriesView } from './views/index.js';

// action creators
import { auth0Login } from './store/actions/index.js';

// globals
import {
  auth0Domain,
  auth0ClientID,
  auth0RedirectUri,
} from './globals/globals.js';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
  width: 95vw;
`;

const GlobalStyle = createGlobalStyle`
	html,
	body,
	#root {
    	margin: 0;
    	padding: 0;
		  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		  display: flex;
		  align-items: center;
		  flex-wrap: wrap;
      flex-direction: column;
      background: #EEE7C8;
	}
`;

const lock = new Auth0Lock(
  auth0ClientID,
  auth0Domain,
);

const webAuth = new auth0.WebAuth({
  domain: auth0Domain,
  clientID: auth0ClientID,
  redirectUri: auth0RedirectUri,
});



class App extends Component {
  constructor(props) {
    super(props);
    webAuth.parseHash((err, authResult) => {
      if (authResult) {
        const { accessToken, expiresIn } = authResult;
        const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('symposium_auth0_access_token', accessToken);
        localStorage.setItem('symposium_auth0_expires_at', expiresAt);
        return this.props.auth0Login(accessToken);
      } else if (err) console.log(err);
    });
  };
  handleLogin = () => {
    lock.show();
  };
  handleLogout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('symposium_auth0_access_token');
    localStorage.removeItem('symposium_auth0_expires_at');
    window.location.reload();
  };
  isAuthenticated() {
    // check whether the current time is past the access token's expiry time
    const expiresAt = localStorage.getItem('symposium_auth0_expires_at');
    return new Date().getTime() < expiresAt;
  };

  render() {
    if (this.isAuthenticated()) {
      return (
        <AppWrapper>
          <GlobalStyle />
          <Header history = { this.props.history } />
  
          <button onClick = { this.handleLogout }>Logout</button>
  
          <Route exact path='/home' component={LandingView} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <Route path='/categories' component={CategoriesView} />
        </AppWrapper>
      );
    } else {
      return (
        <div>
          <p>
            You are not authorized to view this content, please click below to
            LOGIN.
          </p>
          <button onClick = { this.handleLogin }>Login</button>
        </div>
      );
    }
  }
}

export default connect(null, { auth0Login })(App);
