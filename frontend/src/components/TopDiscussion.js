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
	border: 1px solid gray;
	box-shadow: 2px 3px gray;

	.title {
		font-weight: bold;
		font-size: 18px;
		color: black;
		&:hover {
			background-color:  rgba(255, 255, 255, 0.13);
			cursor: pointer;
			color:aqua;
		}
	}
	.category {
		font-size: 18px;
		color: black;
		&:hover {
			background-color:  rgba(255, 255, 255, 0.13);
			cursor: pointer;
			color:aqua;
		}
	}
	.nameanddate {
		font-size: 14px;
		color: black;
		&:hover {
			background-color:  rgba(255, 255, 255, 0.13);
			cursor: pointer;
			color:aqua;
		}
	}
	p {
		margin-left: 10px;
		&:hover {
			background-color:  rgba(255, 255, 255, 0.13);
			cursor: pointer;
			color:aqua;
		}
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopDiscussion = ({ discussion }) => {
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
	return (
		<TopDiscussionWrapper>
			<VoteCount vote_count = { vote_count } />
			<div>
				<div>
					<span className = 'title'>{ title }</span>&#8201;
					<span className = 'category'>/d/{ category_name }</span>
				</div>

				<div>
					<span className = 'nameanddate'>{ username }</span>&#8201;
					<span className = 'nameanddate'> - { moment(created_at).fromNow() }</span>
				</div>
				<p>{ body }</p>
			</div>

			<PostCount post_count = { post_count } />
		</TopDiscussionWrapper>
	);
};

export default TopDiscussion;