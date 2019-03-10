import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivBackgroundModal = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const DivAvatarDropdown = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 9999;
  position: absolute;
  right: 0;
  background-color: white;
  margin-top: 56px;
  width: 140px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 2px solid ${props => props.theme.borderColor};
  border-top: 2px solid white;
  padding: 10px 0;

  @media(max-width: 750px){
    height: 60px;
    width: 100px;
  }
  @media (max-width: 450px){
    padding-right: 15px;
    padding-top: 0px;
  }
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

  @media(max-width: 750px){
    font-size: 16px;
  }
  @media (max-width: 450px){
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

  @media(max-width: 750px){
    font-size: 16px;
  }
  @media (max-width: 450px){
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const AvatarDropdown = props => {
  return (
    <DivBackgroundModal onClick={() => props.toggleAvatarClicked()}>
      <DivAvatarDropdown>
        <LinkItem to={`/profile/${props.user_id}`}>Profile</LinkItem>
        <LinkItem to={`/settings/${props.user_id}`}>Settings</LinkItem>
        <Item onClick={ev => props.clickSignout(ev)}>Sign Out</Item>
      </DivAvatarDropdown>
    </DivBackgroundModal>
  );
}

// AvatarDropdown.propTypes = {
//   propertyName: PropTypes.string
// }

export default AvatarDropdown;