import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import meeting from '../assets/img/meeting.png';
import { Nav } from '../components/index.js';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 90%;
  border: 1px solid red;
  @media(max-width: 768px){
    display: flex;
    flex-direction: column;
    width: 90%
    border: 1px solid yellow
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
  display: flex;
  margin-right: 0px;
  align-self: center;
  border: 1px solid black;
  @media (max-width: 768px){
    display: flex;
    flex-drection: column;
    @media (max-width: 450px){
      width: 90%;
      display: flex;
      flex-directin: column;
      align-items: center;
      .img{
        width: 50%;
      }
    }
	}
  
`;

const Title = styled.div`
  align-self: flex-end;
  margin-left: 10px;
  color: white;
  font-size: 36px;
  border: 1px solid yellow;
  @media (max-width: 768px){
    display: flex;
    flex-direction: column;
    width: 90%
    border: 1px solid yellow
  }
  h1 {
    margin-bottom: -35px;
    width: 90%;
    
  }
  .subheader { 
    font-size: 14px;
    margin-left: 187px;
    border: 1px solid red;
}
`;

const Navi = styled.div`
  border: 1px solid purple;
  @media (max-width: 768px){
    display: flex;
    width: 90%;
    margin: 0 auto;
    @media (max-width: 450px){
    }
  }
`
const Links = styled.div`
  border: 1px solid black

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
`

const Header = ({ history }) => {
  return (
    <StyledHeader>
      <Navi>
        <Nav history={history} />
      </Navi>
      <TitleAndLogo>
        <div>
          <img src={meeting} alt='discussion' />
        </div>
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
      </Links>
    </StyledHeader>
  );
};

export default Header;
