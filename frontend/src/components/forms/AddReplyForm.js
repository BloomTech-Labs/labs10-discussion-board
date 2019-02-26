import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addPost } from '../../store/actions/index.js';

// components
import { Quote } from '../index.js';

const AddReplyFormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.errorWrapperBgColor};
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	overflow: auto;
	z-index: 2;
`;

const AddReplyFormBox = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: ${props => props.theme.errorBoxBgColor};
	padding: 10px;
	border-radius: 5px;
	border: 1px solid black;
	max-width: 90%;
`;

class AddReplyForm extends Component {
	state = {
		repliedPost: this.props.repliedPost,
		postBody: '',
	};
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { repliedPost, postBody } = this.state;
		const { discussion_id, historyPush, addPost } = this.props;
		return addPost(discussion_id, postBody, historyPush, repliedPost.id);
	};
	handleToggle = () => this.props.toggleAddReplyForm();
	render() {
		const {
			repliedPost,
			postBody,
		} = this.state;
		return(
			<AddReplyFormWrapper>
				<AddReplyFormBox onSubmit = { this.handleSubmit }>
					<Quote reply_to = { repliedPost } />
					<h1>Add Reply</h1>

					<input
						placeholder = 'Add reply...'
						name = 'postBody'
						onChange = { this.handleChange }
						value = { postBody }
					/>

					<button type = 'submit'>Submit</button>

					<button
						onClick = { this.handleToggle }
						type = 'button' // prevents form submission
					>Cancel</button>
				</AddReplyFormBox>
			</AddReplyFormWrapper>
		);
	}
};

export default connect(null, { addPost })(AddReplyForm);
