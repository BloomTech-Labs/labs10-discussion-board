import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { uploadAvatar } from '../../store/actions/index.js';

const EditAvatarFormWrapper = styled.form`
	margin: 16.5px 0px;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;

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
			background-color: #4ca0e0;
		}

		#image-file + label:hover {
			background-color: #4ca0e0;
			color: black;
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
		margin: 20px;
		font-weight: 700;
		color: white;
		background-color: black;
		padding: 8px 15px;
		border-radius: 5px;

		&:hover {
			cursor: pointer;
			background-color: #4ca0e0;
		}
	}

	.btn {
		margin: 15px 0px;
        border-radius: 10px;
        width: 200px;
        height: 30px;
        font-size: 16px;

          &:hover {
            background-color: #4ca0e0;
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
		const { user_id, uploadAvatar, onUploadAvatarSuccess } = this.props;
		const imageFile = e.target[0].files[0];
		const imageData = new FormData();
		imageData.append('imageFile', imageFile);
		return uploadAvatar(user_id, imageData, onUploadAvatarSuccess);
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
		const { user_id, uploadAvatar, onUploadAvatarSuccess } = this.props;
		return uploadAvatar(user_id, null, onUploadAvatarSuccess);
	};
	render() {
		const { toggleForm } = this.props;
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
			</EditAvatarFormWrapper>
		);
	}
};

const mapStateToProps = state => ({
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { uploadAvatar })(EditAvatarForm);
