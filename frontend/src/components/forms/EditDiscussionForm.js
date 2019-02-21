import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { editDiscussion } from '../../store/actions/index.js';

const EditDiscussionFormWrapper = styled.form`
	border: 1px solid red;
	padding: 10px;
`;

class EditDiscussionForm extends Component {
	state = {
		title: this.props.title,
		body: this.props.body,
	};
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { title, body } = this.state;
		const { discussion_id, editDiscussion, historyPush } = this.props;
		return editDiscussion(discussion_id, title, body, historyPush);
	};
	render() {
		const {
			toggleEditDiscussionForm,
		} = this.props;
		const { title, body } = this.state;
		return(
			<EditDiscussionFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Edit Discussion</h1>

				<input
					placeholder = 'Enter new title...'
					name = 'title'
					value = { title }
					onChange = { this.handleInputChange }
				/>

				<input
					placeholder = 'Enter new body...'
					name = 'body'
					value = { body }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>

				<button type = 'button' onClick = { toggleEditDiscussionForm }>Cancel</button>
			</EditDiscussionFormWrapper>
		);
	}
};

export default connect(null, { editDiscussion })(EditDiscussionForm);
