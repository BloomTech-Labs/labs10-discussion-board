import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  background-color: black;
  color: white;
  width: 90%;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Register = props => {
  return (
    <DivWrapper>
      <h1>This is the Register Component</h1>
    </DivWrapper>
  );
};

// Register.propTypes = {
//   propertyName: PropTypes.string
// }

export default Register;
