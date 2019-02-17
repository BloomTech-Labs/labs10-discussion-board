import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import auth0 from 'auth0-js';
import { login } from '../store/actions';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  visibility: ${props => (props.isLoginDropdownClicked ? 'show' : 'hidden')};
  z-index: 9999;
  position: relative;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class LoginDropdown extends Component {
  auth0 = new auth0.WebAuth({
    // need to create auth0 account and apply settings...
    // https://www.youtube.com/watch?v=QsMK3d3LxYQ
    domain: 'domain.auth0.com',
    clientID: 'random string provided by auth0 account',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'domain.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  //---------------- Form Methods --------------
  handleInputChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  submitHandler = (ev, loginType) => {
    ev.preventDefault();
    switch (loginType) {
      default:
        this.normalLogin();
    }
  };

  normalLogin = () => {
    const pathname = this.props.history.location.pathname;
    const creds = { ...this.state };
    this.setState(
      {
        username: '',
        password: ''
      },
      () =>
        this.props
          .login(creds)
          .then(() => this.props.setIsLoginDropdownClicked(false))
          .then(() =>
            pathname === '/'
              ? this.props.history.push('/home')
              : this.props.history.push(pathname)
          )
    );
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
          onChange={this.handleInputChange}
          placeholder='Password'
          value={this.state.password}
          name='password'
          autoComplete='off'
        />
        <button
          type='submit'
          onClick={ev => this.submitHandler(ev, 'normalLogin')}
        >
          Login
        </button>
      </FormLogin>
    );
  }
}

// LoginDropdown.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => {
  return {
    loggingInLoadingMessage: state.users.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  { login }
)(LoginDropdown);
