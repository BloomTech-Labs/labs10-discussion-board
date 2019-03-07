import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginDropdown from './LoginDropdown.js';
// import chevron from '../assets/img/chevron.png';
// import PropTypes from 'prop-types';

// globals
import { phoneP, phoneL, tabletP } from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const LogInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  color: ${props => props.theme.authColor};
  font-size: 18px;
  width: 40%;

  @media ${phoneL}{
      width: 80%;
    }
    @media ${phoneP}{
      width: 80%;
      }
`;

const DivAuthRegLog = styled.div`
  width: 90%;
  margin-top: -5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div {
    color: black;
  }

  @media (max-width: 750px){

  }
  @media ${phoneL}{
      width: 80%;
      display: flex;
      flex-direction: column;
      .line {
        display: none;
      }
    }
    @media ${phoneP}{
      width: 80%;
      display: flex;
      flex-direction: column;
      .line {
        display: none;
      }
    }

`;

const DivLogin = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
`;

const LinkRegister = styled(Link)`
  text-decoration: none;
  margin-right: 0px;
  user-select: none;
  cursor: pointer;
  color: black;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.authLinkRegColorHov};
    text-decoration: underline;
  }
  @media ${tabletP}{
  }
    @media ${phoneL}{
    }
`;

const Login = styled.a`
  margin-left: 5px;
  user-select: none;
  cursor: pointer;
  color: black;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.authLoginColorHov};
    text-decoration: underline;
  }
  @media ${phoneL}{
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
  };

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
      <LogInContainer>
        <DivAuthRegLog>
          <LinkRegister to='/register'>Register</LinkRegister>
          <div className = "line">&nbsp;|&nbsp;</div>
          <DivLogin>
            <Login onClick = {ev => {this.toggleLoginDropdown(ev);}}
              isLoginDropdownClicked={this.state.isLoginDropdownClicked}
            >
              Login
            </Login>
            <LoginDropdown
              {...this.props}
              isLoginDropdownClicked={this.state.isLoginDropdownClicked}
              setIsLoginDropdownClicked={this.setIsLoginDropdownClicked}
            />
          </DivLogin>
        </DivAuthRegLog>
      </LogInContainer>
    );
  }
}

// Auth.propTypes = {
//   propertyName: PropTypes.string
// }

export default connect(null, {})(Auth);
