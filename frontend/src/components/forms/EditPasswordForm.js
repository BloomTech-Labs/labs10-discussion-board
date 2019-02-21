import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updatePassword, displayError } from '../../store/actions/index.js';

const EditPasswordFormWrapper = styled.form`
width: 300px;
	margin: 10px;
	padding: 12px;
	border: 1px solid black;
	border-radius: 5px;
`;

const EditPassword = styled.div`
	margin-top: -15px;
`;

const EditForm = styled.div`
	display: flex;
	flex-direction: column;

	input {
		margin: 0px 0px 15px 0px;
		height: 20px;
		font-size: 16px;
	}

	button {
		width: 30%;
      	border-radius: 5px;
      	font-size: 14px;
     	margin-top: 10px;
      		&:hover {
        		background-color: #b7e1f0;
        		cursor: pointer;
        		border-radius: 5px;
      		}
    }
`;

const Buttons = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

class EditPasswordForm extends Component {
	state = {
		oldPassword: '',
		newPassword: '',
		newPassword1: '',
	};
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { oldPassword, newPassword, newPassword1 } = this.state;
		const { updatePassword, toggleForm, displayError } = this.props;
		if (newPassword !== newPassword1) return displayError('New passwords must match.');
		return updatePassword(oldPassword, newPassword, toggleForm);
	};
	render() {
		const {
			oldPassword,
			newPassword,
			newPassword1,
		} = this.state;
		const { toggleForm } = this.props;
		return(
			<EditPasswordFormWrapper onSubmit = { this.handleSubmit }>
				<EditPassword><h1>Edit password</h1></EditPassword>
				<EditForm>
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
				<Buttons>
					<button type = 'submit'>Submit</button>
					<button type = 'button' onClick = { () => toggleForm('') }>Cancel</button>
				</Buttons>
				</EditForm>
			</EditPasswordFormWrapper>
		);
	}
};

export default connect(null, { updatePassword, displayError })(EditPasswordForm);
