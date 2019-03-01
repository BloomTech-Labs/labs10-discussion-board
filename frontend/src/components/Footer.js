import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//globals
import { phoneP, phoneL, tabletP } from '../globals/globals.js'

/***************************************************************************************************
 *********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  width: 100%;
  display: flex;
  display: flex-direction;
  background-color: gray;
  color: white;
  margin: 0;
  padding: 7px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  justify-content: space-evenly;

  @media ${tabletP}{
    width: 100%;
    
    @media ${phoneL}{
      width: 100%;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;

  @media ${tabletP}{
    width: 18%;
    }
    
    @media ${phoneL}{
      width: 25%;
    }

  button {
  width: 100%;
  font-size: 14px;
  border-radius: 7px;
  margin-top: 12px;

  &:hover {
    cursor: pointer;
    background-color: #54bdff;
  }

  @media ${tabletP}{
    width: 80%;
  }
}
  `;

const FooterContents = styled.div`
    display: inline;
    margin: 0 auto;
    border: 1px solid black;

    i {
        font-size: 11px;
    }
`

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Footer = ({toggleSearch, switchTheme}) => {
    return (
      <DivWrapper>
        <ButtonContainer>
          <button onClick={toggleSearch}>search</button>
          <button onClick={switchTheme}>switch theme</button>
        </ButtonContainer>
        <FooterContents>
            <p><i className="far fa-copyright"></i> 2019 <Link to='/'>Symposium Inc</Link>. All Rights Reserved.</p>
        </FooterContents>
      </DivWrapper>
    );
  
}

export default Footer;