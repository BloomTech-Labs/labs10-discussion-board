import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  background-color: black;
  color: white;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const LandingView = props => {
  return (
    <DivWrapper>
      <h1>This is the LandingView Component</h1>
    </DivWrapper>
  );
};

// LandingView.propTypes = {
//   propertyName: PropTypes.string
// }

export default LandingView;
