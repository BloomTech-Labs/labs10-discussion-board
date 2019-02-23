import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updatePassword, displayError } from '../../store/actions/index.js';

const EditPasswordDiv = styled.div`
	display: flex;
	justify-content: center;
`;

const EditPasswordFormWrapper = styled.form`
	text-align: center;
	width: 60%;
	display: flex;
	flex-direction: column;
	margin: 10px;
	padding: 10px;
	border-radius: 20px;
	background-color: #54BDFF;
	
`;

const Inputs = styled.div`
	display: flex;
	flex-direction: column;
	
	input {
		margin: 7px 0px;
		font-size: 20px;
	}
`;

const Buttons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;

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
			<EditPasswordDiv>
				<EditPasswordFormWrapper onSubmit = { this.handleSubmit }>
					<h1>Edit password</h1>
					<Inputs>
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
					</Inputs>
					<Buttons>
						<button type = 'submit'>Submit</button>
						<button type = 'button' onClick = { () => toggleForm('') }>Cancel</button>
					</Buttons>
				</EditPasswordFormWrapper>
			</EditPasswordDiv>
		);
	}
};

export default connect(null, { updatePassword, displayError })(EditPasswordForm);
