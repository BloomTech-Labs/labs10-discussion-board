import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopPostWrapper = styled.div`
	margin: 5px;
	padding: 10px;
	border: 1px solid black;

	.discussion-title {
		font-weight: bold;
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopPost = ({ post }) => {
	const {
		body,
		created_at,
		discussion_id,
		discussion_title,
		category_id,
		category_name,
		id,
		user_id,
		username,
		vote_count,
	} = post;
	return (
		<TopPostWrapper>
			<div>
				<span className = 'discussion-title'>{ discussion_title }</span>&#8201;
				<span>/d/{ category_name }</span>
			</div>

			<div>
				<span>{ username }</span>&#8201;
				<span> - { moment(created_at).fromNow() }</span>
			</div>
			<p>{ body }</p>
		</TopPostWrapper>
	);
};

export default TopPost;
