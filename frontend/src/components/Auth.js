import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginDropdown from './LoginDropdown.js';
import chevron from '../assets/img/chevron.png';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const NotLoggedIn = styled.div`
  display: flex;
  background-color: ${props => props.theme.authBgColor};
  color: ${props => props.theme.authColor};
  font-size: 18px;
  width: 100%;
  flex-direction: column;
`;

const DivAuthTitle = styled.div`
  p {
    margin: 0 0 0.67em 0;
  }
`;

const DivAuthRegLog = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const LinkRegister = styled(Link)`
  margin-right: 0px;
  user-select: none;
  cursor: pointer;
  color: ${props => props.theme.authLinkRegColor};
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.authLinkRegColorHov};
    text-decoration: underline;
  }
`;

const Login = styled.a`
  margin-left: 5px;
  user-select: none;
  cursor: pointer;
  color: ${props => props.theme.authLoginColor};
  font-size: 18px;
  position: relative;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.authLoginColorHov};
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
      isLoginDropdownClicked: false
    };
  }

  componentDidMount() {
    if (this.props.history.location.pathname !== '/') this.props.history.push('/');
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
        <DivAuthTitle>
          <p>
            Want to participate in the conversation?
          </p>
        </DivAuthTitle>
        <DivAuthRegLog>
          <LinkRegister to='/register'>Register</LinkRegister>
          &nbsp;|&nbsp;
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
            {...this.props}
            history={this.props.history}
            isLoginDropdownClicked={this.state.isLoginDropdownClicked}
            setIsLoginDropdownClicked={this.setIsLoginDropdownClicked}
          />
        </DivAuthRegLog>
      </NotLoggedIn>
    );
  }
}

// Auth.propTypes = {
//   propertyName: PropTypes.string
// }

export default connect(null, {})(Auth);
