import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import auth0 from 'auth0-js';
import { Auth0Lock } from 'auth0-lock';
import { connect } from 'react-redux';
import { LoginDropdown } from './components/index.js';
import chevron from '../src/assets/img/chevron.png';
import styled, { createGlobalStyle } from 'styled-components';

// components
import { Header, Profiles, Profile } from './components/index.js';

// views
import { LandingView, CategoriesView } from './views/index.js';

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

const Auth = styled.div`
  margin: 25px;
  font-size: 24px;
`;
const Register = styled.a`
  margin-right: 0px;
  user-select: none;
  cursor: pointer;
  color: white;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: black;
    text-decoration: underline;
  }
`;

const Login = styled.a`
  margin-left: 5px;
  user-select: none;
  cursor: pointer;
  color: white;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: black;
    text-decoration: underline;
  }

  img {
    transform: ${props => props.isLoginDropdownClicked && 'rotate(180deg)'};
  }
`;

const NotLoggedIn = styled.div`
  background-color: gray;
  color: white;
  font-size: 18px;
`;

const lock = new Auth0Lock(auth0ClientID, auth0Domain);

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
    this.state = {
      isLoginDropdownClicked: false
    };
  }
  handleAuth0Login = () => {
    lock.show();
  };
  isAuthenticated() {
    // check whether the current time is past the access token's expiry time
    const expiresAt = localStorage.getItem('symposium_auth0_expires_at');
    return new Date().getTime() < expiresAt;
  }
  setIsLoginDropdownClicked = async isClicked => {
    await this.setState({ isLoginDropdownClicked: isClicked });
  };
  toggleLoginDropdown = ev => {
    ev.preventDefault();
    this.setIsLoginDropdownClicked(!this.state.isLoginDropdownClicked);
  };
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
        </AppWrapper>
      );
    } else {
      return (
        <NotLoggedIn>
          <p>
            You are not authorized to view this content, please click below to
            LOGIN.
          </p>
          <button onClick={this.handleAuth0Login}>Login via Auth0</button>

          <Auth>
            <Register>Register</Register> |{' '}
            <Login
              onClick={ev => {
                this.toggleLoginDropdown(ev);
              }}
              isLoginDropdownClicked={this.state.isLoginDropdownClicked}
            >
              Login &nbsp;
              <img src={chevron} alt='chevron' />
            </Login>
            <LoginDropdown
              history={this.props.history}
              isLoginDropdownClicked={this.state.isLoginDropdownClicked}
              setIsLoginDropdownClicked={this.setIsLoginDropdownClicked}
            />
          </Auth>
        </NotLoggedIn>
      );
    }
  }
}

export default connect(
  null,
  { auth0Login, logBackIn }
)(App);
