import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import {phoneP} from '../globals/globals';

// components
import { PostCount, VoteCount, Deleted } from './index.js';


/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const DiscussionByCatWrapper = styled.div`
  background-color: ${props => props.theme.discussionByCatWrapperBgColor};
  border-radius: 30px;
	display: flex;
  align-items: center;
  justify-content: space-between;
	margin: 5px;
	padding: 10px;
	box-shadow: ${props => props.theme.discussionByCatWrapperBxShdw};
  width: 80%;
  @media ${phoneP}{
    width: 90%;
    margin: 0 auto;
  }
  .body {
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    color: ${props => props.theme.discussionByCatTitleColor};
    &:hover {
      text-decoration: underline;
      background-color: ${props => props.theme.discussionByCatTitleBgColorHov};
      cursor: pointer;
      color: ${props => props.theme.discussionByCatTitleColorHov};
    }
  }
  .category {
    font-size: 18px;
    color: ${props => props.theme.discussionByCatCategoryColor};
    text-decoration: none;
    padding: 5px;
    &:hover {
      text-decoration: underline;
      background-color: ${props => props.theme.discussionByCatCategoryBgColorHov};
      cursor: pointer;
      color: ${props => props.theme.discussionByCatCategoryColorHov};
    }
  }
  .nameanddate {
    text-decoration: none;
    font-size: 14px;
    font-style: italic;
    color: ${props => props.theme.discussionByCatNameDateColor};
    &:hover {
      text-decoration: underline;
      background-color: ${props => props.theme.discussionByCatNameDateBgColorHov};
      cursor: pointer;
      color: ${props => props.theme.discussionByCatNameDateColorHov};
    }
  }

  &:hover {
    background-color: ${props => props.theme.discussionByCatWrapperBgColorHov};
  }

  .content {
    width: 85%;
    color: ${props => props.theme.discussionByCatNameDateColor};
  }

  p {
    margin-left: 10px;
    ${props => props.theme.discussionByCatNameDateColor};
    &:hover {
    }
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const DiscussionsByCat = ({ discussion, handleDiscussionVote }) => {
  const {
    body,
    category_id,
    category_name,
    created_at,
    id,
    post_count,
    user_id,
    username,
    discussion_votes,
    user_vote,
  } = discussion;

const handleVote = type => handleDiscussionVote(id, type);
return (
    <DiscussionByCatWrapper>
      <VoteCount
        handleVote={handleVote}
        vote_count={discussion_votes}
        user_vote={user_vote}
      />
			<div className = 'content'>
				<div>
					<Link to = { `/discussion/${ id }` } className = 'body'>{ body }</Link>
					<span className = 'category'>
            <Link to={`/discussions/category/${category_id}`} className= 'category'>
            /d/{ category_name }
            </Link>
          </span>
				</div>
        <div>
          {
            username ?
            <Link to={`/profile/${user_id}`} className='nameanddate'>
              {username}
            </Link> :
            <Deleted />
          }
          &#8201;
          <span className='timestamp'>
            {' '}
            - {moment(new Date(Number(created_at))).fromNow()}
          </span>
        </div>
        <p>{body}</p>
      </div>

			<PostCount post_count = { post_count || 0 } />
		</DiscussionByCatWrapper>
	);
};

export default DiscussionsByCat;
