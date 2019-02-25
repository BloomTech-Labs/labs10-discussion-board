import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

// components
import { PostCount, VoteCount, Deleted } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionWrapper = styled.div`
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;
  box-shadow: 2px 3px 2px 2px gray;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }


  .title {
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    color: black;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .category {
    a {
      margin-left: 5px;
      text-decoration: none;
      font-size: 18px;
      color: black;
    &:hover {
      background-color: rgba(255, 255, 255, 0.13);
      cursor: pointer;
      text-decoration: underline;

    }
  }
  }
  .nameanddate {
    text-decoration: none;
    font-size: 14px;
    color: black;
    &:hover {
      text-decoration: underline;
      background-color: rgba(255, 255, 255, 0.13);
      cursor: pointer;
    }
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
    user_vote,
  } = discussion;

  const handleVote = type => handleDiscussionVote(id, type);
  return (
    <TopDiscussionWrapper>
      <VoteCount
        handleVote={handleVote}
        vote_count={vote_count}
        user_vote={user_vote}
      />
      <div className='content'>
        <div>
          <Link to={`/discussion/${id}`} className='title'>
            {title}
          </Link>
          &#8201;
          <span className='category'>
            <Link to={`/discussions/category/${category_id}`}>
              /d/{category_name}
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

      <PostCount post_count={post_count || 0} />
    </TopDiscussionWrapper>
  );
};

export default TopDiscussion;
