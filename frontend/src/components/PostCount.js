import React from 'react';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const PostCountWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	margin: 5px;
	padding: 10px;
	border: 1px solid black;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const PostCount = ({ post_count }) => {
	return (
		<PostCountWrapper>
			<p>Posts</p>
			<div>{ post_count }</div>
		</PostCountWrapper>
	);
};

export default PostCount;
