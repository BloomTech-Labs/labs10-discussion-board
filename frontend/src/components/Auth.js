import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginDropdown from './LoginDropdown.js';
import chevron from '../assets/img/chevron.png';
// import PropTypes from 'prop-types';

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
    this.state = {
      isLoginDropdownClicked: false,
      setIsLoginDropdownClicked: false
    };
  }

  toggleLoginDropdown = ev => {
    ev.preventDefault();
    this.setIsLoginDropdownClicked(!this.state.isLoginDropdownClicked);
  };

  setIsLoginDropdownClicked = async isClicked => {
    await this.setState({ isLoginDropdownClicked: isClicked });
  };

  render() {
    return (
      <NotLoggedIn>
        <p>
          You are not authorized to view this content, please click below to
          LOGIN.
        </p>
        <button onClick={this.props.handleAuth0Login}>Login via Auth0</button>

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

export default Auth;
