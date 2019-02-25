import React from 'react';
import styled from 'styled-components';

// components
import { Post } from '../components/index.js';


const PostsViewWrapper = styled.div`
	border: 1px solid black;
`;

const PostsView = ({
	posts,
	historyPush,
	showEditPostForm,
	updateEditPostForm,
	handleRemovePost,
	order,
	orderType,
}) => {
	return(
		<PostsViewWrapper>
			<div>
			</div>
			{ posts.map((post, index) =>
				<Post
					key = { index }
					post = { post }
					historyPush = { historyPush }
					showEditPostForm = { showEditPostForm }
					updateEditPostForm = { updateEditPostForm }
					handleRemovePost = { handleRemovePost }	
					order = { order }
					orderType = { orderType }
				/>)
			}
		</PostsViewWrapper>
	)
};

export default PostsView;
