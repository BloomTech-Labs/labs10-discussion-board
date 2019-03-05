import React from 'react';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px;
`;

const DivSort = styled.div`
  display: flex;
  align-items: center;
`;

const H3SortLabel = styled.h3``;

const DivButtons = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ButtonAddCategory = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0, 200, 0);
  height: 45px;
  width: 170px;
  border-radius: 10px;
  outline: none;
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
`;

const SelectSortDropdown = styled.select`
  background-color: white;
  border: thin solid blue;
  border-radius: 5px;
  display: inline-block;
  font-size: 18px;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;
  outline: none;
  width: 190px;
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
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const CategoriesNav = ({ toggleAddForm, sortHandler, order, orderType }) => {
  return (
    <DivNav>
      <DivSort>
        <H3SortLabel>Sort By:</H3SortLabel>
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
        <ButtonAddCategory onClick={toggleAddForm}>
          Add Category
        </ButtonAddCategory>
      </DivButtons>
    </DivNav>
  );
};

// CategoriesNav.propTypes = {
//   propertyName: PropTypes.string
// }

export default CategoriesNav;
