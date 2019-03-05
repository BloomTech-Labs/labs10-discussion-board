import React from 'react';
import styled from 'styled-components';
import { Nav } from '../components/index.js';

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  height: 80px;
  width: 100%;
  z-index: 9000;
  align-self: center;
  background-color: white;
  border-bottom: 5px solid ${props => props.theme.borderColor};

  @media(max-width: 750px){
    width: 100%;
    @media (max-width: 450px){
      width: 100%;

    }
  }
`;

const Container = styled.div`
 width: 97%;
 display: flex;
 justify-content: space-between;
`


const Header = ({ showSearch, scrollTo, pathname, goTo, isDay, history, isAuthenticated, toggleSearch, switched }) => {
  return (
    <StyledHeader>
      <Container>
      <div>Lambda Logo</div>
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
