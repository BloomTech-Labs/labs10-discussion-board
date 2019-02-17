import React, { Component } from 'react';
import styled from 'styled-components';

const AddPostFormWrapper = styled.form`
	border: 1px solid blue;
	padding: 10px;
`;

class AddPostForm extends Component {
	state = { postBody: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		// const 
		// console.log()
	};
	render() {
		const { postBody } = this.state;
		return(
			<AddPostFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Add post form</h1>

				<input
					placeholder = 'Add post...'
					name = 'postBody'
					onChange = { this.handleChange }
					value = { postBody }
				/>
			</AddPostFormWrapper>
		);
	}
};

export default AddPostForm;
