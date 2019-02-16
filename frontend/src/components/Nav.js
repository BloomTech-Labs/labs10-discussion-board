import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LoginDropdown } from './index.js';
import chevron from '../assets/img/chevron.png';
import { signout } from '../store/actions';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
`;

const Auth = styled.div`
  margin: 25px;
  font-size: 24px;
`;
const Register = styled.a`
  margin-right: 20px;
  user-select: none;
  cursor: pointer;
  color: white;
`;

const Login = styled.a`
  margin-left: 20px;
  user-select: none;
  cursor: pointer;
  color: white;

  img {
    transform: ${props => props.isLoginClicked && 'rotate(180deg)'};
  }
`;

const Signout = styled.a`
  font-size: 30px;
  user-select: none;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: white;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginClicked: false
    };
  }

  componentDidMount() {
    this.setState({ isLoginClicked: false });
  }

  toggleLoginDropdown = ev => {
    ev.preventDefault();
    this.setState({ isLoginClicked: !this.state.isLoginClicked });
  };

  clickSignout = ev => {
    ev.preventDefault();
    this.setState({ isLoginClicked: false }, () => this.props.signout());
  };

  render() {
    return (
      <DivWrapper>
        {this.props.isLoggedIn ? (
          <Signout
            onClick={ev => {
              this.clickSignout(ev);
            }}
          >
            Sign Out
          </Signout>
        ) : (
          <Auth>
            <Register>Register</Register> |{' '}
            <Login
              onClick={ev => {
                this.toggleLoginDropdown(ev);
              }}
              isLoginClicked={this.state.isLoginClicked}
            >
              Login &nbsp;
              <img src={chevron} alt='chevron' />
            </Login>
            <LoginDropdown isLoginClicked={this.state.isLoginClicked} />
          </Auth>
        )}
      </DivWrapper>
    );
  }
}

// Nav.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => {
  return {
    isLoggedIn: state.users.isLoggedIn,
    loggingInLoadingMessage: state.users.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  { signout }
)(Nav);
