import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 9999;
  position: absolute;
  background-color: white;
  margin-top: 56px;
  width: 140px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 2px solid ${props => props.theme.borderColor};
  border-top: 2px solid white;
  padding: 10px 0;
`;

const LinkItem = styled(Link)`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  width: 100%;
  text-decoration: none;
  color: black;
  width: 100%;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: black;
    background-color: ${props => props.theme.borderColor};
  }
`;

const Item = styled.a`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  width: 100%;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: black;
    background-color: ${props => props.theme.borderColor};
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const AvatarDropdown = props => {
  return (
    <DivWrapper>
      <LinkItem to={`/profile/${props.user_id}`}>Profile</LinkItem>
      <LinkItem to={`/settings/${props.user_id}`}>Settings</LinkItem>
      <Item onClick={ev => props.clickSignout(ev)}>Sign Out</Item>
    </DivWrapper>
  );
}

// AvatarDropdown.propTypes = {
//   propertyName: PropTypes.string
// }

export default AvatarDropdown;