import React, { Component } from 'react';
import auth0 from 'auth0-js';
import { Auth0Lock } from 'auth0-lock';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginDropdown from './LoginDropdown.js';
import chevron from '../assets/img/chevron.png';
// import PropTypes from 'prop-types';

// globals
import {
  auth0Domain,
  auth0ClientID,
  auth0RedirectUri
} from '../globals/globals.js';

// action creators
import { auth0Login, displayError } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const NotLoggedIn = styled.div`
  background-color: gray;
  color: white;
  font-size: 18px;
  width: 100%;
`;

const DivAuth = styled.div`
  margin: 25px;
  font-size: 24px;
`;

const LinkRegister = styled(Link)`
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

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Auth extends Component {
  constructor(props) {
    super(props);
    this.webAuth.parseHash((err, authResult) => {
      if (authResult) {
        const { accessToken, expiresIn } = authResult;
        const expiresAt = JSON.stringify(
          expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('symposium_auth0_access_token', accessToken);
        localStorage.setItem('symposium_auth0_expires_at', expiresAt);
        return this.props.auth0Login(accessToken);
      } else if (err) this.props.displayError(err);
    });

    this.state = {
      isLoginDropdownClicked: false,
      setIsLoginDropdownClicked: false
    };
    
  }

  authLockOptions = {
    rememberLastLogin: false
  };

  lock = new Auth0Lock(auth0ClientID, auth0Domain, this.authLockOptions);

  webAuth = new auth0.WebAuth({
    domain: auth0Domain,
    clientID: auth0ClientID,
    redirectUri: auth0RedirectUri
  });

  handleAuth0Login = () => {
    this.lock.show();
  };

  componentDidMount() {
    if (this.props.history.location.pathname !== '/') this.props.history.push('/');
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.authLockOptions = {
        rememberLastLogin: false
      };
      this.lock = new Auth0Lock(auth0ClientID, auth0Domain, this.authLockOptions);
      this.webAuth = new auth0.WebAuth({
        domain: auth0Domain,
        clientID: auth0ClientID,
        redirectUri: auth0RedirectUri
      });
    }
  }

  toggleLoginDropdown = ev => {
    ev.preventDefault();
    this.setIsLoginDropdownClicked(!this.state.isLoginDropdownClicked);
  };

  setIsLoginDropdownClicked = isClicked => {
    this.setState({ isLoginDropdownClicked: isClicked });
    return Promise.resolve();
  };

  render() {
    return (
      <NotLoggedIn>
        <p>
          You are not authorized to view this content, please click below to
          LOGIN.
        </p>
        <button onClick={this.handleAuth0Login}>Login via Auth0</button>

        <DivAuth>
          <LinkRegister to='/register'>Register</LinkRegister> |{' '}
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
        </DivAuth>
      </NotLoggedIn>
    );
  }
}

// Auth.propTypes = {
//   propertyName: PropTypes.string
// }

export default connect(null, { auth0Login, displayError })(Auth);
