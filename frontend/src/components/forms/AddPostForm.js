import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Parser from 'html-react-parser';

// action creators
import { addPost } from '../../store/actions/index.js';

const AddPostFormWrapper = styled.form`
	border: 1px solid blue;
	padding: 10px;
`;

class AddPostForm extends Component {
	constructor(props) {
		super(props)
		this.state = { postBody: '' };
		this.handleChange = this.handleChange.bind(this)
		this.onChange = this.onChange.bind(this)
	}
	modules = {
		toolbar: [
		  [{ 'header': [1, 2, false] }],
		  ['bold', 'italic', 'underline','strike', 'blockquote'],
		  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
		  ['link', 'image'],
		  ['clean']
		],
	  }
	 
	  formats = [
		'header',
		'bold', 'italic', 'underline', 'strike', 'blockquote',
		'list', 'bullet', 'indent',
		'link', 'image'
	  ]
	handleChange(value) {
		this.setState({ postBody: value })
	  }

	  

onChange(postBody, delta, source, editor) {
  const text = editor.getText(postBody);
  this.setState ({ postBody: text });
}
	handleSubmit = e => {
		e.preventDefault();
		const { postBody } = this.state;
		const { discussion_id, historyPush } = this.props;
		return this.props.addPost(discussion_id, postBody, historyPush);
	};
	render() {
		const { postBody } = this.state;
		const { toggleAddPostForm } = this.props;
		return(
			<AddPostFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Add post form</h1>

				<ReactQuill
					placeholder = 'Add post...'
					name = 'postBody'
					onChange = { this.handleChange }
					value = {this.state.postBody}
					modules={this.modules}
                    formats={this.formats}
				/>
				{Parser(postBody)}
				<button type = 'submit'>Submit</button>
				{/* <div dangerouslySetInnerHTML={{__html: this.state.postBody}}></div> */}
				<button
					onClick = { toggleAddPostForm }
					type = 'button' // prevents form submission
				>Cancel</button>
			</AddPostFormWrapper>
		);
	}
};


export default connect(null, { addPost })(AddPostForm);
