import React, { Component } from 'react';
import { connect }			from 'react-redux';
import styled				from 'styled-components';

// action creators
import { updateEmail, displayError } from '../../store/actions/index.js';

const StyledUpdateEmailForm = styled.form`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border:1px solid #5B5B5B;
	border-radius: 5px;
	padding: 5px 10px;

	input {
		padding: 5px 10px;
		border-radius: 5px;
		margin: 10px;
	}

	.buttons-wrapper {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
`;

class UpdateEmailForm extends Component {
	state = { email: '' };
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { displayError, updateEmail, history } = this.props;
		const { email } = this.state;
		if (!email) {
			return displayError('E-mail must not be empty.');
		}
		return updateEmail(email, history);
	};
	render() {
		const { email } = this.state;
		const { toggleForm } = this.props;
		return(
			<StyledUpdateEmailForm onSubmit = { this.handleSubmit }>
				<input
					className = 'update-email-input'
					autoComplete = 'on'
					type = 'email'
					name = 'email'
					placeholder = 'Enter new e-mail'
					value = { email }
					onChange = { this.handleInputChange }
				/>

				<div className = 'buttons-wrapper'>
					<button className = 'update-btn'>Update Email</button>
					<button className = 'cancel-btn' type = 'button' onClick = { toggleForm }>Cancel</button>
				</div>
			</StyledUpdateEmailForm>
		);
	}
};

export default connect(null, { updateEmail, displayError })(UpdateEmailForm);
