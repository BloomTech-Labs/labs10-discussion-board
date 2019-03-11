import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Globals
import { tabletL } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const DivCategoryContainer = styled.div`
  display: flex;
  width: 450px;

  @media (max-width: 1024px) {
    width: 310px;
  }

  
  @media (max-width: 775px) {
    width: 100%;
  }
`;

const DivCategory = styled.div`
  display: flex;
  flex-direction: column;
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

  @media ${tabletL} {
    display: none;
  }
`;

const DivRowInfo = styled.div``;

const H5CreatedAt = styled.h5`
  font-weight: bold;

  @media (max-width: 878px) {
    display: none;
  }
`;

const LinkSuperModerator = styled(Link)`
  display: inline-block;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  color: black;
  width: 290px;

  &:hover {
    color: white;
    text-decoration: underline;
  }

  
  @media (max-width: 775px) {
    display: none;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Category = ({ category }) => {
  const { id, user_username, name, created_at, user_id, discussion_count } = category;
  return (
    <DivRow>
      <DivCategoryContainer>
        <ImgBook src={require('../../assets/img/CategoryBook2.png')} alt='Emoji' />
        <DivCategory>
          <LinkCategory className='link' to={`/discussions/category/${id}`}>{name}</LinkCategory>
          <DivCategoryInfo>
            <p><span>Discussions:</span> {discussion_count}</p>
            <p><span>Posts:</span> #############</p>
            <p><span>Latest:</span> Username, Date</p>
          </DivCategoryInfo>
        </DivCategory>
      </DivCategoryContainer>
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