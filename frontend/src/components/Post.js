import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const PostWrapper = styled.div`
	width: 90%;
	border: 1px solid black;
`

const Post = ({ post }) => {
	const {
		body,
		created_at,
		discussion_id,
		id,
		post_votes,
		user_id,
		username,
	} = post;
	return(
		<PostWrapper>
			<h1>POST</h1>
			<p>post votes: { post_votes }</p>
			<p>Posted by: { username } { moment(created_at).fromNow() }</p>
			<p>Body: { body }</p>
		</PostWrapper>
	)
};

export default Post;
