import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from './SearchBar.js';
import SearchOptionDropdown from './SearchOptionDrowpdown.js';
import DisplayUser from './DisplayUser.js';
import Auth from './Auth.js';

// Globals
import { NavSearchOptions } from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  background-color: gray;
  color: white;
  margin: 0;
  padding: 25px;
  border: 1px solid red;
  justify-content: space-around;
`;

const Links = styled.div`
  display: flex;
  margin: 0;
  align-items: center;
  border: 1px solid purple;

  .link {
    font-weight: bold;
    text-decoration: none;
    font-size: 2em;
    color: white;
    :hover {
      color: black;
      text-decoration: underline;
    }
    &:not(:last-child) {
    margin-right: 25px;
    }
  }
  @media (max-width: 750px){
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    @media (max-width: 450px){
    }
  }
`

const DivSearch = styled.div`
  display: flex;
  border: 1px solid red;
  width: 700px;
  align-items: center;
`;

const Welcome = styled.div`
  margin: 20px 20px 0px 0px;
  font-size: 24px;
  @media(max-width: 450px) {
    display: none;
  }

  .username {
    margin-left: 5px;
    color: ${ props => props.theme.navWelcomeUsername};
    text-decoration: none;
    &:hover {
      color: ${ props => props.theme.navWelcomeUsernameHov};
      text-decoration: underline;
    }
  }
`;

const DivAuth = styled.div`
display: flex;
width: 320px;
border: 1px solid lime;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSearchOption: NavSearchOptions[0]
    }
  }

  setSelectedSearchOption = (option) => {
    this.setState({ selectedSearchOption: option });
  }

  renderSearchOptions = () => {
    return NavSearchOptions.map((item, i) => (
      <option value={i} key={i}>
        {item}
      </option>
    ));
  };

  render() {
    return (
      <DivWrapper>
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
        <DivSearch>
          <button onClick={this.props.toggleSearch}>search</button>
        </DivSearch>
        <DivAuth>
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