import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { Avatar, VoteCount } from './index.js';

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
	border-bottom: 1px solid black;

	&:hover {
		background-color: white;
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

	@media ${ phoneL} {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		}

	.user-info {
		width: 25%;
		@media ${ phoneL} {
			width: 38%;
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
		
		@media ${ tabletP} {
			display: none;
		}
	}

	.date-views-comment {
		display: flex;
		justify-content: space-between;
		width: 25%;

		@media (max-width: 755px) {
      	width: 35%;
    	}

		@media ${ phoneL} {
			margin-top: 20px;
			width: 90%;
		}
	}
`;

const UsernameWrapper = styled.span`
	margin-right: 20px;
	color: ${props => props.theme.discussionPostColor};
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
  const handleDiscussionClick = () => history.push(`/discussion/${id}`);
  const handleVote = (e, type) => {
    e.stopPropagation();
    return voteOnDiscussion(id, type);
  };
  return (
    <DiscussionWrapper onClick={handleDiscussionClick}>
      <BodyWrapper>{body.length > 183 ? body.substr(0, 183) + '...' : body}</BodyWrapper>
      <InfoWrapper>
        <div className='user-info'>
          <Avatar
            height='20px'
            width='20px'
            src={avatar}
          />
          &nbsp;
					<UsernameWrapper>{username}</UsernameWrapper>
        </div>
        <VotesWrapper>
          <VoteCount
            upvotes={upvotes}
            downvotes={downvotes}
            user_vote={user_vote}
            handleVote={handleVote}
          />
        </VotesWrapper>
        <i className={category_icon} />
        <span className='category-name'>{category_name}</span>
        <div className='date-views-comment'>
          <span>{moment(new Date(Number(created_at))).fromNow()}</span>
          <span>{views} View{views !== 1 && 's'}</span>
          <span>{post_count} Comment{Number(post_count) !== 1 && 's'}</span>
        </div>
      </InfoWrapper>
    </DiscussionWrapper>
  );
};

export default DiscussionByFollowedCats;
