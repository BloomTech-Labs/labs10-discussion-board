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
	color: ${props => props.theme.discussionPostColor};

`;

class AddPostForm extends Component {
	state = { postBody: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
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

//Text editor still being worked on

// class AddPostForm extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = { postBody: '' };
// 		this.handleChange = this.handleChange.bind(this)
// 		// this.onChange = this.onChange.bind(this)
// 	}
// 	modules = {
// 		toolbar: [
// 		  [{ 'header': [1, 2, false] }],
// 		  ['bold', 'italic', 'underline','strike', 'blockquote'],
// 		  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
// 		  ['link', 'image'],
// 		  ['clean']
// 		],
// 	  }
	 
// 	 formats = [
// 		'header', 'font', 'size',
// 		'bold', 'italic', 'underline', 'strike', 'blockquote',
// 		'list', 'bullet', 'indent',
// 		'link', 'image', 'video'
// 	  ]

	//   AddPostForm.formats = [
	// 	'header',
	// 	'bold', 'italic', 'underline', 'strike', 'blockquote',
	// 	'list', 'bullet', 'indent',
	// 	'link', 'image'
	//   ]

	//   AddPostForm.modules = {
	// 	toolbar: [
	// 	  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
	// 	  [{size: []}],
	// 	  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
	// 	  [{'list': 'ordered'}, {'list': 'bullet'}, 
	// 	   {'indent': '-1'}, {'indent': '+1'}],
	// 	  ['link', 'image', 'video'],
	// 	  ['clean']
	// 	],
	// 	clipboard: {
	// 	  // toggle to add extra line breaks when pasting HTML:
	// 	  matchVisual: false,
	// 	}
	//   }
// 	  /* 
// 	   * Quill editor formats
// 	   * See https://quilljs.com/docs/formats/
// 	   */
// 	handleChange(html) {
// 		this.setState({ postBody: (html) })
// 	  }

	  

// //onChange(postBody, delta, source, editor) {
//  // const text = editor.getContents(postBody);
//   //this.setState ({ postBody: text });
// //}
// 	handleSubmit = e => {
// 		e.preventDefault();
// 		const { postBody } = this.state;
// 		const { discussion_id, historyPush } = this.props;
// 		return this.props.addPost(discussion_id, postBody, historyPush);
// 	};
// 	render() {
// 		const { postBody } = this.state;
// 		const { toggleAddPostForm } = this.props;
		
// 		return(
// 			<AddPostFormWrapper onSubmit = { this.handleSubmit }>
// 				<h1>Add post form</h1>

				
// 				{Parser(postBody)}
				
// 				<ReactQuill
// 					placeholder = 'Add post...'
// 					name = 'postBody'
// 					onChange = { this.handleChange }
// 					value = {this.state.postBody}
// 					modules={AddPostForm.modules}
// 					formats={AddPostForm.formats}
// 					dangerouslySetInnerHTML={{__html: this.state.postBody}}
// 				/>
			
// 				<button type = 'submit'>Submit</button>
// 				{/* <div dangerouslySetInnerHTML={{__html: this.state.postBody}}></div> */}
// 				<button
// 					onClick = { toggleAddPostForm }
// 					type = 'button' // prevents form submission
// 				>Cancel</button>
// 			</AddPostFormWrapper>
// 		);
// 	}
// };


export default connect(null, { addPost })(AddPostForm);
