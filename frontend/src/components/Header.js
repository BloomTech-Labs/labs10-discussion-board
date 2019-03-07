import React from 'react';
import styled from 'styled-components';
import { Nav } from '../components/index.js';
import Lambda from '../assets/img/Lambda.png';

// Globals
import { topHeaderHeight, phoneP, phoneL, tabletP, tabletL } from '../globals/globals.js';

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  height: ${topHeaderHeight};
  width: 100%;
  z-index: 9000;
  align-self: center;
  background-color: white;
  border-bottom: 2px solid ${props => props.theme.borderColor};

  @media ${tabletL}{
    width: 100%;
  }
  @media ${phoneL} {
      width: 100%;
  }

  .LogoContainer {
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid ${props => props.theme.borderColor};
      &:hover {
        cursor: pointer;
      }
  }
`;

const NavContainer = styled.div`
 width: 60%;
 display: flex;
 justify-content: center;

 @media ${tabletL}{
    width: 60%;
  }
  @media ${phoneL} {
      width: 60%;
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
      <a className = 'LogoContainer' href = '/home'>
          <LambdaLogo/>
        </a>
      <NavContainer>
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
      </NavContainer>
    </StyledHeader >
  );
};

export default Header;
