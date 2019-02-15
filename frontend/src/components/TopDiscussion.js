import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { PostCount, VoteCount } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 5px;
	padding: 10px;
	border: 1px solid black;

	.title {
		font-weight: bold;
		font-size: 18px;
	}
	:hover {
		background-color:  rgba(255, 255, 255, 0.13);
		cursor: pointer;
	}
	.nameanddate {
		font-size: 14px;
	}
	p {
		margin-left: 10px;
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopDiscussion = ({ discussion, handleDiscussionVote }) => {
	const {
		body,
		category_id,
		category_name,
		created_at,
		id,
		post_count,
		title,
		user_id,
		username,
		vote_count,
	} = discussion;
	const handleVote = type => handleDiscussionVote(id, type);
	return (
		<TopDiscussionWrapper>
			<VoteCount handleVote = { handleVote } vote_count = { vote_count } />
			<div>
				<div>
					<span className = 'title'>{ title }</span>&#8201;
					<span>/d/{ category_name }</span>
				</div>

				<div>
					<span>{ username }</span>&#8201;
					<span> - { moment(created_at).fromNow() }</span>
				</div>
				<p>{ body }</p>
			</div>

			<PostCount post_count = { post_count } />
		</TopDiscussionWrapper>
	);
};

export default TopDiscussion;