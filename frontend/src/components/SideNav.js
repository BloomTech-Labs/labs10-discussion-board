import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import { getCategoriesFollowed } from '../store/actions/index.js';

// globals
import { phoneL, accountUserTypes, addCatPermStartIndex } from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivSideNav = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select:none;
  overflow-y: auto;
  height: calc(100% - 170px);
  min-height: 10%;

  @media(max-width: 800px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const DivHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .fa-plus-circle {
    font-size: 21px;
    cursor: pointer;
    padding: 10px;
    color: #418DCF;
    margin: 10px;

    &:hover {
      color: #aaa;
    }

    @media(max-width: 800px) {
      align-self: flex-start;
      margin: 0;
      padding: 0;
      position: absolute;
      top: 29px;
      left: 17px;
    }
  }

  @media(max-width: 800px) {
    flex-direction: column-reverse;
    margin: 0 20px 20px 20px;
    position: relative;
  }
`;

const H4BrowseCategories = styled.h4`
    width: 95%;
    border-left: ${props => props.islinkselected === 'true' ? '1px solid #418DCF' : '1px solid transparent'};

    @media(max-width: 800px) {
      display: flex;
      width: auto;
      border: none;
      margin: 0 20px;
      margin-top: 18px;
      margin-left: 60px;
      margin-right: 0px;
    }
`;



const LinkBrowseCategories = styled(Link)`
  text-decoration: none;
  color: ${props => props.islinkselected === 'true' ? '#418DCF' : 'black'};
  font-weight: normal;

  i {
    cursor: pointer;
    padding: 10px 8px 10px 0;
    color: inherit;
    margin-left: 12px;

    @media(max-width: 800px) {
      padding: 10px 8px 6px 0;
      margin: 0;
    }
  }

  &:hover {
    color: blue;
  }

  @media(max-width: 800px) {
    display: flex;
    align-items: center;
    padding: 4px 10px;
    border: ${props => props.islinkselected === 'true' ? '1px solid #418DCF' : '1px solid #aaa'};
    color: ${props => props.islinkselected === 'true' ? '#418DCF' : '#aaa'};
    border-radius: 10px;

    &:hover {
      border: 1px solid #418DCF;
    }
  }
`;

const DivCategoriesFollowed = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    padding-top: 8px;
    margin-left: -10px;
  }
`;

const DivCatFollowItems = styled.div`
  ul {
    list-style: none;
    padding-left: 0;

    @media(max-width: 800px) {
      display: flex;
      margin: 0 20px 0 0;
    }

    @media ${phoneL} {
      margin: 0 10px 0 0;
    }
  }

  @media(max-width: 800px) {
    display: flex;
  }

  @media ${phoneL} {
    margin-top: -15px;
  }
`;

const H4AllPosts = styled.h4`
  display: flex;
  align-items: center;
  border-left: ${props => props.islinkselected === 'true' ? '1px solid #418DCF' : '1px solid transparent'};

  i {
    cursor: pointer;
    font-size: 21px;
    color: black;
    padding: 0 7px 2px 10px;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }

    @media(max-width: 800px) {
      display: none;
    }
  }

  @media(max-width: 800px) {
    border: none;
    margin-right: 0px;
    padding: 10px;
    margin: 0;
    padding-right: 0;
  }
`;

const LinkAllPosts = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${props => props.islinkselected === 'true' ? '#418DCF' : 'black'};
  font-weight: normal;

  &:hover {
    color: #418DCF;

    .div-window {
      background-color: #418DCF;
    }
  }

  .div-window {
    background-color: ${props => props.islinkselected === 'true' ? '#418DCF' : 'black'};

    @media(max-width: 800px) {
      background-color: ${props => props.islinkselected === 'true' ? '#418DCF' : '#aaa'};
    }
  }

  @media(max-width: 800px) {
    color: ${props => props.islinkselected === 'true' ? '#418DCF' : '#aaa'};
    border: ${props => props.islinkselected === 'true' ? '1px solid #418DCF' : '1px solid #aaa'};
    border-radius: 10px;
    padding: 5px 10px;
    margin-right: 20px;
    height: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    &:hover {
      border: 1px solid #418DCF;
    }
  }
`;

const DivWindows = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
  margin: 0 6px;
  background-color: inherit;
  width: 18px;
  height: 18px;
  padding-top: 1.8px;
  margin-left: 21px;
  margin-right: 11px;
  margin-bottom: 6px;
  @media (max-width: 800px) {
    margin-left: 0px;
    justify-content: center
    align-items: center
  }
  div {
    background-color: black;
    border-radius: 2px;
    width: 43%;
    height: 40%;
  }

  // @media ${phoneL} {
  //   width: 10px;
  //   height: 10px;
  //   padding-top: 5px;

  //   div {
  //     border-radius: 1.5px;
  //     width: 42%;
  //     height: 32%;
  //   }
  // }
`;

const PNoCatFollowMessage = styled.p`
  display: ${props => props.isfollowedcatsopen === 'true' ? 'flex' : 'none'};
  margin: 0 0 0 60px;
  width: 180px;
  height: 50px;
  color: red;
  justify-content: center;

  @media(max-width: 800px) {
    margin: 20px 0 0 60px;
  }
`;

const LiCategoryFollowed = styled.li`
  display: ${props => props.isfollowedcatsopen === 'true' ? 'list-item' : 'none'};
  padding-left: 42px;
  border-left: ${props => props.islinkselected === 'true' ? '5px solid blue' : '5px solid transparent'};
  list-style-position: inside;
  &::before{
    background-color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};
    font-weight: bold;
    display: inline-block; 
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 16px;
    margin-bottom: 3px;

    @media(max-width: 800px) {
      display: none;
    }
  }

  @media(max-width: 800px) {
    display: flex;
    margin: 0;
    padding: 0;
    border: none;
    align-items: center;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const LinkSideNav = styled(Link)`
  text-decoration: none;
  color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};

  span {
    width: 46px;
    display: inline-block;
    text-align: center;
    i {
      cursor: pointer;
      padding: 10px 10px 10px 0;
      color: inherit;
      margin-left: 15px;

      @media(max-width: 800px) {
        margin-left: 0;
      }
    }

    @media(max-width: 800px) {
      width: auto;
    }
  }

  @media(max-width: 800px) {
    display: flex;
    white-space: pre;
    justify-content: center;
    align-items: center;
    height: 38px;
    border: ${props => props.islinkselected === 'true' ? '1px solid #418DCF' : '1px solid #aaa'};
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
    color: ${props => props.islinkselected === 'true' ? 'blue' : '#aaa'};
  }

  &:hover {
    color: blue;

    @media(max-width: 800px) {
      border: 1px solid #418DCF;
    }
  }
`;



/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      linkSelected: '',
      categories: [],
      categoryFollows: [],
      isFollowedCatsOpen: true
    }
  }

  componentDidMount = () => {
    this.props.getCategoriesFollowed().then(() => {
      this.setState({ categories: this.props.categoriesFollowed, categoryFollows: this.props.categoryFollows });
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.categoryFollows !== this.props.categoryFollows) {
      this.props.getCategoriesFollowed().then(() => {
        this.setState({ categories: this.props.categoriesFollowed, categoryFollows: this.props.categoryFollows });
      });
    }
  }

  selectLink = (linkName) => {
    this.setState({ linkSelected: linkName });
  }

  toggleFollowedCats = () => {
    this.setState({ isFollowedCatsOpen: !this.state.isFollowedCatsOpen })
  }

  render() {
    const { user_type } = this.props;

    return (
      <DivSideNav>
        <DivHeader>
          <H4BrowseCategories
            islinkselected={(this.state.linkSelected === 'BrowseCategories').toString()}
          >

            <LinkBrowseCategories
              to={`/categories`}
              islinkselected={(this.state.linkSelected === 'BrowseCategories').toString()}
              onClick={() => this.selectLink('BrowseCategories')}
            ><i className="fas fa-book-open" />Browse&nbsp;Categories</LinkBrowseCategories>
          </H4BrowseCategories>
          {(accountUserTypes.indexOf(user_type) >= addCatPermStartIndex) &&
            <i className="fas fa-plus-circle" onClick={(ev) => this.props.setAddCatModalRaised(ev, true)} />
          }
        </DivHeader>
        <DivCategoriesFollowed>
          {/* <H4CategoriesFollowedTitle>Categories&nbsp;you&nbsp;follow</H4CategoriesFollowedTitle> */}
          <DivCatFollowItems>
          <H4AllPosts islinkselected={(this.state.linkSelected === 'AllPosts').toString()}>
              <i className={this.state.isFollowedCatsOpen ? "fas fa-minus-circle" : "fas fa-plus-circle"} onClick={this.toggleFollowedCats} />
              <LinkAllPosts onClick={() => this.selectLink('AllPosts')} to='/home' islinkselected={(this.state.linkSelected === 'AllPosts').toString()}>
                <DivWindows>
                  <div className='div-window' />
                  <div className='div-window' />
                  <div className='div-window' />
                  <div className='div-window' />
                </DivWindows>All&nbsp;Posts</LinkAllPosts>
          </H4AllPosts>
            <ul>
              {(this.state.categories.length === 0) ? (<PNoCatFollowMessage isfollowedcatsopen={(this.state.isFollowedCatsOpen).toString()}>You are currently not following any categories</PNoCatFollowMessage>) : (this.state.categories.map((category, index) => (
                <LiCategoryFollowed 
                  isfollowedcatsopen={(this.state.isFollowedCatsOpen).toString()} 
                  key={index} islinkselected={(this.state.linkSelected === category.name).toString()}>
                    <LinkSideNav onClick={() => this.selectLink(category.name)} 
                      islinkselected={(this.state.linkSelected === category.name).toString()} 
                      to={`/discussions/category/${category.id}`}>
                        <span>
                          <i className={category.icon} 
                            islinkselected={(this.state.linkSelected === category.name).toString()} />
                        </span>
                          {category.name}
                    </LinkSideNav>
                </LiCategoryFollowed>
              )))}
            </ul>
          </DivCatFollowItems>
        </DivCategoriesFollowed>
      </DivSideNav>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.users.user_id,
  categoryFollows: state.users.categoryFollows,
  user_type: state.users.user_type,
  categoriesFollowed: state.categories.categoriesFollowed
});

export default connect(
  mapStateToProps,
  { getCategoriesFollowed }
)(SideNav);




