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

  .link {
    font-size: 20px;
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;

    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const TitleAndLogo = styled.div`
  display: flex;
  margin-right: 20px;
  align-self: center;
`;

const Title = styled.div`
  align-self: flex-end;
  margin-left: 50px;
  font-size: 40px;
  h1 {
    margin-bottom: -35px;
  }
`;

const SubHeader = styled.div`
  font-size: 15px;
  margin-left: 187px;
`;

const Header = ({ history }) => {
  return (
    <StyledHeader>
      <TitleAndLogo>
        <img src={meeting} alt='discussion' />
        <Title>
          <h1>Symposium</h1>
          <SubHeader>
            <h2>The discussion starts here</h2>
          </SubHeader>
        </Title>
      </TitleAndLogo>
      <Link className='link td-link' to='/home'>
        Top Discussions
      </Link>
      <Link className='link c-link' to='/categories'>
        Categories
      </Link>
      <Nav />
    </StyledHeader>
  );
};

export default Header;
