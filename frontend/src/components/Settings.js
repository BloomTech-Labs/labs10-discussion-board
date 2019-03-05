import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {phoneP, tabletP, } from '../globals/globals';

// helpers
import { isUserType } from '../helpers/index.js';

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
  EditSignatureForm,
} from './index.js';

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.settingsBgColor};
  box-shadow: ${props => props.theme.settingsBxShdw};
  border-radius: 30px;
  width: 80%;
  margin-top: 100px;
  @media (max-width: 960px){
      width: 85%;
  }
  @media (max-width: 520px){
      width: 85%;
  }
`;

const UsernameSettings = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    @media (max-width: 500px){
      font-size: 12px;
    }
`;

const UserProperties = styled.div`
    width: 100%;
    display:flex;
    flex-wrap: wrap;
`;

const UserSettings = styled.div`
  width: 92%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ProfileSettings = styled.div`
  width: 30%;
`;

const EmailAndAvatar = styled.div`
    width: 100%;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    @media ${tabletP}{
      font-size: 16px;
    }

    @media (max-width: 680px){
      font-size: 18px;
      display: flex;
      flex-direction: column;
    }
`;

const AvatarPic = styled.div`
    display: flex;
    width: 50%;

    p {
      margin-right: 20px;
    }
`;

const AuthOEditForms = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 70%;
    padding-bottom: 10px;
`;

const EditButtons = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 25%;

    p {
      margin-bottom: 7px;
    }
`;

const EmailForm = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    .email {
      width: 100%;
      margin-bottom: 7px;
      border-radius: 10px;
      height: 50px;
      font-size: 16px;
      font-weight: bold;
      &:hover {
      background-color: ${props => props.theme.settingsButtonHov};
      cursor: pointer;
    }
      &:focus {
        outline: none;
    }
    @media (max-width: 520px){
      font-size: 12px;
    }
    }
`;

const PasswordForm = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    .email {
      width: 100%;
      margin-bottom: 7px;
      border-radius: 10px;
      height: 50px;
      font-size: 16px;
      font-weight: bold;
      &:hover {
      background-color: ${props => props.theme.settingsButtonHov};
      cursor: pointer;
    }
      &:focus {
        outline: none;
    }
    @media (max-width: 520px){
      font-size: 12px;
    }
    }
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  button {
    width: 100%;
    margin: 7px;
    border-radius: 10px;
    height: 50px;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      background-color: ${props => props.theme.settingsButtonHov};
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
    @media (max-width: 960px){
      font-size: 14px;
    }
    @media (max-width: 520px){
      font-size: 12px;
    }

  }

  .delete-btn {
    background-color: ${props => props.theme.settingsDeleteButtonBg};
    color: ${props => props.theme.settingsDeleteButtonColor};
  }
`;

const AvatarContainer = styled.div`
	width: 60%;
	height: auto;
	display: flex;
	justify-content: flex-end;
`;

const EditAvatarMenu = styled.div`
  background-color: #54BDFF;
  width: 90%;
  height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: baseline;
	align-items: center;
	border-radius: 10px;

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
          &:focus {
            outline: none;
          }
        }
  .changeavatar {
    text-align: center;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 7px;
  }
`;

const Signature = styled.div`
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  p {
    margin: 0px 0px 7px 0px;
  }  
`;
const FirstName = styled.div `
  font-size: 20px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  p {
    margin: 0px 0px 7px 0px;
  }  
`;
const Email = styled.div`
  font-size: 20px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  p {
    margin: 0px 0px 7px 0px;
  }  
`;
const Password = styled.div`
  font-size: 20px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  p {
    margin: 0px 0px 7px 0px;
  }  
`;
class Settings extends Component {
  state = { showForm: '', showDeleteModal: '' };
  getProfile = () => this.props.getProfile(this.props.match.params.id);
  toggleForm = formName => this.setState({ showForm: formName });
  toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal });
  onUploadAvatarSuccess = () => this.setState({ showForm: '' }, () => this.getProfile());
  componentDidMount = () => this.getProfile();
  render() {
    const { showForm, showDeleteModal } = this.state;
    const { profile, user_type, signature } = this.props;
    const { username, email, avatar, isAuth0, email_confirm } = profile;
    return (
      <SettingsWrapper>
        <UsernameSettings><h1>{username}'s Settings</h1></UsernameSettings>
        <UserSettings>
          <ProfileSettings>
          <EmailAndAvatar>
          <AvatarPic>
              <Avatar height='100px' width='100px' src={avatar} />
            </AvatarPic>
            {
                isUserType(user_type, ['gold_member', 'admin']) &&
                <p onClick={() => this.toggleForm('avatar-btns')}>
                  Edit avatar
                </p>
              }
          </EmailAndAvatar>
          
          {/* {
            signature !== null &&
            <Signature>
              <p>Signature:</p>
              <p className = 'signature-text'>{ signature || 'none' }</p>
            </Signature>
          } */}
          </ProfileSettings>
          <UserProperties>
            <FirstName><p> First Name</p></FirstName>
            <FirstName><p> Last Name</p></FirstName>
            <Email>
            <p>Email: {email || 'N/A'}</p>
            
              <EmailForm>
                {
                  isAuth0 ?
                  <p>You are Auth0. You cannot change your email.</p>
                  :
                  email ?
                  <button className = 'change email' onClick = { () => this.toggleForm('email-form') }>Edit email</button>
                  :
                  <button className = 'set email' onClick = { () => this.toggleForm('email-form') }>Set email</button>
                  
                }
                </EmailForm>
            </Email>
              <Password>
                <p>Password: </p>
                  <PasswordForm>
                    <button className = 'change email' onClick={() => this.toggleForm('password-form')}>
                        Edit password
                    </button>
                  </PasswordForm>
              </Password>
          </UserProperties>
        <AuthOEditForms>
            <EditButtons>
              
              <Buttons>
              {
                isUserType(user_type, ['silver_member', 'gold_member', 'admin']) &&
                <button onClick={() => this.toggleForm('signature-form')}>
                  Edit signature
                </button>
              }
              <button className = 'delete-btn' onClick={ this.toggleDeleteModal }>
                Delete account
              </button>
            </Buttons>
          </EditButtons>
          {showForm === 'password-form' && (
            <EditPasswordForm toggleForm={this.toggleForm} />
          )}
          {showForm === 'avatar-btns' && (
            <AvatarContainer>
              <EditAvatarMenu>
                <h1 className = 'changeavatar'>Upload new avatar</h1>
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
          {showForm === 'signature-form' && (
            <EditSignatureForm signature = { signature } toggleForm={this.toggleForm} />
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
        </UserSettings>
      </SettingsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profilesData.singleProfileData[0],
  user_type: state.users.user_type,
  signature: state.users.signature,
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Settings);
