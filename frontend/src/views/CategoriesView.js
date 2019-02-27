import React, { Component } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CategoriesList } from '../components/index.js';
import {phoneP, tabletP, } from '../globals/globals';

// components
import { AddCategoryForm } from '../components/index.js';

const CategoriesWrapper = styled.div`
  width: 700px;
  background-color: ${props => props.theme.catViewWrapperBgColor};
  @media ${tabletP}{
    display: flex;
    flex-direction: column;
    width: 380px;
    @media${phoneP}{
      display: flex;
      flex-direction: column;
      width: 240px;
    }
  }
  .cat-header{
    color: ${props => props.theme.catViewWrapperHeaderColor};
  }
  .header {
    text-align: center;
    margin-bottom: 10px;
  }
  hr {
    border-color: black;
    margin-bottom: 5px;
  }
  .link {
    font-weight: bold;
    width: 5%;
    font-size: 40px;
    display: flex;
    margin: 20px 0 0 20px;
    align-items: center;
    text-decoration: none;
    color: black;
    &:hover {
      cursor: pointer;
      color: black;
      text-decoration: underline;
    }
  }
`;

class CategoriesView extends Component {
  state = { showAddForm: false };
  toggleAddForm = () => this.setState({ showAddForm: !this.state.showAddForm });
  render() {
    const { showAddForm } = this.state;
    const { history, user_id } = this.props;
    return (
      <CategoriesWrapper>
        <div className='header'>
          {/* <Link className='link c-link' to='/profiles'>
            Profiles
          </Link> */}
          <h1 className = 'cat-header'> Categories </h1>
          {
            user_id !== 0 &&
            (
              showAddForm ?
              <AddCategoryForm
                toggleAddForm = { this.toggleAddForm }
                historyPush = { history.push }
              /> :
              <button onClick = { this.toggleAddForm }>Add a category</button>
            )
          }
        </div>
        <hr />
        <CategoriesList />
      </CategoriesWrapper>
    );
  }
};

const mapStateToProps = state => ({
  user_id: state.users.user_id,
});

export default connect(mapStateToProps, {})(CategoriesView);
