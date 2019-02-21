import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;

  box-shadow: 2px 3px 2px 2px gray;

  .title {
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    color: black;
    &:hover {
      text-decoration: underline;
      background-color: rgba(255, 255, 255, 0.13);
      cursor: pointer;
      color: white;
    }
  }
  .category {
    font-size: 18px;
    color: black;
    &:hover {
      text-decoration: underline;
      background-color: rgba(255, 255, 255, 0.13);
      cursor: pointer;
      color: white;
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
      color: white;
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

//import moment and add created_At in the migrations if wish to include
//a timestamp of creation
const Categories = ({ category }) => {
  const { id, user_username, name, created_at } = category;

  return (
    <SingleCategoryWrapper>
      <div className='title'>
        <span>
          <Link className='category' to={`/discussions/category/${id}`}>
            {name}{' '}
          </Link>
        </span>
      </div>
      <div className='nameanddate'>
        <span>Created By: {user_username}</span>
      </div>
      <div className='timestamp'>
        <span>Created: {moment(new Date(Number(created_at))).fromNow()}</span>
      </div>
    </SingleCategoryWrapper>
  );
};

export default Categories;
