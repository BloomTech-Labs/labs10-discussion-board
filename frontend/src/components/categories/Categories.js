import React from 'react';
import styled from 'styled-components';

import { Category } from '../index.js'

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivCategories = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivCategoryListTitles = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  margin: 0;
  background: rgba(84, 189, 255, 0.9);

  h2 {
    margin: 5px 0;

    &:first-child {
      width: 75%;
      padding-left: 78px;
    }

    &:nth-child(2) {
      width: 37%;
    }

    &:last-child {
      width: 37%;
    }
  }
`;

const DivCategoryRows = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(84, 189, 255, 0.4);
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Categories = ({ categories }) => {
  return (
    <DivCategories>
      <DivCategoryListTitles>
        <h2>Category</h2>
        <h2>Created&nbsp;At</h2>
        <h2>Super&nbsp;Moderator</h2>
      </DivCategoryListTitles>
      <DivCategoryRows>
        {
          categories.map((category, index) =>
            <Category
              key={index}
              category={category}
            />)
        }
      </DivCategoryRows>
    </DivCategories>
  );
}

export default Categories;