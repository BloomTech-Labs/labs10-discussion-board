import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
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
  clickSignout = ev => {
    ev.preventDefault();
    localStorage.removeItem('symposium_auth0_access_token');
    localStorage.removeItem('symposium_auth0_expires_at');
    return this.props.signout().then(() => this.props.history.push('/'));
  };

  render() {
    return (
      <DivWrapper>
        <Welcome>Welcome, {this.props.username}!</Welcome>
        <Signout
          onClick={ev => {
            this.clickSignout(ev);
          }}
        >
          Sign Out
        </Signout>
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
    loggingInLoadingMessage: state.users.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  { signout }
)(Nav);
