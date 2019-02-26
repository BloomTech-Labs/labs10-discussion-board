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
  margin-top: 120px;
  width: 120px;
`;

const LinkItem = styled(Link)`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  width: 100%;
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: #54BDFF;
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
  &:hover {
    color: #54BDFF;
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