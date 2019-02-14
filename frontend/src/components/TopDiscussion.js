import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/

 const TopDiscussionWrapper = styled.div`
	margin: 5px;
	padding: 10px;
	border: 1px solid black;

	.title {
		font-weight: bold;
	}
	:hover {
		background-color:  rgba(255, 255, 255, 0.13);
		cursor: pointer;
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopDiscussion = ({ discussion }) => {
	const {
		id,
		user_id,
		username,
		category_id,
		category_name,
		title,
		body,
		created_at,
	} = discussion;
	return (
		<TopDiscussionWrapper>
			<div>
				<span className = 'title'>{ title }</span>&#8201;
				<span> - { category_name }</span>
			</div>

			<div>
				<span>{ username }</span>&#8201;
				<span> - { moment(created_at).fromNow() }</span>
			</div>
			<p>{ body }</p>
		</TopDiscussionWrapper>
	);
};

export default TopDiscussion;
