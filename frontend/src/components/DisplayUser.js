import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import chevron from '../assets/img/chevron.png';

// components
import { Avatar, AvatarDropdown } from './index.js';

// action creators
import { signout } from '../store/actions';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const DivAvatar = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  align-items: center;
`;

const PWelcomeMessage = styled.p``;

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
        <PWelcomeMessage>Welcome, {this.props.username}</PWelcomeMessage>
        <DivAvatar>
          <Avatar height={'100px'} width={'100px'} src={this.props.avatar} />
          <img src={chevron} alt='chevron' />
          <AvatarDropdown clickSignout={this.clickSignout} user_id={this.props.user_id} />
        </DivAvatar>
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