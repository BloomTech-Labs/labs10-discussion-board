import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { Avatar, VoteCount } from './index.js';

// globals
import {
	phoneP,
	tabletP,
	phoneL,
} from '../globals/globals.js';

const DiscussionWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: flex-start;
	width: 98%;
	margin-bottom: 20px;
	padding: 5px;
	border-radius: 5px;

	&:hover {
		background-color: #ddd;
		cursor: pointer;
	}
`;

const BodyWrapper = styled.p`
	text-align: justify;
	margin-bottom: 20px;
`;

const InfoWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	font-size: 0.9rem;
	color: #a7a7a7;

	@media ${ phoneL } {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		}

	.user-info {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 25%;
		margin-right: 20px;

		.user {
			width: fit-content;
			color: black;

			&:hover {
				text-decoration: underline;
			}
		}

		@media ${ phoneL } {
			width: 40%;
		}
	}

	.discussion-info {
		display: flex;
		width: 75%;
		@media ${ phoneL } {
			width: 60%;
		}

		.category-wrapper {
			&:hover {
				color: black;
				cursor: pointer;
			}

			i {
				margin-left: 10px;
				margin-right: 5px;
			}

			.category-name {
				@media ${ tabletP } {
					display: none;
				}
			}
		}

		.date-views-comment {
			display: flex;
			width: 50%;

			@media (max-width: 755px) {
				width: 35%;
			}

			@media ${ phoneL } {
				margin-top: 20px;
				width: 90%;
			}
		}
	}

	.fa-circle {
		font-size: 0.4rem;
		margin-top: 9px;
		margin-left: 8px;
		margin-right: 8px;
	}
`;

const UsernameWrapper = styled.span`
	color: ${props => props.theme.discussionPostColor};
`;

const VotesWrapper = styled.div`
	margin-right: 10px;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	i {
		padding-left: 10px;
		padding-right: 5px;
		padding-top: 2px;
	}
`;

const DiscussionByFollowedCats = ({ discussion, history, voteOnDiscussion }) => {
	const {
		avatar,
		body,
		category_icon,
		category_id,
		category_name,
		created_at,
		downvotes,
		id,
		post_count,
		upvotes,
		user_vote,
		username,
		user_id,
		views,
	} = discussion;
	const handleDiscussionClick = () => history.push(`/discussion/${ id }`);
	const handleCategoryClick = e => {
		e.stopPropagation();
		return history.push(`/discussions/category/${ category_id }`);
	};
	const handleUserClick = e => {
		e.stopPropagation();
		return history.push(`/profile/${ user_id }`);
	};
	const handleVote = (e, type) => {
		e.stopPropagation();
		return voteOnDiscussion(id, type);
	};
	return(
		<DiscussionWrapper onClick = { handleDiscussionClick }>
			<BodyWrapper>{ body.length > 183 ? body.substr(0, 183) + '...' : body }</BodyWrapper>
			<InfoWrapper>
				<div className = 'user-info'>
					<div className = 'user' onClick = { handleUserClick }>
						<Avatar
							height = '20px'
							width = '20px'
							src = { avatar }
						/>
						&nbsp;
						<UsernameWrapper>{ username }</UsernameWrapper>
					</div>
				</div>
				<div className = 'discussion-info'>
					<VotesWrapper>
						<VoteCount
							upvotes = { upvotes }
							downvotes = { downvotes }
							user_vote = { user_vote }
							handleVote = { handleVote }
						/>
					</VotesWrapper>
					<div className = 'category-wrapper'>
						<i className = { category_icon } />
						<span className = 'category-name'>{ category_name }</span>
					</div>
					<i className = 'fas fa-circle' />
					<div className = 'date-views-comment'>
						<span>{moment(new Date(Number(created_at))).fromNow()}</span>
						<i className = 'fas fa-circle' />
						<span>{ views } View{ views !== 1 && 's' }</span>
						<i className = 'fas fa-circle' />
						<span>{ post_count } Comment{ Number(post_count) !== 1 && 's' }</span>
					</div>
				</div>
			</InfoWrapper>
		</DiscussionWrapper>
	);
};

export default DiscussionByFollowedCats;
