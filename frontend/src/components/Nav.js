import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DisplayUser from './DisplayUser.js';
import Auth from './Auth.js';

//globals
import { phoneP, phoneL, tabletP } from '../globals/globals.js';

// components
import { Search } from './index.js';

/***************************************************************************************************
 *********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  width: 35%;
  display: flex;
  color: black;
  justify-content: space-between;

  @media ${tabletP}{
    width: 75%;
    
    @media ${phoneL}{
      width: 75%;
    }
  }
`;

// const Links = styled.div`
//   display: flex;
//   justify-content: space-around;
//   width: 50%;
//   margin: 0;
//   align-items: center;

//   .link {
//     font-weight: bold;
//     text-decoration: none;
//     font-size: 1.7em;
//     color: black;
//     :hover {
//       color: black;
//     }

//     @media ${phoneL}{
//       width: 100%;
//       display: flex;
//       justify-content: flex-start;
//     }
//   }

//   @media (max-width: 960px){
//     font-size: 12px;
//     display: flex;
//     margin: 0 px;

//     @media ${phoneL}{
//       width: 25%;
//       font-size: 8px;
//       display: flex;
//       flex-direction: column;
//     }
//   }
// `;

const DivAuth = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35%;
  height: 100%;

  @media ${tabletP}{
    width: 25%;
  }

  @media ${phoneL}{
    width: 35%;
    display: flex;
    justify-content: flex-end;
  }

  i {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;

  @media ${tabletP}{
    width: 25%;
    }
    
    @media ${phoneL}{
      width: 25%;
    }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Nav extends Component {
  render() {
    return (
      <DivWrapper>
        {/* <Links>
          <Link className='link' to='/'>
            Hot Discussions
          </Link>
          <Link className='link' to='/home'>
            Top Discussions
          </Link>
          <Link className='link' to='/categories'>
            Categories
          </Link>
        </Links> */}
        <ButtonContainer>
          <Search showSearch = {this.props.showSearch} scrollTo={this.props.scrollTo} pathname={this.props.pathname} goTo={this.props.goTo} toggleSearch={this.props.toggleSearch}  />
        </ButtonContainer>
        <DivAuth>{this.props.isDay ?
          <i onClick = {this.props.switchTheme} className = 'fas fa-sun' /> :
          <i onClick = {this.props.switchTheme} className = 'fas fa-moon' />
        }
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