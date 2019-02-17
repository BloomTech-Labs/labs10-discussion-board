import React from 'react';
import styled from 'styled-components';

// components
import { Post } from '../components/index.js';

const PostsViewWrapper = styled.div`
	width: 90%;
	border: 1px solid black;
`;

const PostsView = ({ posts, historyPush, showEditPostForm, updateEditPostForm }) => {
	return(
		<PostsViewWrapper>
			{ posts.map((post, index) =>
				<Post
					key = { index }
					post = { post }
					historyPush = { historyPush }
					showEditPostForm = { showEditPostForm }
					updateEditPostForm = { updateEditPostForm }
				/>)
			}
		</PostsViewWrapper>
	)
};

export default PostsView;
