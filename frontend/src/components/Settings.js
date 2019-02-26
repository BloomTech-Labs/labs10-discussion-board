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
  DeleteAccountModal,
} from './index.js';

const SettingsWrapper = styled.div`
  background-color: ${props => props.theme.settingsBgColor};
  box-shadow: ${props => props.theme.settingsBxShdw};
  border-radius: 30px;
  width: 50%;
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
    justify-content: center;
    flex-direction: column;
    padding-bottom: 10px;
`;

const EditMenu = styled.div`
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;

    p {
      margin-bottom: 7px;
    }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin: 7px;
    border-radius: 10px;
    width: 20%;
    height: 30px;
    font-size: 16px;

    &:hover {
      background-color: ${props => props.theme.settingsButtonHov};
      cursor: pointer;
    }
  }

  .delete-btn {
    background-color: ${props => props.theme.settingsDeleteButtonBg};
    color: ${props => props.theme.settingsDeleteButtonColor};
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EditAvatarMenu = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;

  button {
          margin: 7px;
          border-radius: 10px;
          width: 200px;
          height: 30px;
          font-size: 16px;

          &:hover {
            background-color: ${props => props.theme.settingsEditAvatarButtonBgHov};
            cursor: pointer;
          }
        }
  .changeavatar {
    text-align: center;
    font-weight: bold;
    margin-bottom: 7px;
  }
`;

class Settings extends Component {
  state = { showForm: '', showDeleteModal: '' };
  getProfile = () => this.props.getProfile(this.props.match.params.id);
  toggleForm = formName => this.setState({ showForm: formName });
  toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal });
  onUploadAvatarSuccess = () =>
    this.setState({ showForm: '' }, () => this.getProfile());
  componentDidMount = () => this.getProfile();
  render() {
    const { showForm, showDeleteModal } = this.state;
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
                <button className = 'delete-btn' onClick={ this.toggleDeleteModal }>
                  Delete account
                </button>
              </Buttons>
            </EditMenu>
        {showForm === 'password-form' && (
          <EditPasswordForm toggleForm={this.toggleForm} />
        )}
        {showForm === 'avatar-btns' && (
          <AvatarContainer>
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
          </AvatarContainer>
        )}
        {showForm === 'avatar-pc-form' && (
          <EditAvatarForm
            toggleForm={this.toggleForm}
            onUploadAvatarSuccess={this.onUploadAvatarSuccess}
          />
        )}
        {showForm === 'avatar-url-form' && (
          <EditAvatarUrlForm
            toggleForm={this.toggleForm}
            onUploadAvatarSuccess={this.onUploadAvatarSuccess}
          />
        )}
        {showForm === 'email-form' && (
          <UpdateEmailForm
            toggleForm={this.toggleForm}
            history = { this.props.history }
          />
        )}
        {showDeleteModal && (
          <DeleteAccountModal toggleDeleteModal = { this.toggleDeleteModal } />
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
