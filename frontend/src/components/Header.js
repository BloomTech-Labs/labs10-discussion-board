import React from 'react';
import styled from 'styled-components';
import { Nav } from '../components/index.js';

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 90px;
  width: 100%;
  z-index: 9000;
  @media(max-width: 750px){
    width: 100%;
    @media (max-width: 450px){
      width: 100%;

    }
  }
`;

const Navi = styled.div`
  @media (max-width: 768px){
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    margin-bottom: 1em;
    @media (max-width: 450px){
      width: 100%;
    }
  }
`

const Header = ({ history, isAuthenticated, toggleSearch, switched }) => {
  return (
    <StyledHeader>
      <Navi>
        <Nav history={history} isAuthenticated={isAuthenticated} toggleSearch={toggleSearch} switchTheme={switched}/>
      </Navi>
    </StyledHeader >
  );

};

export default Header;