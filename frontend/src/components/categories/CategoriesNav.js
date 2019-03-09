import React from 'react';
import styled from 'styled-components';

import { phoneL } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 10px 20px 10px;

  @media ${phoneL} {
    flex-direction: column-reverse;
    padding: 15px;
  }
`;

const DivSort = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 775px) {
    flex-direction: column;
  }

  @media ${phoneL} {
    width: auto;
  }
`;

const H3SortLabel = styled.h3``;

const DivButtons = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 775px) {
    align-items: flex-end;
  }

  @media ${phoneL} {
    width: auto;
    margin: 0;
  }
`;

const ButtonAddCategory = styled.button`
  display: ${props => props.user_id ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  background: rgb(0, 200, 0);
  border-radius: 5px;
  outline: none;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  border-top: 2px solid rgb(0, 179, 0);
  border-left: 2px solid rgb(0, 179, 0);
  border-bottom: 2px solid rgb(0, 95, 0);
  border-right: 2px solid rgb(0, 95, 0);

  &:active {
    background-color: rgb(0, 200, 0)!important;
    border-bottom: 2px solid rgb(0, 179, 0);
    border-right: 2px solid rgb(0, 179, 0);
    border-top: 2px solid rgb(0, 95, 0);
    border-left: 2px solid rgb(0, 95, 0);
  }

  &:hover {
    background-color: rgb(0, 255, 0);
  }

  @media ${phoneL} {
    width: 100%;
  }
`;

const SelectSortDropdown = styled.select`
  background-color: white;
  border: thin solid blue;
  border-radius: 5px;
  display: inline-block;
  font-size: 18px;
  line-height: 1.5em;
  padding: 0.5em 3em 0.5em 1em;
  outline: none;
  width: 180px;
  text-align-last: center;
  margin: 10px;
  box-sizing: border-box;
  appearance: none;
  cursor: pointer;
  background-image: linear-gradient(45deg, transparent 50%, black 50%),
    linear-gradient(135deg, black 50%, transparent 50%),
    linear-gradient(to right, #54bdff, #54bdff);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;

  option {
    font-size: 18px;
  }

  @media ${phoneL} {
    width: 70%;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const CategoriesNav = ({ setAddCatModalRaised, sortHandler, order, user_id }) => {

  return (
    <DivNav>
      <DivSort>
        <H3SortLabel>Sort&nbsp;By:</H3SortLabel>
        <SelectSortDropdown onChange={sortHandler} name='order'>
          <option value='name'>name</option>
          <option value='discussion_count'>discussions</option>
          <option value='created_at'>date</option>
        </SelectSortDropdown>
        <SelectSortDropdown onChange={sortHandler} name='orderType'>
          <option value='asc'>
            {
              order === 'created_at' ? 'least recent first' :
                order === 'name' ? 'alphabetical order' : 'Ascending'
            }
          </option>
          <option value='desc'>
            {
              order === 'created_at' ? 'most recent first' :
                order === 'name' ? 'reverse alphabetical order' : 'Descending'
            }
          </option>
        </SelectSortDropdown>
      </DivSort>
      <DivButtons>
        <ButtonAddCategory onClick={(ev) => setAddCatModalRaised(ev, true)} user_id={user_id}>
          Add&nbsp;Category
        </ButtonAddCategory>
      </DivButtons>
    </DivNav>
  );
};

export default CategoriesNav;
