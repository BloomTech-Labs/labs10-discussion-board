import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

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
    font-size: 26px;
  }

  img {
    display: block;
    max-width: 38px;
    max-height: 38px;
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

const SpanCategory = styled.span`
  display: inline-block;
  align-self: flex-start;
  text-decoration: none;
  padding: 7px 15px 10px 0;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    color: blue;
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
      color: rgb(150,150,150);
    }

    .span-moment {
      color: black;
    }

    &:last-child {
      cursor: pointer;

      &:hover {
        color: blue;
      }
    }
  }

  @media ${tabletL} {
    display: none;
  }
`;

const DivRowInfo = styled.div``;

const H5CreatedAt = styled.h5`
  color: rgb(150,150,150);
  font-weight: normal;
  @media (max-width: 878px) {
    display: none;
  }
`;

const SpanSuperModerator = styled.span`
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  color: black;
  width: 290px;

  &:hover {
    color: blue;
  }

  
  @media (max-width: 775px) {
    display: none;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Category = ({ category, history }) => {
  const { id, user_username, name, created_at, user_id, discussion_count, post_count, latest_post_body, latest_post_created_at, latest_post_discussion_id } = category;
  const latestPostBodyElipsis = (latest_post_body) ? `${latest_post_body.slice(0, 25)}...` : 'none';
  const goToCategory = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    history.push(`/discussions/category/${id}`);
  }
  const profileSuperModerator = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    history.push(`/profile/${user_id}`);
  }
  const lastPost = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    history.push(`/discussion/${latest_post_discussion_id}`);
  }

  return (
    <DivRow onClick={() => history.push(`/discussions/category/${id}`)}>
      <DivCategoryContainer>
        <DivIcon>
          {(category.icon) ? <i className={category.icon} /> : <img src={require('../../assets/img/CategoryBook2.png')} alt='Emoji' />}
        </DivIcon>
        <DivCategory>
          <SpanCategory className='link' onClick={(ev) => goToCategory(ev)}>{name}</SpanCategory>
          <DivCategoryInfo>
            <p><span>Discussions:</span>&nbsp;{discussion_count}</p>
            {(post_count) ? <p><span>Posts:</span>&nbsp;{post_count}</p> : <p><span>Posts:</span>&nbsp;0</p>}
            {(latest_post_body) ? <p onClick={(ev) => lastPost(ev)}><span>Latest:</span>&nbsp;<span className='span-moment'>{moment(new Date(Number(latest_post_created_at))).fromNow()}</span>,&nbsp;{latestPostBodyElipsis}</p> : <p><span>Latest:</span>&nbsp;empty</p>}
          </DivCategoryInfo>
        </DivCategory>
      </DivCategoryContainer>
      <DivRowInfo>
        <H5CreatedAt>{moment(new Date(Number(created_at))).fromNow()}</H5CreatedAt>
      </DivRowInfo>
      <DivRowInfo>
        <SpanSuperModerator onClick={(ev) => profileSuperModerator(ev)}>{user_username}</SpanSuperModerator>
      </DivRowInfo>
    </DivRow>
  );
}

export default Category;