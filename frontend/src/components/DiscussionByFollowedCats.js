import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { Avatar, VoteCount } from './index.js';

// globals
import {
	phoneP,
	// tabletP,
} from '../globals/globals.js';

const DiscussionWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;
	margin-bottom: 20px;
	border-radius: 5px;
	padding: 5px;

	&:hover {
		background-color: #d3d3d3;
		cursor: pointer;
	}
`;

const BodyWrapper = styled.p`
	text-align: justify;
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	font-size: 0.8rem;
	color: #a7a7a7;

	.user-info {
		@media ${ phoneP } {
			width: 100%;
		}
	}

	.fa-circle {
		font-size: 0.4rem;
		margin-top: 7px;
		margin-left: 4px;
		margin-right: 4px;
	}

	.category-name {
		margin-left: 5px;
	}

	.date-views-comment {
		@media ${ phoneP } {
			display: none;
		}
	}
`;

const UsernameWrapper = styled.span`
	margin-right: 20px;
	color: black;
`;

const VotesWrapper = styled.div`
	margin-right: 10px;

	i {
		padding-left: 10px;
		padding-right: 5px;
	}
`;

const DiscussionByFollowedCats = ({ discussion, history, voteOnDiscussion }) => {
	const {
		avatar,
		body,
		category_icon,
		// category_id,
		category_name,
		created_at,
		downvotes,
		id,
		post_count,
		upvotes,
		user_vote,
		username,
		views,
	} = discussion;
	const handleDiscussionClick = () => history.push(`/discussion/${ id }`);
	const handleVote = (e, type) => {
		e.stopPropagation();
		return voteOnDiscussion(id, type);
	};
	return(
		<DiscussionWrapper onClick = { handleDiscussionClick }>
			<BodyWrapper>{ body.length > 183 ? body.substr(0, 183) + '...' : body }</BodyWrapper>
			<InfoWrapper>
				<div className = 'user-info'>
					<Avatar
						height = '20px'
						width = '20px'
						scr = { avatar }
					/>
					&nbsp;
					<UsernameWrapper>{ username }</UsernameWrapper>
				</div>
				<VotesWrapper>
					<VoteCount
						upvotes = { upvotes }
						downvotes = { downvotes }
						user_vote = { user_vote }
						handleVote = { handleVote }
					/>
				</VotesWrapper>
				<i className = { category_icon } />
				<span className = 'category-name'>{ category_name }</span>
				<div className = 'date-views-comment'>
					<i className = 'fas fa-circle' />
					<span>{moment(new Date(Number(created_at))).fromNow()}</span>
					<i className = 'fas fa-circle' />
					<span>{ views } View{ views !== 1 && 's' }</span>
					<i className = 'fas fa-circle' />
					<span>{ post_count } Comment{ Number(post_count) !== 1 && 's' }</span>
				</div>
			</InfoWrapper>
		</DiscussionWrapper>
	);
};

export default DiscussionByFollowedCats;
