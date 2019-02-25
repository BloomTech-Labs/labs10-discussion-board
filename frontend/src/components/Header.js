import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import meeting from '../assets/img/meeting.png';
import meeting2 from '../assets/img/meeting2.png';
import { Nav } from '../components/index.js';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
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
      text-decoration: underline;
      cursor: pointer;
      color: black;
    }
  }
`;

const TitleAndLogo = styled.div`
  width: 50%;
  display: flex;
  margin-right: 0px;

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

const Logo = styled.div`
  width: 185px;
  height: 185px;
  background-image: url(${meeting});
  background-repeat: no-repeat;
    &:hover {
      background-image: url(${meeting2});
      cursor: wait;
    }
`;

const Title = styled.div`
  align-self: flex-end;
  margin-left: 10px;
  color: white;
  font-size: 36px;

  @media (max-width: 768px){
    display: flex;
    flex-direction: column;
    width: 90%

  }
  h1 {
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
  }
  .subheader { 
    color: #f7f5f3;
    font-size: 14px;
    margin-left: 187px;
    @media (max-width: 768px){
      @media (max-width: 450px){
        display: flex;
        text-align: center;
        margin: 0 auto;

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
    }
  }
`;

const Header = ({ history, toggleSearch }) => {
  return (
    <StyledHeader>
      <Navi>
        <Nav history={history} />
      </Navi>
      <TitleAndLogo>
        <Logo />
        <Title>
          <h1><Link className='header' to='/home'>Symposium</Link></h1>
          <div className='subheader'>
            <h2>The discussion starts here</h2>
          </div>
        </Title>
      </TitleAndLogo>
      <Links>
        <Link className='link td-link' to='/home'>
          Top Discussions
        </Link>
        <Link className='link c-link' to='/categories'>
          Categories
        </Link>
        <button onClick = { toggleSearch }>Search</button>
      </Links>
    </StyledHeader>
  );
};

export default Header;
