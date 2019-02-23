import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addCategory } from '../../store/actions/index.js';

const AddCategoryFormWrapper = styled.form`
	border: 1px solid blue;
	padding: 10px;
`;

class AddCategoryForm extends Component {
	state = { name: '' };
	handleSubmit = e => {
		e.preventDefault();
		const { name } = this.state;
		const { addCategory, historyPush } = this.props;
		return addCategory(name, historyPush);
	};
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	render() {
		const { toggleAddForm } = this.props;
		const { name } = this.state;
		return(
			<AddCategoryFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Add Category</h1>
				<input
					placeholder = 'Enter category name'
					name = 'name'
					value = { name }
					onChange = { this.handleInputChange }
				/>
				<button type = 'submit'>Create</button>
				<button type = 'button' onClick = { toggleAddForm }>Cancel</button>
			</AddCategoryFormWrapper>
		);
	}
};

export default connect(null, { addCategory })(AddCategoryForm);
