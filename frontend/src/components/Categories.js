import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {phoneP, PhoneL, tabletP, tabletL } from '../globals/globals';

// components
import { Deleted } from './index.js';

//add responsiveness to mobile size
const SingleCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;
  box-shadow: 2px 3px 2px 2px gray;

  .title {
    a {
      text-decoration: none;
    }
    font-weight: bold;
    font-size: 18px;
    color: ${props => props.theme.catTitleColor};
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .category {
    font-size: 18px;
    color: ${props => props.theme.catNameColor};
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .nameanddate {
    text-decoration: none;
    font-size: 14px;
    color: ${props => props.theme.catNameDateColor};
    @media (max-width: ${tabletP}){
      display: none;
      @media(max-width: ${phoneP}){
        display: none;
      }
    }
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .discussion-count {
    text-decoration: none;
    font-size: 14px;
    color: ${props => props.theme.catDiscussionCountColor};
  }
  .timestamp {
    text-decoration: none;
    font-size: 14px;
    color: ${props => props.theme.catTimestampColor};
      @media(max-width: ${phoneP}){
        display: none;
      }
    }
  }
  &:hover {
    background-color: ${props => props.theme.catBgColorHov};
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

//import moment and add created_At in the migrations if wish to include
//a timestamp of creation
const Categories = ({ category }) => {
  const { id, user_username, name, created_at, user_id, discussion_count } = category;

  return (
    <SingleCategoryWrapper>
      <div className='title'>
        <span>
          <Link className='category' to={`/discussions/category/${id}`}>
            {name}{' '}
          </Link>
        </span>
      </div>
      {
        user_username ?
        <Link to={`/profile/${user_id}`} className='nameanddate'>
          Created By: {user_username}
        </Link> :
        <span>Created By: <Deleted /></span>
      }
      <div className='timestamp'>
        <span>Created: {moment(new Date(Number(created_at))).fromNow()}</span>
      </div>
      <div className = 'discussion-count'>
        { discussion_count } Discussions
      </div>
    </SingleCategoryWrapper>
  );
};

export default Categories;
