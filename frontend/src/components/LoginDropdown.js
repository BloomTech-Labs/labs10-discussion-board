import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth0 from 'auth0-js';
import { Auth0Lock } from 'auth0-lock';
import { login, auth0Login, displayError } from '../store/actions/index.js';

// globals
import {
  auth0Domain,
  auth0ClientID,
  auth0RedirectUri
} from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  visibility: ${props => (props.isLoginDropdownClicked ? 'show' : 'hidden')};
  z-index: 9999;
  position: absolute;
  width: 270px;
  background-color: #54BDFF;
  padding: 25px;
  margin-top: 130px;
`;

const LinkForgotUserPass = styled(Link)`
  font-size: 16px;
  text-decoration: none;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class LoginDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
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

  //---------------- Form Methods --------------

  componentDidMount() {
    if (this.props.history.location.pathname !== '/') this.props.history.push('/');
  }

  componentDidUpdate(prevProps) {
    if (this.props.history.location.pathname !== prevProps.history.location.pathname) {
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

  handleInputChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  normalLogin = ev => {
    ev.preventDefault();
    const pathname = this.props.history.location.pathname;
    const creds = { ...this.state };
    this.setState(
      {
        username: '',
        password: ''
      },
      () => this.props.setIsLoginDropdownClicked(false).then(() =>
        this.props
          .login(creds)
          .then(() =>
            pathname === '/'
              ? this.props.history.push('/home')
              : this.props.history.push(pathname)
          ))
    );
  };

  handleAuth0Login = () => {
    this.lock.show();
  };

  render() {
    return (
      <FormLogin isLoginDropdownClicked={this.props.isLoginDropdownClicked}>
        <input
          onChange={this.handleInputChange}
          placeholder='Username'
          value={this.state.username}
          name='username'
          autoComplete='off'
        />
        <input
          type='password'
          onChange={this.handleInputChange}
          placeholder='Password'
          value={this.state.password}
          name='password'
          autoComplete='off'
        />
        <button
          type='submit'
          onClick={ev => this.normalLogin(ev)}
        >
          Login
        </button>
        <LinkForgotUserPass to='/request-reset-pw'>Forgot your username/password?</LinkForgotUserPass>
        <h3>----------- OR ------------</h3>
        <button type='button' onClick={() => this.handleAuth0Login()}>Login via Auth0</button>
      </FormLogin>
    );
  }
};

const mapStateToProps = state => {
  return {
    loggingInLoadingMessage: state.users.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  { auth0Login, login, displayError }
)(LoginDropdown);
