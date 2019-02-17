import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

// components
import { EditPostForm } from './index.js';

const PostWrapper = styled.div`
	width: 90%;
	border: 1px solid black;
`;

const Post = ({
	post,
	loggedInUserId,
	historyPush,
	showEditPostForm,
	updateEditPostForm,
	handleRemovePost,
}) => {
	const handleEdit = () => updateEditPostForm(id);
	const handleRemove = () => handleRemovePost(loggedInUserId, id, historyPush, discussion_id);
	const {
		body,
		created_at,
		discussion_id,
		id,
		last_edited_at,
		post_votes,
		user_id,
		username,
	} = post;
	let lastEditDate;
	if (last_edited_at) {
		lastEditDate = new Date(parseInt(last_edited_at));
		lastEditDate = lastEditDate.toISOString();
	}
	const userCreatedPost = loggedInUserId === user_id;
	return(
		<PostWrapper>
			{ userCreatedPost && <button onClick = { handleRemove }>REMOVE POST</button> }
			<h1>POST</h1>
			<p>post votes: { post_votes }</p>
			<p>Posted by: { username } { moment(created_at).fromNow() }</p>
			<p>Body: { body }</p>

			{
				userCreatedPost &&
				(
					showEditPostForm === id ?
					<EditPostForm
						user_id = { user_id }
						post_id = { id }
						discussion_id = { discussion_id }
						historyPush = { historyPush }
						updateEditPostForm = { updateEditPostForm }
					/> :
					<>
						<button onClick = { handleEdit }>Edit Post</button>
						{ last_edited_at && <p>Last edited { moment(lastEditDate).fromNow() }</p> }
					</>
				)
			}
		</PostWrapper>
	)
};

const mapStateToProps = state => ({
	loggedInUserId: state.users.user_id,
});

export default connect(mapStateToProps, {})(Post);
