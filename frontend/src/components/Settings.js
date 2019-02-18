import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { getProfile } from '../store/actions/index.js';

// components
import { EditPasswordForm } from './index.js';

const SettingsWrapper = styled.div`
	border: 1px solid black;
`;

class Settings extends Component {
	state = { showEditPasswordForm: false };
	toggleEditPasswordForm = () => this.setState({ showEditPasswordForm: !this.state.showEditPasswordForm });
	componentDidMount = () => this.props.getProfile(this.props.match.params.id);
	render() {
		const { showEditPasswordForm } = this.state;
		const {
			id,
			username,
			email,
			status,
		} = this.props.profile;
		return(
			<SettingsWrapper>
				<h1>{ username }'s Settings</h1>

				<p>Email: { email || 'N/A' }</p>
				<button>{ email ? 'Change' : 'Set' } email</button>
				<button onClick = { this.toggleEditPasswordForm }>Change password</button>
				<button>Change avatar</button>
				{
					showEditPasswordForm &&
					<EditPasswordForm
						toggleEditPasswordForm = { this.toggleEditPasswordForm }
					/>
				}
			</SettingsWrapper>
		);
	}
};

const mapStateToProps = state => ({
	profile: state.profilesData.singleProfileData,
});

export default connect(mapStateToProps, { getProfile })(Settings);
