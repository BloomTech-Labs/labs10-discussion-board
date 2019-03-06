import React from 'react';
import styled from 'styled-components';
import { Nav } from '../components/index.js';
import Lambda from '../assets/img/Lambda.png';

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  height: 60px;
  width: 100%;
  z-index: 9000;
  align-self: center;
  background-color: white;
  border-bottom: 2px solid ${props => props.theme.borderColor};

  @media(max-width: 750px){
    width: 100%;
    @media (max-width: 450px){
      width: 100%;

    }
  }
`;

const Container = styled.div`
 width: 90%;
 display: flex;
 justify-content: space-between;

  .LogoContainer {
    display: flex;
    align-items: center;
    border-right: 2px solid ${props => props.theme.borderColor};
    padding-right: 100px;
      &:hover {
        cursor: pointer;
      }

  @media(max-width: 750px){
    padding-right: 50px;
  }
    @media (max-width: 450px){
      padding-right: 15px;

    }
  }
`;

const LambdaLogo = styled.div`
  width: 130px;
  height: 50px;
  background-image: url(${Lambda});
    &:hover {
      cursor: pointer;
    }
`;

const Header = ({ showSearch, scrollTo, pathname, goTo, isDay, history, isAuthenticated, toggleSearch, switched }) => {
  return (
    <StyledHeader>
      <Container>
        <a className = 'LogoContainer' href = '/home'>
          <LambdaLogo/>
        </a>
        <Nav showSearch = {showSearch} 
             scrollTo = {scrollTo} 
             pathname = {pathname} 
             goTo = {goTo} 
             isDay = {isDay} 
             history = {history} 
             isAuthenticated = {isAuthenticated} 
             toggleSearch = {toggleSearch} 
             switchTheme = {switched}
             />
      </Container>
    </StyledHeader >
  );
};

export default Header;
