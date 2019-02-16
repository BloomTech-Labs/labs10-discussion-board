import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
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
    transform: ${props => props.isLoginClicked && 'rotate(180deg)'};
  }
`;

const Welcome = styled.div`
  margin: 25px;
  font-size: 24px;
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
    this.setIsLoginClicked(false);
  }

  setIsLoginClicked = async isClicked => {
    localStorage.setItem('isLoginClicked', isClicked.toString());
    await this.setState({ isLoginClicked: isClicked });
  };

  toggleLoginDropdown = ev => {
    ev.preventDefault();
    this.setIsLoginClicked(!this.state.isLoginClicked);
  };

  clickSignout = ev => {
    ev.preventDefault();
    this.setState({ isLoginClicked: false }, () => {
      localStorage.removeItem('symposium_auth0_access_token');
      localStorage.removeItem('symposium_auth0_expires_at');
      this.setIsLoginClicked(false);
      return this.props.signout().then(() => this.props.history.push('/'));
    });
  };

  render() {
    return (
      <DivWrapper>
        {localStorage.getItem('isLoggedIn') === 'true' ? (
          <Fragment>
            <Welcome>Welcome, { this.props.username }!</Welcome>
            <Signout
              onClick={ev => {
                this.clickSignout(ev);
              }}
            >
              Sign Out
            </Signout>
          </Fragment>
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
    username: state.users.username,
    isLoggedIn: state.users.isLoggedIn,
    loggingInLoadingMessage: state.users.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  { signout }
)(Nav);
