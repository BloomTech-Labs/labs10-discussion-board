import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { displayError, sendPWResetEmail } from '../../store/actions/index.js';

const RequestResetPWFormWrapper = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	padding-top: 50px;

	.enter-email-text {
		padding: 10px;
	}

	input {
		padding: 5px 10px;
		border-radius: 5px;
		margin: 10px;
	}

	.back-to {
		margin-top: 10px;
		text-decoration: none;
	}
`;

class RequestResetPWForm extends Component {
	state = { email: '' };
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { email } = this.state;
		const { history, displayError, sendPWResetEmail } = this.props;
		if (!email) return displayError('E-mail cannot be left blank.');
		return sendPWResetEmail(email, history.push);
	};
	render() {
		const { email } = this.state;
		return(
			<RequestResetPWFormWrapper onSubmit = { this.handleSubmit }>
				<p className = 'enter-email-text'>
					Enter your email:
				</p>

				<input
					className = 'email-input'
					autoComplete = 'on'
					type = 'email'
					name = 'email'
					placeholder = 'E-mail'
					value = { email }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Send reset PW email</button>
				<Link className = 'back-to' to = '/'>Back to log in</Link>
			</RequestResetPWFormWrapper>
		);
	}
};

export default connect(null, { displayError, sendPWResetEmail })(RequestResetPWForm);
