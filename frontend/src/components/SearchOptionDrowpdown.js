import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  color: white;
  width: 120px;
  justify-content: center;

  p {
    margin: 0;
  }
`;

const SelectBox = styled.select`
  border: thin solid blue;
  border-radius: 5px;
  width: 100%;
  height: 30px;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const SearchOptionDropdown = props => {
  return (
    <DivWrapper>
      <SelectBox>
        <option
          value={0}
          key={0}
        >
          All
        </option>
        {props.renderSearchOptions()}
      </SelectBox>
    </DivWrapper>
  );
}

// SearchOptionDropdown.propTypes = {
//   propertyName: PropTypes.string
// }

export default SearchOptionDropdown;