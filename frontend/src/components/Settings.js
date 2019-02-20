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
  EditAvatarUrlForm
} from './index.js';

const SettingsWrapper = styled.div`
  border: 1px solid black;
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
    const { username, email, avatar } = this.props.profile;
    return (
      <SettingsWrapper>
        <h1>{username}'s Settings</h1>

        <p>Email: {email || 'N/A'}</p>
        <p>Avatar:</p>
        <Avatar height='50px' width='50px' src={avatar} />
        <br />
        <button>{email ? 'Change' : 'Set'} email</button>
        <button onClick={() => this.toggleForm('password-form')}>
          Change password
        </button>
        <button onClick={() => this.toggleForm('avatar-btns')}>
          Change avatar
        </button>
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
