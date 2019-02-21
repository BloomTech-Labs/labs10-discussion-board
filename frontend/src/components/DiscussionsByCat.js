import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

// components
import { PostCount, VoteCount } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const DiscussionByCatWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 5px;
	padding: 10px;
	
	box-shadow: 2px 3px 2px 2px #115075;

  .title {
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    color: black;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: #b7e1f0;
    }
  }
    a {
      color: black;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: #b7e1f0;
    }
  }
  .nameanddate {
    text-decoration: none;
    font-size: 14px;
    color: black;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: #b7e1f0;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.195);
  }

  .content {
    width: 85%;
  }

  p {
    margin-left: 10px;
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
    title,
    user_id,
    username,
    discussion_votes
  } = discussion;

const handleVote = type => handleDiscussionVote(id, type);
return (
    <DiscussionByCatWrapper>
			<VoteCount handleVote = { handleVote } vote_count = { discussion_votes } />
			<div className = 'content'>
				<div>
					<Link to = { `/discussion/${ id }` } className = 'title'>{ title }</Link>&#8201;
					<span className = 'category'>
            <Link to={`/discussions/category/${category_id}`}>
            /d/{ category_name }
            </Link>
          </span>
				</div>

        <div>
          <Link to={`/profile/${user_id}`} className='nameanddate'>
            {username}
          </Link>
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
