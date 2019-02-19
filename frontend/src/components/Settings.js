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
} from './index.js';

const SettingsWrapper = styled.div`
	border: 1px solid black;
`;

class Settings extends Component {
	state = { showForm: '' };
	getProfile = () => this.props.getProfile(this.props.match.params.id);
	toggleForm = formName => this.setState({ showForm: formName });
	onUploadAvatarSucces = () => this.setState({ showForm: '' }, () => this.getProfile());
	componentDidMount = () => this.getProfile();
	render() {
		const { showForm } = this.state;
		const {
			id,
			username,
			email,
			status,
			avatar,
		} = this.props.profile;
		return(
			<SettingsWrapper>
				<h1>{ username }'s Settings</h1>

				<p>Email: { email || 'N/A' }</p>
				<p>Avatar:</p>
				<Avatar
					height = '50px'
					width = '50px'
					src = { avatar }
				/>
				<br />
				<button>{ email ? 'Change' : 'Set' } email</button>
				<button onClick = { () => this.toggleForm('password') }>Change password</button>
				<button onClick = { () => this.toggleForm('avatar') }>Change avatar</button>
				{
					showForm === 'password' &&
					<EditPasswordForm
						toggleForm = { this.toggleForm }
					/>
				}
				{
					showForm === 'avatar' &&
					<EditAvatarForm
						toggleForm = { this.toggleForm }
						onUploadAvatarSucces = { this.onUploadAvatarSucces }
					/>
				}
			</SettingsWrapper>
		);
	}
};

const mapStateToProps = state => ({
	profile: state.profilesData.singleProfileData[0],
});

export default connect(mapStateToProps, { getProfile })(Settings);
