import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import meeting from '../assets/img/meeting.png';
import meeting2 from '../assets/img/meeting2.png';


const TitleAndLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 570px){
    width: 100%;
  }
  @media (max-width: 450px){
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
    @media (max-width: 570px){
        width: 100%;
        display: flex;
        justify-content: center;
    }
    @media (max-width: 450px){
    width: 90%;
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
    @media (max-width: 570px){
    }

    @media (max-width: 475px){
    background-size: stretch;
    width: 35%;
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
  @media (max-width: 570px){
    width: 60%;
    display: flex;
    font-size: 26px;
    flex-direction: column;
    margin-left: 0px;
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
    @media (max-width: 570px){
      width: 75%;
      @media (max-width: 470px){
        margin-left: 0px;
        margin: 0 auto;
        font-size: 44px;
        width: 95%;
      }
    }
  }
  .subheader { 
    color: ${props => props.theme.headerTitleSubheaderColor};
    font-size: 14px;
    margin-left: 187px;
    @media (max-width: 700px){
      margin-top: 22px;
    }
    @media (max-width: 620px){
      margin-left: 20px;
      margin-top: 35px;
    }
      @media (max-width: 470px){
        display: flex;
        text-align: center;
        margin: 0px;
        font-size: 12px;
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