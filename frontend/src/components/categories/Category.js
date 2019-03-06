import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivRow = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  &:not(:last-child) {
    border-bottom: 1px solid black;
  }

  .link {
    color: black;
  }

  &:hover .link {
    color: white;
  }
`;

const ImgBook = styled.img`
  display: block;
  margin: 15px;
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
`;

const DivCategory = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const LinkCategory = styled(Link)`
  display: inline-block;
  align-self: flex-start;
  text-decoration: none;
  font-weight: bold;
  padding: 7px 15px 10px 0;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DivCategoryInfo = styled.div`
  display: flex;
  flex-direction: row;

  p {
    font-size: 11px;
    color: black;
    margin: 0 0 15px 0;

    &:not(:last-child) {
      margin-right: 15px;
    }

    span {
      font-weight: bold;
    }
  }
`;

const DivRowInfo = styled.div`
  width: 37%;
`;

const H5CreatedAt = styled.h5`
  font-weight: bold;
`;

const LinkSuperModerator = styled(Link)`
  display: inline-block;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  color: black;
  padding: 15px;
  margin-left: -15px;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Category = ({ category }) => {
  const { id, user_username, name, created_at, user_id, discussion_count } = category;
  return (
    <DivRow>
      <ImgBook
        src={require('../../assets/img/CategoryBook2.png')}
        alt='Emoji'
      />
      <DivCategory>
        <LinkCategory className='link' to={`/discussions/category/${id}`}>{name}</LinkCategory>
        <DivCategoryInfo>
          <p><span>Discussions:</span> {discussion_count}</p>
          <p><span>Posts:</span> #############</p>
          <p><span>Latest:</span> Username, Date</p>
        </DivCategoryInfo>
      </DivCategory>
      <DivRowInfo>
        <H5CreatedAt>{moment(new Date(Number(created_at))).fromNow()}</H5CreatedAt>
      </DivRowInfo>
      <DivRowInfo>
        <LinkSuperModerator to={`/profile/${user_id}`}>{user_username}</LinkSuperModerator>
      </DivRowInfo>
    </DivRow>
  );
}

export default Category;