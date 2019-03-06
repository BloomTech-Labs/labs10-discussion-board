import React from 'react';
import styled from 'styled-components';
import { Nav } from '../components/index.js';

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
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = ({ showSearch, scrollTo, pathname, goTo, isDay, history, isAuthenticated, toggleSearch, switched }) => {
  return (
    <StyledHeader>
      <Container>
        <LogoContainer>
          <div>Lambda Logo</div>
        </LogoContainer>
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
