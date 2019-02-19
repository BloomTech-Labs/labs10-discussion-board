import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { uploadAvatar } from '../../store/actions/index.js';

const EditAvatarFormWrapper = styled.form`
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

		#image-file {
			width: 0.1px;
			height: 0.1px;
			opacity: 0;
			overflow: hidden;
			position: absolute;
			z-index: -1;
		}

		#image-file + label {
			font-weight: 700;
			color: white;
			background-color: black;
			display: inline-block;
			padding: 8px 15px;
			border-radius: 5px;
		}

		#image-file:focus + label {
			background-color: #736A42;
		}

		#image-file + label:hover {
			background-color: #534C2F;
		}

		#image-file + label {
			cursor: pointer;
		}

		#image-file:focus + label {
			outline: 1px dotted #000;
			outline: -webkit-focus-ring-color auto 5px;
		}
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
			color: white;
			cursor: pointer;
		}
	}

	.fas {
		margin-right: 8px;
	}
`;

class EditAvatarForm extends Component {
	state = { name: '' };
	handleSubmit = e => {
		e.preventDefault();
		const { user_id, uploadAvatar, onUploadAvatarSucces } = this.props;
		const imageFile = e.target[0].files[0];
		const imageData = new FormData();
		imageData.append('imageFile', imageFile);
		return uploadAvatar(user_id, imageData, onUploadAvatarSucces);
	};
	handleInputChange = e => {
		if (e.target.files.length) {
			const { name } = e.target.files[0];
			return this.setState({ name });
		}
		return this.setState({ name: '' });
	};
	resetAvatar = e => {
		e.preventDefault();
		const { user_id, uploadAvatar, onUploadAvatarSucces } = this.props;
		return uploadAvatar(user_id, null, onUploadAvatarSucces);
	};
	render() {
		const { toggleForm, avatar } = this.props;
		const { name } = this.state;
		return(
			<EditAvatarFormWrapper onSubmit = { this.handleSubmit }>
				<div className = 'upload-input-wrapper'>
					<input
						type = 'file'
						name = 'image-file'
						id = 'image-file'
						onChange = { this.handleInputChange }
					/>

					<label htmlFor = 'image-file'>
						{
							name ?
							<span>{ name }</span> :
							<>
								<i className = 'fas fa-user' />
								<span>Choose an avatar...</span>
							</>
						}
					</label>
				</div>

				{
					name &&
					<button className = 'upload-btn' type = 'submit'>Submit</button>
				}

				{
					avatar &&
					<button
						className = 'btn reset-btn'
						type = 'button'
						onClick = { this.resetAvatar }
					>Reset to default</button>
				}

				<button
					type = 'button'
					className = 'btn cancel-btn'
					onClick = { toggleForm }
				>Cancel</button>
			</EditAvatarFormWrapper>
		);
	}
};

const mapStateToProps = state => ({
	avatar: state.users.avatar,
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { uploadAvatar })(EditAvatarForm);
