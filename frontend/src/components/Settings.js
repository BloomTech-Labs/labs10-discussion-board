import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {phoneP, tabletP, } from '../globals/globals';

// helpers
import { isUserType } from '../helpers/index.js';

// action creators
import { getProfile, editUser, displayError } from '../store/actions/index.js';

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
  width: 90%;
  margin-top: 100px;
  @media ${tabletP}{
    display: flex;
    flex-directon: column;      

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

const UserProperties = styled.form`
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    .input-style {
      margin-top: 5px;
      margin-left: 1%;
      border: 1px solid rgb(222,180,200, 0.2);
      width: 180px;
      height: 20px;
      @media ${tabletP}{
        display: flex;
        flex-wrap: wrap;      
      }
    }
    .delete-btn {
      background-color: ${props => props.theme.settingsDeleteButtonBg};
      color: ${props => props.theme.settingsDeleteButtonColor};
      &:hover {
        background-color: ${props => props.theme.settingsDeleteButtonBgHov};
        cursor: pointer;
      }
    }
    .save-settings {
      background-color: ${props => props.theme.settingsButtonBgColor};
      color: ${props => props.theme.settingsDeleteButtonColor};
      &:hover {
        background-color: ${props => props.theme.settingsButtonHov};
        cursor: pointer;
      }
    }
    button {
      width: 45%;
      margin: 7px;
      margin-top: 20px;
      border-radius: 5px;
      height: 30px;
      font-size: 12px;
      color: black;
      justify-content: center;
      align-items: center;
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
  margin-left: 100px;
  align-items: center;
  justify-content: center;
  .avatar-change{
    font-size: 12px;
    cursor: pointer;
    color: blue;
    align-items: center;
    justify-content: center;
  }
`;

const EmailAndAvatar = styled.div`
    width: 100%;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  justify-content: center;
    @media ${tabletP}{
      font-size: 16px;
    }
    @media (max-width: 680px){
      font-size: 18px;
      display: flex;
      flex-wrap: wrap;
    }
`;

const AvatarPic = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
  justify-content: center;
    p {
      margin-right: 20px;
    }
`;

// const AuthOEditForms = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     width: 70%;
//     padding-bottom: 10px;
// `;

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
`;

const AvatarContainer = styled.div`
	width: 100%;
	height: auto;
	display: flex;
`;

const EditAvatarMenu = styled.div`
  background-color: #54BDFF;
  width: 95%;
  height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: center;
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
  font-size: 14px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  flex-wrap: wrap;
  p {
    margin: 0px 0px 7px 0px;
  }  
  @media ${tabletP}{
    display: flex;
    flex-wrap: wrap;      
  }
`;
const Email = styled.div`
  font-size: 14px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  p {
    margin: 0px 0px 7px 0px;
  }  
  @media ${tabletP}{
    display: flex;
    flex-wrap: wrap;      
  }
`;
const Password = styled.div`
  font-size: 14px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  p {
    margin: 0px 0px 7px 0px;
  }  
  @media ${tabletP}{
    display: flex;
    flex-wrap: wrap;      
  }
`;
class Settings extends Component {
  state = { showForm: '',
            showDeleteModal: '',
            firstName: '',
            lastName: '', 
            email: '',
            oldPassword: '',
            newPassword: '',};

  getProfile = () => this.props.getProfile(this.props.match.params.id);
  toggleForm = formName => this.setState({ showForm: formName });
  toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal });
  onUploadAvatarSuccess = () => this.setState({ showForm: '' }, () => this.getProfile());
  componentDidMount = () => this.getProfile().then(() => this.setState({ 
    firstName: this.props.profile.username.split(' ')[0],
    lastName: this.props.profile.username.split(' ')[1],
    email: this.props.profile.email,
}));
  handleInputChange = e => this.setState({[e.target.name]: e.target.value})
  handleSubmit = e => {
    e.preventDefault()
    const {firstName, lastName, email, oldPassword, newPassword} = this.state
    const username = firstName + ' ' + lastName;
    this.props.editUser(username, email, oldPassword, newPassword).then(() => this.getProfile())
  }
  render() {
    const { showForm, showDeleteModal } = this.state;
    const { profile, user_type, signature } = this.props;
    const { username, email, avatar, isAuth0, email_confirm, password } = profile;
    const splitUsername = username.split(' ');
    return (
      <SettingsWrapper>
        {/* <UsernameSettings><h1>{username}'s Settings</h1></UsernameSettings> */}
        <UserSettings>
          <ProfileSettings>
          <EmailAndAvatar>
          <AvatarPic>
              <Avatar height='150px' width='150px' src={avatar} />
            </AvatarPic>
           
                <p className = 'avatar-change' onClick={() => this.toggleForm('avatar-btns')}>
                  (change)
                </p>
            
          </EmailAndAvatar>
          
          {/* {
            signature !== null &&
            <Signature>
              <p>Signature:</p>
              <p className = 'signature-text'>{ signature || 'none' }</p>
            </Signature>
          } */}
          </ProfileSettings>
          <UserProperties onSubmit = {this.handleSubmit}>
            <FirstName><p> First Name <input className = 'input-style' name = 'firstName' placeholder = {splitUsername[0]} value = {this.state.firstName} onChange = {this.handleInputChange}/></p></FirstName>
            <FirstName><p> Last Name <input className = 'input-style' name = 'lastName' placeholder = {splitUsername[1]} value = {this.state.lastName} onChange = {this.handleInputChange} /></p></FirstName>
            <Email>
              <p>Email {isAuth0 ? <p>{email}</p> : <input className = 'input-style' name = 'email' type = 'email' placeholder = {email} value = {this.state.email} onChange = {this.handleInputChange} /> }</p>
              
            
              {/* <EmailForm>
                {
                  isAuth0 ?
                  <p>You are Auth0. You cannot change your email.</p>
                  :
                  email ?
                  <button className = 'change email' onClick = { () => this.toggleForm('email-form') }>Edit email</button>
                  :
                  <button className = 'set email' onClick = { () => this.toggleForm('email-form') }>Set email</button>
                  
                }
                </EmailForm> */}
            </Email>
              <Password>
                <p>Old Password <input name = 'oldPassword' className = 'input-style' type = 'password' placeholder = 'enter old password' value = {this.state.oldPassword} onChange = {this.handleInputChange} /></p>
                <p>New Password <input name = 'newPassword' className = 'input-style' type = 'password' placeholder = 'enter new password' value = {this.state.newPassword} onChange = {this.handleInputChange} /></p>
                  {/* <PasswordForm>
                    <button className = 'change email' onClick={() => this.toggleForm('password-form')}>
                        Edit password
                    </button>
                  </PasswordForm> */}
              </Password>
              <button className = 'save-settings' type = 'submit' >Save settings</button>
              <button className = 'delete-btn' type = 'button' onClick={ this.toggleDeleteModal }>
                Delete account
              </button>
              {showDeleteModal && (
                <DeleteAccountModal toggleDeleteModal = { this.toggleDeleteModal } />
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
          </UserProperties>
        {/* <AuthOEditForms>
            <EditButtons>
              
              <Buttons>
              {
                // isUserType(user_type, ['silver_member', 'gold_member', 'admin']) &&
                // <button onClick={() => this.toggleForm('signature-form')}>
                //   Edit signature
                // </button>
              }
              
            </Buttons>
          </EditButtons>
          {showForm === 'password-form' && (
            <EditPasswordForm toggleForm={this.toggleForm} />
          )}
          
          {showForm === 'signature-form' && (
            <EditSignatureForm signature = { signature } toggleForm={this.toggleForm} />
          )}
          
          {showForm === 'email-form' && (
            <UpdateEmailForm
              toggleForm={this.toggleForm}
              history = { this.props.history }
            />
          )}
          
        </AuthOEditForms> */}
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
  { getProfile, editUser }
)(Settings);