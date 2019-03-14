import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { displayError, sendPWResetEmail } from '../../store/actions/index.js';

const RequestResetPWFormWrapper = styled.form`
	width: 30%
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	margin-top: 10%;
	padding: 30px;
	border: 1px solid lightgrey;
	border-radius: 5px;
	@media(max-width: 1080px) {
		width:40%
	  }
	.enter-email-text {
		color: lightgrey;
		font-size: .8rem;
	}

	input {
		width: 40%
		padding: 5px 10px;
		border-radius: 5px;
		margin: 10px;
		color: lightgrey;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fa-arrow-alt-circle-left {
		font-size: 2rem;
		align-self: flex-start;
		margin-left: 20px;
		cursor: pointer;
		text-decoration: none;
		@media(max-width: 1024px) {
		}
	  }

	.reset-button {
		width: 45%;
      	padding: 10px 15px;
      	border-radius: 5px;
      	border: 1px solid #418DCF;
      	background-color: #418DCF;
		color: lightgrey;
		cursor: pointer;
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
				<Link className = 'far fa-arrow-alt-circle-left' to = '/'></Link>
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

				<button className = 'reset-button' type = 'submit'>Send reset PW</button>
				
			</RequestResetPWFormWrapper>
		);
	}
};

export default connect(null, { displayError, sendPWResetEmail })(RequestResetPWForm);
