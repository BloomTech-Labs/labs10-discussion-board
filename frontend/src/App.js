import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import auth0 from 'auth0-js';
import { Auth0Lock } from 'auth0-lock';
import { connect } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

// components
import {
  Header,
  Profiles,
  Profile,
  Settings,
  Auth
} from './components/index.js';

// views
import {
  LandingView,
  CategoriesView,
  DiscussionView,
  DiscussionsView,
  RegisterView
} from './views/index.js';

// action creators
import { auth0Login, logBackIn } from './store/actions/index.js';

// globals
import {
  auth0Domain,
  auth0ClientID,
  auth0RedirectUri
} from './globals/globals.js';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
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
      width: 100%;
	}
`;

const authLockOptions = {
  rememberLastLogin: false
};

const lock = new Auth0Lock(auth0ClientID, auth0Domain, authLockOptions);

const webAuth = new auth0.WebAuth({
  domain: auth0Domain,
  clientID: auth0ClientID,
  redirectUri: auth0RedirectUri
});

class App extends Component {
  constructor(props) {
    super(props);
    webAuth.parseHash((err, authResult) => {
      if (authResult) {
        const { accessToken, expiresIn } = authResult;
        const expiresAt = JSON.stringify(
          expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('symposium_auth0_access_token', accessToken);
        localStorage.setItem('symposium_auth0_expires_at', expiresAt);
        return this.props.auth0Login(accessToken);
      } else if (err) console.log(err);
    });
  }
  handleAuth0Login = () => {
    lock.show();
  };
  isAuthenticated() {
    // check whether the current time is past the access token's expiry time
    const expiresAt = localStorage.getItem('symposium_auth0_expires_at');
    return new Date().getTime() < expiresAt;
  }
  componentDidMount() {
    const user_id = localStorage.getItem('symposium_user_id');
    const token = localStorage.getItem('symposium_token');
    if (user_id && token) return this.props.logBackIn(user_id, token);
  }
  render() {
    if (this.isAuthenticated() || localStorage.getItem('symposium_user_id')) {
      return (
        <AppWrapper>
          <GlobalStyle />
          <Header history={this.props.history} />
          <Route exact path='/home' component={LandingView} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <Route path='/categories' component={CategoriesView} />
          <Route path='/discussion/:id' component={DiscussionView} />
          <Route path='/settings/:id' component={Settings} />
        </AppWrapper>
      );
    } else {
      // prettier-ignore
      return (
        <AppWrapper>
          <GlobalStyle />
          <Switch>
            <Route exact path='/register' component={RegisterView} />
            <Route render={props => <Auth {...props} handleAuth0Login={this.handleAuth0Login} />}/>
          </Switch>
        </AppWrapper>
      );
    }
  }
}

export default connect(
  null,
  { auth0Login, logBackIn }
)(App);
