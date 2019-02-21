import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { getProfile } from '../store/actions/index.js';

// components
import {
  Avatar,
  EditPasswordForm,
  EditAvatarForm,
  EditAvatarUrlForm,
  UpdateEmailForm,
} from './index.js';

const SettingsWrapper = styled.div`
  border: 1px solid black;
  width: 65%;

    h1 {
      color: white;
      text-align: center;
    }
`;

const EmailandAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Email = styled.div`
  font-size: 18px;
  margin-right: 70px;
`;

const AvatarPic = styled.div`
  display: flex;
  align-items: center;

    .avatartext {
      font-size: 18px;
      margin-right: 10px;
    }
`;

const IsAuth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Buttons = styled.div`
  margin-left: 30px;
    button {
      border-radius: 5px;
      font-size: 14px;
      margin-right: 20px;
      &:hover {
        background-color: #b7e1f0;
        cursor: pointer;
        border-radius: 5px;
      }
    }
`;


class Settings extends Component {
  state = { show: '' };
  getProfile = () => this.props.getProfile(this.props.match.params.id);
  toggleForm = formName => this.setState({ show: formName });
  onUploadAvatarSucces = () =>
    this.setState({ show: '' }, () => this.getProfile());
  componentDidMount = () => this.getProfile();
  render() {
    const { show } = this.state;
    const { username, email, avatar, isAuth0, email_confirm } = this.props.profile;
    return (
      <SettingsWrapper>
        <h1>{username}'s Settings</h1>
        <EmailandAvatar>
          <Email>Email: {email || 'N/A'}</Email>
          { (email && !isAuth0) && <p>{ email_confirm === 'true' ? 'E-mail confirmed!' : 'Email NOT confirmed.' }</p> }
          <AvatarPic>
            <div className = 'avatartext'>Avatar:</div>
            <Avatar height='80px' width='80px' src={avatar} />
          </AvatarPic>
        </EmailandAvatar>
        <br />
        <IsAuth>
        {
          isAuth0 ?
          <p>You are using Auth0. You cannot change your email.</p>
          :
          email ?
          <button onClick = { () => this.toggleForm('email-form') }>Change email</button>
          :
          <button onClick = { () => this.toggleForm('email-form') }>Set email</button>
        }
        <Buttons>
        <button onClick={() => this.toggleForm('password-form')}>
          Change password
        </button>
        <button onClick={() => this.toggleForm('avatar-btns')}>
          Change avatar
        </button></Buttons>
        {show === 'password-form' && (
          <EditPasswordForm toggleForm={this.toggleForm} />
        )}
        {show === 'avatar-btns' && (
          <div>
            <button onClick={() => this.toggleForm('avatar-pc-form')}>
              Upload from PC
            </button>
            <button onClick={() => this.toggleForm('avatar-url-form')}>
              Upload from URL
            </button>
            <button onClick={() => this.toggleForm('')}>Cancel</button>
          </div>
        )}
        {show === 'avatar-pc-form' && (
          <EditAvatarForm
            toggleForm={this.toggleForm}
            onUploadAvatarSucces={this.onUploadAvatarSucces}
          />
        )}
        {show === 'avatar-url-form' && (
          <EditAvatarUrlForm
            toggleForm={this.toggleForm}
            onUploadAvatarSucces={this.onUploadAvatarSucces}
          />
        )}
        {show === 'email-form' && (
          <UpdateEmailForm
            toggleForm={this.toggleForm}
            history = { this.props.history }
          />
        )}
        </IsAuth>
      </SettingsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profilesData.singleProfileData[0]
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Settings);
