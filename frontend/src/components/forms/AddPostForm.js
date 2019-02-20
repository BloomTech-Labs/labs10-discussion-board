import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addPost } from '../../store/actions/index.js';

const AddPostFormWrapper = styled.form`
	border: 1px solid blue;
	padding: 10px;
`;

class AddPostForm extends Component {
	state = { postBody: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { postBody } = this.state;
		const { user_id, discussion_id, historyPush } = this.props;
		return this.props.addPost(user_id, discussion_id, postBody, historyPush);
	};
	render() {
		const { postBody } = this.state;
		const { toggleAddPostForm } = this.props;
		return(
			<AddPostFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Add post form</h1>

				<input
					placeholder = 'Add post...'
					name = 'postBody'
					onChange = { this.handleChange }
					value = { postBody }
				/>

				<button type = 'submit'>Submit</button>

				<button
					onClick = { toggleAddPostForm }
					type = 'button' // prevents form submission
				>Cancel</button>
			</AddPostFormWrapper>
		);
	}
};

export default connect(null, { addPost })(AddPostForm);
