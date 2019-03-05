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
  background-color: #54BDFF;
  margin-top: 100px;
  width: 150px;
  background: #3a77bd;
  border-radius: 10px;
  padding: 20px 0;
`;

const LinkItem = styled(Link)`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  width: 100%;
  text-decoration: none;
  color: white;
  width: 100%;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: #3a77bd;
    background-color: white;
  }
`;

const Item = styled.a`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  width: 100%;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: #3a77bd;
    background-color: white;
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