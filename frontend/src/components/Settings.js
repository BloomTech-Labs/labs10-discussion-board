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
  background-color: #e8e3e0;
  box-shadow: 4px 6px 4px 4px #4ca0e0;
  border-radius: 30px;
  width: 75%;
`;

const UsernameSettings = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const EmailAndAvatar = styled.div`
    font-size: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const AvatarPic = styled.div`
    display: flex;
    align-items: center;

    p {
      margin-right: 20px;
    }
`;

const AuthOEditForms = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 25px;
`;

const EditMenu = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const Buttons = styled.div`
  display: flex;
  button {
          margin: 7px;
          border-radius: 10px;
          width: 25%;
          height: 30px;
          font-size: 14px;

          &:hover {
            background-color: grey;
            cursor: pointer;
          }
        }
`;

const EditAvatarMenu = styled.div`
  display: flex;
  flex-direction: column;

  button {
          margin: 7px;
          border-radius: 10px;
          width: 200px;
          height: 30px;
          font-size: 16px;

          &:hover {
            background-color: grey;
            cursor: pointer;
          }
        }
  .changeavatar {
    font-weight: bold;
    margin-bottom: 7px;
  }
`;

class Settings extends Component {
  state = { show: '' };
  getProfile = () => this.props.getProfile(this.props.match.params.id);
  toggleForm = formName => this.setState({ show: formName });
  onUploadAvatarSuccess = () =>
    this.setState({ show: '' }, () => this.getProfile());
  componentDidMount = () => this.getProfile();
  render() {
    const { show } = this.state;
    const { username, email, avatar, isAuth0, email_confirm } = this.props.profile;
    return (
      <SettingsWrapper>
        <UsernameSettings><h1>{username}'s Settings</h1></UsernameSettings>
        <EmailAndAvatar>
          <p>Email: {email || 'N/A'}</p>
          { (email && !isAuth0) && <p>{ email_confirm === 'true' ? 'E-mail confirmed!' : 'Email NOT confirmed.' }</p> }
          <AvatarPic>
            <p>Avatar:</p>
            <Avatar height='100px' width='100px' src={avatar} />
          </AvatarPic>
        </EmailAndAvatar>
        <br />
        <AuthOEditForms>
            <EditMenu>
              {
                isAuth0 ?
                <p>You are Auth0. You cannot change your email.</p>
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
                </button>
              </Buttons>
            </EditMenu>
        {show === 'password-form' && (
          <EditPasswordForm toggleForm={this.toggleForm} />
        )}
        {show === 'avatar-btns' && (
          <EditAvatarMenu>
            <div className = 'changeavatar'>Upload new avatar:</div>
            <button onClick={() => this.toggleForm('avatar-pc-form')}>
              Upload from PC
            </button>
            <button onClick={() => this.toggleForm('avatar-url-form')}>
              Upload from URL
            </button>
            <button onClick={() => this.toggleForm('')}>Cancel</button>
          </EditAvatarMenu>
        )}
        {show === 'avatar-pc-form' && (
          <EditAvatarForm
            toggleForm={this.toggleForm}
            onUploadAvatarSuccess={this.onUploadAvatarSuccess}
          />
        )}
        {show === 'avatar-url-form' && (
          <EditAvatarUrlForm
            toggleForm={this.toggleForm}
            onUploadAvatarSuccess={this.onUploadAvatarSuccess}
          />
        )}
        {show === 'email-form' && (
          <UpdateEmailForm
            toggleForm={this.toggleForm}
            history = { this.props.history }
          />
        )}

        </AuthOEditForms>
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
