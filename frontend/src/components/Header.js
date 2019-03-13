import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Nav } from '../components/index.js';
import Symp from '../assets/img/symposium6.png';

// Globals
import { sideNavWidth, topHeaderHeight, phoneP, phoneL, tabletP, tabletL } from '../globals/globals.js';

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  height: ${topHeaderHeight};
  width: 100%;
  z-index: 9000;
  align-self: center;
  background-color: ${props => props.theme.headerBg};;
  border-bottom: 2px solid ${props => props.theme.borderColor};

  @media ${tabletL}{
    width: 100%;
  }
  @media ${tabletP}{
    width: 100%;
  }
  @media ${phoneL} {
    width: 100%;
  }
  @media ${phoneP}{
    width: 100%;
  }

  .LogoContainer {
    width: ${ sideNavWidth };
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-right: 2px solid ${props => props.theme.borderColor};
      &:hover {
        cursor: pointer;
      }

      @media ${phoneL} {
        width: 35%;
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

const SympLogo = styled.div`
  width: 150px;
  height: 50px;
  background-image: url(${Symp});
    &:hover {
      cursor: pointer;
    }
`;

const Header = ({ showSearch, scrollTo, pathname, goTo, isDay, history, isAuthenticated, toggleSearch, switched, isLoginDropdownModalRaised, setLoginDropdownModalRaised, isAvatarModalRaised, setAvatarModalRaised, isNotificationsModalRaised, setNotificationsModalRaised }) => {
  return (
    <StyledHeader>
      <Link className='LogoContainer' to='/home'><SympLogo /></Link>
      <NavContainer>
        <Nav showSearch={showSearch}
          scrollTo={scrollTo}
          pathname={pathname}
          goTo={goTo}
          isDay={isDay}
          history={history}
          isAuthenticated={isAuthenticated}
          toggleSearch={toggleSearch}
          switchTheme={switched}
          isLoginDropdownModalRaised={isLoginDropdownModalRaised}
          setLoginDropdownModalRaised={setLoginDropdownModalRaised}
          isAvatarModalRaised={isAvatarModalRaised}
          setAvatarModalRaised={setAvatarModalRaised}
          isNotificationsModalRaised={isNotificationsModalRaised}
          setNotificationsModalRaised={setNotificationsModalRaised}
        />
      </NavContainer>
    </StyledHeader >
  );
};

export default Header;
