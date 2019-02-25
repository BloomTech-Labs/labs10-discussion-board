import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// components
import { Avatar } from './index.js';

// action creators
import { signout } from '../store/actions';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
`;

const Signout = styled.a`
  margin-left: 25px;
  font-size: 20px;
  user-select: none;
  cursor: pointer;
  &:hover {
    text-decoration: line-through;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class DisplayUser extends Component {
  clickSignout = ev => {
    ev.preventDefault();
    localStorage.removeItem('symposium_auth0_access_token');
    localStorage.removeItem('symposium_auth0_expires_at');
    return this.props.signout().then(() => this.props.history.push('/'));
  };

  goToProfilePage = () => this.props.history.push(`/profile/${this.props.user_id}`);

  render() {
    return (
      <DivWrapper>
        <Signout onClick={ev => this.clickSignout(ev)}>Sign Out</Signout>
      </DivWrapper>
    );
  }
}


const mapStateToProps = state => ({
  user_id: state.users.user_id,
  avatar: state.users.avatar,
  username: state.users.username,
  loggingInLoadingMessage: state.users.loggingInLoadingMessage
});

export default connect(
  mapStateToProps,
  { signout }
)(DisplayUser);