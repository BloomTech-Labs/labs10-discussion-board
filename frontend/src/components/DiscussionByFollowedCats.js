import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { Avatar, VoteCount, Follow } from './index.js';

// globals
import {
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
		${ ({ singleDiscussion }) => !singleDiscussion && 'background-color: #ddd;cursor: pointer;' }
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
				cursor: pointer;
			}
		}

		@media (max-width: 530px) {
			width: 100%;
		}
	}

	.discussion-info {
		display: flex;
		width: 75%;

		.votes-wrapper {
			margin-right: 10px;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			i {
				padding-left: 10px;
				padding-right: 5px;
				padding-top: 2px;
			}
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
		}

		.date-views-comment {
			display: flex;
		}

		@media (max-width: 830px) {
			justify-content: center;

			.desktop {
				display: none;
			}
		}

		@media (max-width: 630px) {
			.tablet {
				display: none;
			}
		}

		@media (max-width: 530px) {
			width: 100%;
			justify-content: flex-start;
			padding-top: 10px;
			margin-left: -10px;
		}
	}

	.fa-circle {
		font-size: 0.4rem;
		margin-top: 9px;
		margin-left: 8px;
		margin-right: 8px;
	}

	@media (max-width: 830px) {
		.desktop {
			display: none;
		}
	}

	@media (max-width: 630px) {
		.tablet, .desktop {
			display: none;
		}
	}

	@media (max-width: 530px) {
		flex-wrap: wrap;
		flex-direction: column;
		align-items: flex-start;
	}
`;

const UsernameWrapper = styled.span`
	color: ${props => props.theme.discussionPostColor};
`;

const DiscussionByFollowedCats = ({ discussion, history, voteOnDiscussion, singleDiscussion }) => {
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
		<DiscussionWrapper singleDiscussion = { singleDiscussion } onClick = { handleDiscussionClick }>
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
					<div className = 'votes-wrapper'>
						<VoteCount
							upvotes = { upvotes }
							downvotes = { downvotes }
							user_vote = { user_vote }
							handleVote = { handleVote }
						/>
					</div>
					<div className = 'category-wrapper' onClick = { handleCategoryClick }>
						<i className = { category_icon } />
						<span className = 'category-name'>{ category_name }</span>
					</div>
					<i className = 'fas fa-circle tablet' />
					<div className = 'date-views-comment tablet'>
						<span>{moment(new Date(Number(created_at))).fromNow()}</span>
						<i className = 'fas fa-circle' />
						<span className = 'desktop'>{ views } View{ views !== 1 && 's' }</span>
						<i className = 'fas fa-circle desktop' />
						<span>{ post_count } Comment{ Number(post_count) !== 1 && 's' }</span>
					</div>
				</div>
			</InfoWrapper>
		</DiscussionWrapper>
	);
};

export default DiscussionByFollowedCats;
