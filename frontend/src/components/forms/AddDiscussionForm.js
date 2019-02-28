import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addDiscussion } from '../../store/actions/index.js';

const AddDiscussionFormWrapper = styled.form`
	padding: 10px;
	color: ${props => props.theme.discussionPostColor}

`;

class AddDiscussionForm extends Component {
	state = { title: '', body: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { title, body } = this.state;
		const { category_id, historyPush } = this.props;
		return this.props.addDiscussion(category_id, title, body, historyPush);
	};
	render() {
		const { title, body } = this.state;
		const { toggleShowAddForm } = this.props;
		return(
			<AddDiscussionFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Add Discussion form</h1>

				<input
					placeholder = 'Add discussion title...'
					name = 'title'
					onChange = { this.handleChange }
					value = { title }
				/>

				<input
					placeholder = 'Add discussion body...'
					name = 'body'
					onChange = { this.handleChange }
					value = { body }
				/>

				<button type = 'submit'>Submit</button>

				<button
					onClick = { toggleShowAddForm }
					type = 'button' // prevents form submission
				>Cancel</button>
			</AddDiscussionFormWrapper>
		);
	}
};

export default connect(null, { addDiscussion })(AddDiscussionForm);
