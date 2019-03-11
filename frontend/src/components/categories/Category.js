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

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const DivIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  margin: 15px;

  i {
    display: block;
    font-size: 42px;
  }

  img {
    display: block;
    max-width: 50px;
    max-height: 50px;
  }
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

  @media (max-width: 1024px) {
    justify-content: center;
  }
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
    color: white;
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

const SpanSuperModerator = styled.span`
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
const Category = ({ category, history }) => {
  const { id, user_username, name, created_at, user_id, discussion_count } = category;
  const avoidRowClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    history.push(`/profile/${user_id}`);
  }
  console.log('icon', category.icon);
  return (
    <DivRow onClick={() => history.push(`/discussions/category/${id}`)}>
      <DivCategoryContainer>
        {/* {src={require('../../assets/img/CategoryBook2.png')} alt='Emoji'} */}
        <DivIcon>
          {(category.icon) ? <i className={category.icon} /> : <img src={require('../../assets/img/CategoryBook2.png')} alt='Emoji' />}
        </DivIcon>
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
        <SpanSuperModerator onClick={(ev) => avoidRowClick(ev)}>{user_username}</SpanSuperModerator>
      </DivRowInfo>
    </DivRow>
  );
}

export default Category;