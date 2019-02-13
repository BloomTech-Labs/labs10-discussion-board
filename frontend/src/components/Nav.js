import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LoginDropdown } from './index.js';
import chevron from '../assets/img/chevron.png';
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
  cursor: pointer;
`;
const Login = styled.a`
  margin-left: 20px;
  cursor: pointer;
`;

const Signout = styled.a``;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Nav = props => {
  return (
    <DivWrapper>
      {props.isLoggedIn ? (
        <Signout>Signout</Signout>
      ) : (
        <Auth>
          <Register>Register</Register> |{' '}
          <Login isOpen>
            Login &nbsp;
            <img src={chevron} alt='' />
          </Login>
          <LoginDropdown />
        </Auth>
      )}
    </DivWrapper>
  );
};

// Nav.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    loggingInLoadingMessage: state.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  {}
)(Nav);
