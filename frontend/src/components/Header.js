import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import meeting from '../assets/img/meeting.png';
import meeting2 from '../assets/img/meeting2.png';
import { Nav } from '../components/index.js';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 90%;

  @media(max-width: 768px){
    display: flex;
    flex-direction: column;
    width: 90%;

    @media (max-width: 450px){
    }
  }

  .link {
    font-size: 18px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;

    &:hover {
      cursor: pointer;
      color: black;
    }
  }
`;

const SymNav = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px){
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  @media (max-width: 450px){
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: auto;
  }
`;

const LogoContainer = styled.div`
  width: 185px;
  height: 185px;
    @media (max-width: 768px){
    display: none;
    
    }
    @media (max-width: 450px){
    display: none;
    }

`;

const Logo = styled.div`
  width: 100%;
  height: 185px;
  background-image: url(${meeting});
  background-repeat: no-repeat;
    &:hover {
      background-image: url(${meeting2});
      cursor: wait;
    }
`;

const Title = styled.div`
  color: white;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;  
  font-size: 70px;

  @media (max-width: 768px){
    display: flex;
    flex-direction: column;
    width: 90%

  }
  @media (max-width: 450px){
        text-align: center;
        padding-bottom: 12px;
      }
    a {
      color: #f7f5f3;
      text-decoration: none;
      &:hover {
        color: black;
      }
    }
    margin-bottom: -35px;
    width: 90%;  
    @media (max-width: 768px){
      width: 90%;
      @media (max-width: 450px){
        margin: 0 auto;
        font-size: 45px;
        width: 95%;
      }
    }
  .subheader { 
    color: #f7f5f3;
    font-size: 20px;
    margin: 5px 0px 25px 120px;
    @media (max-width: 768px){
      @media (max-width: 450px){
        display: none;
      }
    }
}
`;

const Navi = styled.div`

  @media (max-width: 768px){
    display: flex;
    width: 90%;
    margin: 0 auto;
    justify-content: center;
    margin-bottom: 1em;

    @media (max-width: 450px){
      width: 100%;
    }
  }
`
const Links = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-size: 12px;
  

  .link {
    font-weight: bold;
    font-size: 2em;

  }
  @media (max-width: 750px){
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    @media (max-width: 450px){
    display: flex;
    flex-direction: column;
    align-items: center;
    }
  }
`

const Header = ({ history }) => {
  return (
    <StyledHeader>
      <LogoContainer>
          <Logo />
      </LogoContainer>
      <SymNav>
        <Links>
          <Link className='link td-link' to='/home'>
            Top Discussions
          </Link>
          <Link className='link c-link' to='/categories'>
            Categories
          </Link>
          <Link className='link s-link' to='/settings'>
            Settings
          </Link>
      </Links>
        <Title>
          <Link className='header' to='/home'>Symposium</Link>
          <div className='subheader'>The discussion starts here</div>
        </Title>
      </SymNav>
      <Navi>
        <Nav history={history} />
      </Navi>
    </StyledHeader>
  );
};

export default Header;
