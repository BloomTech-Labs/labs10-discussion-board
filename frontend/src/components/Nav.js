import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DisplayUser from './DisplayUser.js';
import Auth from './Auth.js';
import { phoneL } from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  background-color: gray;
  color: white;
  height: 80px;
  margin: 0;
  padding: 7px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  justify-content: space-evenly;

  @media (max-width: 750px){
    width: 100%;
    @media (max-width: ${phoneL}){
      width: 100%;
    }
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin: 0;
  align-items: center;
  .link {
    font-weight: bold;
    text-decoration: none;
    font-size: 1.7em;
    color: white;
    :hover {
      color: black;
    }
  }
  @media (max-width: 960px){
    font-size: 12px;
    display: flex;
    margin: 0 auto;
    @media (max-width: ${phoneL}){
      width: 35%;
      font-size: 8px;
      display: flex;
      flex-direction: column;
    }
  }
`

const DivSearch = styled.div`
  display: flex;
  justify-content: center;
  width: 7%;
  align-items: center;
  @media (max-width: 750px){
      width: 15%;
    @media (max-width: ${phoneL}){
      width: 20%;
    }
  }

  button {
    width: 100%;
    font-size: 14px;
    border-radius: 7px;
    &:hover {
      cursor: pointer;
      background-color: #54bdff;
    }
    @media (max-width: 750px){
      width: 80%;
    }
    @media (max-width: ${phoneL}){
      width: 80%;
    }
  }

`;

const DivAuth = styled.div`
  display: flex;
  width: 38%;
  height: 100%;

  @media (max-width: 750px){
      width: 25%;
    @media (max-width: ${phoneL}){
      width: 40%;
    }
  }
`;


const ButtonContainer = styled.div`
display: flex;
justify-content: center;
width: 15%;
align-items: center;
@media (max-width: 750px){
    width: 100%;
  @media (max-width: 450px){
    width: 100%;
  }
}

button {
  width: 100%;
  font-size: 14px;
  border-radius: 7px;
  &:hover {
    cursor: pointer;
    background-color: #54bdff;
  }
  @media (max-width: 750px){
    width: 80%;
  }
  @media (max-width: 450px){
    width: 80%;
  }
}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DivWrapper>
        <DivSearch>
          <button onClick={this.props.toggleSearch}>search</button>
        </DivSearch>
        <Links>
          <Link className='link' to='/home'>
            Home
          </Link>
          <Link className='link' to='/home'>
            Top Discussions
          </Link>
          <Link className='link' to='/categories'>
            Categories
          </Link>
        </Links>
        <DivAuth>
          <ButtonContainer><button onClick={this.props.switchTheme}>switch theme</button></ButtonContainer>
        
          {(this.props.isLoggedIn) ? (
            <DisplayUser history={this.props.history} />
            
          ) : (
              <Auth history={this.props.history} />
            )}
        </DivAuth>
      </DivWrapper>
    );
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.users.isLoggedIn
  };
};

export default connect(mapStateToProps, {})(Nav);