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
  width: 45%;
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

const DivAuth = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35%;
  height: 100%;

  @media ${tabletP}{
    width: 25%;
  }

  @media ${phoneL}{
    width: 40%;
    display: flex;
    justify-content: space-between;
  }

  i {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;

  @media ${tabletP}{
    width: 40%;
    }
    
    @media ${phoneL}{
      margin-left: 10px;
      width: 45%;
    }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Nav extends Component {
  render() {
    return (
      <DivWrapper>
        <SearchContainer>
          <Search showSearch = {this.props.showSearch} scrollTo={this.props.scrollTo} pathname={this.props.pathname} goTo={this.props.goTo} toggleSearch={this.props.toggleSearch}  />
        </SearchContainer>
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