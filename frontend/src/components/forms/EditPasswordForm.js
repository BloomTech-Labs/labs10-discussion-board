import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updatePassword } from '../../store/actions/index.js';

const EditPasswordFormWrapper = styled.form`
	margin: 10px;
	padding: 10px;
	border: 1px solid red;
`;

class EditPasswordForm extends Component {
	state = {
		oldPassword: '',
		newPassword: '',
		newPassword1: '',
		error: '',
	};
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { oldPassword, newPassword, newPassword1 } = this.state;
		const { updatePassword, toggleEditPasswordForm } = this.props;
		if (newPassword !== newPassword1) return this.setState({ error: 'New passwords must match.' });
		return updatePassword(oldPassword, newPassword, toggleEditPasswordForm);
	};
	render() {
		const {
			oldPassword,
			newPassword,
			newPassword1,
			error,
		} = this.state;
		return(
			<EditPasswordFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Edit password</h1>

				<input
					placeholder = 'Enter old password'
					name = 'oldPassword'
					type = 'password'
					onChange = { this.handleChange }
					value = { oldPassword }
				/>

				<input
					placeholder = 'Enter new password'
					name = 'newPassword'
					type = 'password'
					onChange = { this.handleChange }
					value = { newPassword }
				/>

				<input
					placeholder = 'Enter new password again'
					name = 'newPassword1'
					type = 'password'
					onChange = { this.handleChange }
					value = { newPassword1 }
				/>

				{ error && <p>{ error }</p> }

				<button type = 'submit'>Submit</button>
			</EditPasswordFormWrapper>
		);
	}
};

export default connect(null, { updatePassword })(EditPasswordForm);
