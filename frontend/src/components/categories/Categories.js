import React from 'react';
import styled from 'styled-components';

import { Category } from '../index.js'

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivCategories = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DivCategoryListTitles = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  justify-content: space-between;

  h2 {
    margin: 5px 0;

    &:first-child {
      padding: 0 340px 0 78px;

      // @media (max-width: 1024px) {
      //   padding: 0 200px 0 78px;
      // }

      @media (max-width: 775px) {
        padding: 0 20px;
      }
    }

    &:nth-child(2) {
      @media (max-width: 878px) {
        display: none;
      }
    }

    &:last-child {
      padding: 0 98px 0 56px;
      @media (max-width: 775px) {
        display: none;
      }
    }
  }

  @media (max-width: 775px) {
    justify-content: center;
  }
`;

const DivCategoryRows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Categories = ({ categories, history }) => {
  return (
    <DivCategories>
      <DivCategoryRows>
        {
          categories.map((category, index) =>
            <Category
              key={index}
              category={category}
              history={history}
            />)
        }
      </DivCategoryRows>
    </DivCategories>
  );
}

export default Categories;