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
  box-shadow: ${props => props.theme.topDiscussionWrapperBxShdw};

  &:hover {
    background-color: ${props => props.theme.topDiscussionWrapperBgHov};
  }


  .title {
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    color: ${props => props.theme.topDiscussionTitleColor};
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
      color: ${props => props.theme.topDiscussionCatColorHov};;
    &:hover {
      background-color: ${props => props.theme.topDiscussionCatBgColorHov};
      cursor: pointer;
      text-decoration: underline;

    }
  }
  }
  .nameanddate {
    text-decoration: none;
    font-size: 14px;
    color: ${props => props.theme.topDiscussionNameDateColor};
    &:hover {
      text-decoration: underline;
      background-color: ${props => props.theme.topDiscussionNameDateColorHov};
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

const Elip = styled.div `
  display: inline;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

const Vote = styled.div `
display: flex;
margin-right: 10px;
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
        <Elip>{body}</Elip>
      </div>
      <Vote><PostCount post_count={post_count || 0} /></Vote>
    </TopDiscussionWrapper>
  );
};

export default TopDiscussion;
