import React from 'react';
import styled from 'styled-components';
import {phoneP, tabletP, } from '../globals/globals';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const PostCountWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	margin: 0px;
	padding: 5px;
	border: ${props => props.theme.postCountWrapperBorder};
	width: 60px;
	color: ${props => props.theme.postCountWrapperColor};
	@media ${tabletP}{
		display: flex;
		flex-direction: column;
		
		@media ${phoneP}{
		  display: flex;
		  flex-direction: column;
		}
	  }
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
