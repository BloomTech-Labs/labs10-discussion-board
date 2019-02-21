import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addDiscussion } from '../../store/actions/index.js';

const AddDiscussionFormWrapper = styled.form`
	border: 1px solid blue;
	padding: 10px;
`;

class AddDiscussionForm extends Component {
	state = { dBody: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { title, body } = this.state;
		const { user_id, category_id, historyPush } = this.props;
		return this.props.addDiscussion(user_id, category_id, title, body, historyPush);
	};
	render() {
		const { dBody } = this.state;
		const { toggleAddDiscussionForm } = this.props;
		return(
			<AddDiscussionFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Add Discussion form</h1>

				<input
					placeholder = 'Add discussion...'
					name = 'dBody'
					onChange = { this.handleChange }
					value = { dBody }
				/>

				<button type = 'submit'>Submit</button>

				<button
					onClick = { toggleAddDiscussionForm }
					type = 'button' // prevents form submission
				>Cancel</button>
			</AddDiscussionFormWrapper>
		);
	}
};

export default connect(null, { addDiscussion })(AddDiscussionForm);
