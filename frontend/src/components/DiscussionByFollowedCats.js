import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { Avatar } from './index.js';

// globals
import { phoneP, tabletP } from '../globals/globals.js';

const DiscussionWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;
	margin-bottom: 20px;

	@media ${ tabletP } {
		background-color: red;
	}

	@media ${ phoneP } {
		background-color: blue;
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

	.fa-circle {
		font-size: 0.4rem;
		margin-top: 7px;
		margin-left: 4px;
		margin-right: 4px;
	}

	.category-name {
		margin-left: 5px;
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

const DiscussionByFollowedCats = ({ discussion }) => {
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
		views,
	} = discussion;
	return(
		<DiscussionWrapper>
			<BodyWrapper>{ body.length > 183 ? body.substr(0, 183) + '...' : body }</BodyWrapper>
			<InfoWrapper>
				<Avatar
					height = '20px'
					width = '20px'
					src = { avatar }
				/>
				&nbsp;
				<UsernameWrapper>{ username }</UsernameWrapper>
				<VotesWrapper>
					<i className = 'fas fa-arrow-alt-circle-up' />
					<span>{ upvotes || 0 }</span>
					<i className = 'fas fa-arrow-alt-circle-down' />
					<span>{ downvotes || 0 }</span>
				</VotesWrapper>
				<i className = { category_icon } />
				<span className = 'category-name'>{ category_name }</span>
				<i className = 'fas fa-circle' />
				<span>{moment(new Date(Number(created_at))).fromNow()}</span>
				<i className = 'fas fa-circle' />
				<span>{ views } View{ views !== 1 && 's' }</span>
				<i className = 'fas fa-circle' />
				<span>{ post_count } Comment{ Number(post_count) !== 1 && 's' }</span>
			</InfoWrapper>
		</DiscussionWrapper>
	);
};

export default DiscussionByFollowedCats;
