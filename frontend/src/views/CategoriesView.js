import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CategoriesList } from '../components/index.js';

const CategoriesWrapper = styled.div`
  width: 90%;
  background-color: #e8e3e0; 

  .header {
    text-align: center;
    margin-bottom: 10px;
  }
  hr {
    border-color: black;
    margin-bottom: 5px;
  }
  .link {
    font-weight: bold;
    width: 5%;
    font-size: 40px;
    display: flex;
    margin: 20px 0 0 20px;
    align-items: center;
    text-decoration: none;
    color: black;
    &:hover {
      cursor: pointer;
      color: black;
      text-decoration: underline;
    }
  }
`;

const CategoriesView = () => {
  return (
    <CategoriesWrapper>
      <div className='header'>
        <Link className='link c-link' to='/profiles'>
          Profiles
        </Link>
        <h1> Categories (designs coming soon)</h1>
      </div>
      <hr />
      <CategoriesList />
    </CategoriesWrapper>
  );
};

export default CategoriesView;
