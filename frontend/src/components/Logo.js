import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import meeting from '../assets/img/meeting.png';
import meeting2 from '../assets/img/meeting2.png';
import { phoneL, tabletP } from '../globals/globals.js';


const TitleAndLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 110px;
  margin-bottom: 10px;
  @media ${tabletP}{
    
  }
  @media ${phoneL}{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`;

const TitleAndLogo = styled.div`
    display: flex;
    justify-content: center;
    @media ${phoneL}{
    width: 92%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SympLogo = styled.div`
  width: 141px;
  height: 141px;
  background-image: url(${meeting});
  background-repeat: no-repeat;
  
    &:hover {
      background-image: url(${meeting2});
      cursor: wait;
    }

    @media ${phoneL}{
    background-size: stretch;
    width: 40%;
    height: 135px;
    background-size: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Title = styled.div`
  align-self: flex-end;
  margin-left: 10px;
  color: ${props => props.theme.headerTitleColor};
  font-size: 36px;
  @media (max-width: 768px){
    display: flex;
    flex-direction: column;
    width: 70%
  }
  @media (max-width: ${phoneL}){
        margin: 0px 0px;
      }
  h1 {
    a {
      color: ${props => props.theme.headerTitleAColor};
      text-decoration: none;
      &:hover {
        color: ${props => props.theme.headerTitleAColorHov};
      }
    }
    margin-bottom: -35px;
    width: 90%;  
    @media (max-width: 768px){
      width: 90%;
      @media ${phoneL}{
        margin: 0px 0px;
        font-size: 45px;
        width: 95%;
        margin: 0 auto;
      }
      @media (max-width: 420px){
        font-size: 35px;
        margin: 0 auto;
      }
  }
}

.subheader { 
    color: ${props => props.theme.headerTitleSubheaderColor};
    font-size: 16px;
    margin-left: 187px;
    @media (max-width: 768px){
      @media ${phoneL}{
        display: flex;
        text-align: center;
        margin: 0 auto;

        @media (max-width: 420px){
        font-size: 10px;
      }
      }
    }
  }
`;

const Logo = () => {
  return (
    <TitleAndLogoContainer>
      <TitleAndLogo>
        <SympLogo />
        <Title>
          <h1><Link className='header' to='/home'>Symposium</Link></h1>
          <div className='subheader'>
            <h2>The discussion starts here</h2>
          </div>
        </Title>
      </TitleAndLogo>
    </TitleAndLogoContainer>
  );
};

export default Logo;