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

const DivHeader = styled.div``;

const DivCatFollowList = styled.div``;

const H4AllCategories = styled.h4`

  i {
    font-size: 16px;
  }
`;

const SpanExpandCollapse = styled.span``;

const DivWindows = styled.div``;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class SideNav extends Component {
  componentDidMount = () => this.props.getCategoriesFollowed();

  render() {
    return (
      <DivSideNav>
        <DivHeader></DivHeader>
        <DivCatFollowList>
          <H4AllCategories>
            <SpanExpandCollapse><img src='' alt='' /></SpanExpandCollapse>
            <DivWindows>
              <div />
              <div />
              <div />
              <div />
            </DivWindows>
            <Link to='/home'>All Posts</Link>
          </H4AllCategories>
          <ul>
            {this.props.categoriesFollowed.map((category, index) => (
              <li key={index}><i className={category.icon} /><Link to={`/discussions/category/${category.id}`}>{category.name}</Link></li>
            ))}
          </ul>
        </DivCatFollowList>
      </DivSideNav>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.users.user_id,
  categoriesFollowed: state.categories.categoriesFollowed,
});

export default connect(
  mapStateToProps,
  { getCategoriesFollowed }
)(SideNav);