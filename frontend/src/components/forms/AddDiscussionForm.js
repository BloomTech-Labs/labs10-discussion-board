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
<<<<<<< HEAD
	state = { body: '' };
=======
	state = { title: '', body: '' };
>>>>>>> 10e56b10e6c7eefa40ef150801cb31510d07067e
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { title, body } = this.state;
		const { category_id, historyPush } = this.props;
		return this.props.addDiscussion(category_id, title, body, historyPush);
	};
	render() {
<<<<<<< HEAD
		const { body } = this.state;
		const { toggleAddDiscussionForm } = this.props;
=======
		const { title, body } = this.state;
		const { toggleShowAddForm } = this.props;
>>>>>>> 10e56b10e6c7eefa40ef150801cb31510d07067e
		return(
			<AddDiscussionFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Add Discussion form</h1>

				<input
<<<<<<< HEAD
					placeholder = 'Add discussion...'
=======
					placeholder = 'Add discussion title...'
					name = 'title'
					onChange = { this.handleChange }
					value = { title }
				/>

				<input
					placeholder = 'Add discussion body...'
>>>>>>> 10e56b10e6c7eefa40ef150801cb31510d07067e
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
