import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import { getCategoriesFollowed } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivSideNav = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DivHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  .fa-plus-circle {
    font-size: 21px;
    cursor: pointer;
    padding: 10px;
    color: red;
    margin-right: 10px;

    &:hover {
      color: green;
    }
  }
`;

const H4BrowseCategories = styled.h4`
    width: 95%;
    border-left: ${props => props.islinkselected === 'true' ? '5px solid blue' : '5px solid transparent'};
`;

const LinkSideNav = styled(Link)`
  text-decoration: ${props => props.islinkselected === 'true' ? 'underline' : 'none'};
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
    }
  }

  &:hover {
    color: blue;
  }
`;

const LinkBrowseCategories = styled(Link)`
  text-decoration: ${props => props.islinkselected === 'true' ? 'underline' : 'none'};
  color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};

  i {
    cursor: pointer;
    padding: 10px 8px 10px 0;
    color: inherit;
    margin-left: 12px;
  }

  &:hover {
    color: blue;
  }
`;

const DivCatFollowList = styled.div`
  ul {
    list-style: none;
    padding-left: 0;
  }
`;

const LiCategoryFollowed = styled.li`
  display: ${props => props.isfollowedcatsopen ? 'list-item' : 'none'};
  padding-left: 42px;
  border-left: ${props => props.islinkselected === 'true' ? '5px solid blue' : '5px solid transparent'};
  list-style-position: inside;
  &::before{
    content: "";
    background-color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};
    font-weight: bold;
    display: inline-block; 
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 16px;
    margin-bottom: 3px;
  }
`;

const H4AllCategories = styled.h4`
  display: flex;
  align-items: center;
  border-left: ${props => props.islinkselected === 'true' ? '5px solid blue' : '5px solid transparent'};

  i {
    cursor: pointer;
    font-size: 21px;
    color: black;
    padding: 0 7px 2px 10px;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
`;

const LinkAllPosts = styled(Link)`
  display: flex;
  text-decoration: ${props => props.islinkselected === 'true' ? 'underline' : 'none'};
  color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};

  &:hover {
    color: blue;
    .div-window {
      background-color:blue;
    }
  }

  .div-window {
    background-color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};
  }
`;

const DivWindows = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
  margin: 0 6px;
  background-color: inherit;
  width: 20px;
  height: 20px;
  padding-top: 1.8px;

  div {
    background-color: black;
    border-radius: 2px;
    width: 43%;
    height: 40%;
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
    if (prevProps.categoryFollows != this.props.categoryFollows) {
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
            ><i className="fas fa-book-open" />Browse Categories</LinkBrowseCategories>
          </H4BrowseCategories>
          <i className="fas fa-plus-circle" onClick={(ev) => this.props.setAddCatModalRaised(ev, true)} />
        </DivHeader>
        <DivCatFollowList>
          <H4AllCategories islinkselected={(this.state.linkSelected === 'AllPosts').toString()}>
            <i className={this.state.isFollowedCatsOpen ? "fas fa-minus-circle" : "fas fa-plus-circle"} onClick={this.toggleFollowedCats} />
            <LinkAllPosts onClick={() => this.selectLink('AllPosts')} to='/home' islinkselected={(this.state.linkSelected === 'AllPosts').toString()}>
              <DivWindows>
                <div className='div-window' />
                <div className='div-window' />
                <div className='div-window' />
                <div className='div-window' />
              </DivWindows>All Posts</LinkAllPosts>
          </H4AllCategories>
          <ul>
            {this.state.categories.map((category, index) => (
              <LiCategoryFollowed isfollowedcatsopen={(this.state.isFollowedCatsOpen).toString()} key={index} islinkselected={(this.state.linkSelected === category.name).toString()}><LinkSideNav onClick={() => this.selectLink(category.name)} islinkselected={(this.state.linkSelected === category.name).toString()} to={`/discussions/category/${category.id}`}><span><i className={category.icon} islinkselected={(this.state.linkSelected === category.name).toString()} /></span>{category.name}</LinkSideNav></LiCategoryFollowed>
            ))}
          </ul>
        </DivCatFollowList>
      </DivSideNav>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.users.user_id,
  categoryFollows: state.users.categoryFollows,
  categoriesFollowed: state.categories.categoriesFollowed
});

export default connect(
  mapStateToProps,
  { getCategoriesFollowed }
)(SideNav);