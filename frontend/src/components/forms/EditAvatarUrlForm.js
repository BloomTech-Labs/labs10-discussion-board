import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { uploadAvatarUrl } from '../../store/actions/index.js';

const EditAvatarUrlFormWrapper = styled.form`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border:1px solid #5B5B5B;
	border-radius: 5px;
	padding: 5px 10px;

	.upload-input-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
	}

	.upload-btn {
		margin-top: 20px;
		font-weight: 700;
		color: white;
		background-color: black;
		padding: 8px 15px;
		border-radius: 5px;

		&:hover {
			cursor: pointer;
			background-color: #534C2F;
		}
	}

	.btn {
		margin: 10px;
		background-color: #C9C19F;
		border: 1px solid #5B5B5B;
		border-radius: 5px;
		padding: 5px 10px;
		color: #5B5B5B;

		&:hover {
			background-color: #84794B;
			color: #b7e1f0;
			cursor: pointer;
		}
	}
`;

class EditAvatarUrlForm extends Component {
	state = { url: '' };
	handleSubmit = e => {
		e.preventDefault();
		const { url } = this.state;
		const { user_id, uploadAvatarUrl, onUploadAvatarSucces } = this.props;
		return uploadAvatarUrl(user_id, url, onUploadAvatarSucces);
	};
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	resetAvatar = e => {
		e.preventDefault();
		const { user_id, uploadAvatarUrl, onUploadAvatarSucces } = this.props;
		return uploadAvatarUrl(user_id, null, onUploadAvatarSucces);
	};
	render() {
		const { toggleForm } = this.props;
		const { url } = this.state;
		return(
			<EditAvatarUrlFormWrapper onSubmit = { this.handleSubmit }>
				<div className = 'upload-input-wrapper'>
					<input
						type = 'text'
						name = 'url'
						onChange = { this.handleInputChange }
					/>
				</div>

				{
					url &&
					<button className = 'upload-btn' type = 'submit'>Submit</button>
				}

				<button
					className = 'btn reset-btn'
					type = 'button'
					onClick = { this.resetAvatar }
				>Reset to default</button>

				<button
					type = 'button'
					className = 'btn cancel-btn'
					onClick = { toggleForm }
				>Cancel</button>
			</EditAvatarUrlFormWrapper>
		);
	}
};

const mapStateToProps = state => ({
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { uploadAvatarUrl })(EditAvatarUrlForm);
