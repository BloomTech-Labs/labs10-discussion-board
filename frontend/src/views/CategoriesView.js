import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CategoriesList } from '../components/index.js';

// components
import { AddCategoryForm } from '../components/index.js';

const CategoriesWrapper = styled.div`
  width: 90%;
  background-color: #e8e3e0; 

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
    const { history } = this.props;
    return (
      <CategoriesWrapper>
        <div className='header'>
          <Link className='link c-link' to='/profiles'>
            Profiles
          </Link>
          <h1> Categories (designs coming soon)</h1>
          {
            showAddForm ?
            <AddCategoryForm
              toggleAddForm = { this.toggleAddForm }
              historyPush = { history.push }
            />
            :
            <button onClick = { this.toggleAddForm }>Add a category</button>
          }
        </div>
        <hr />
        <CategoriesList />
      </CategoriesWrapper>
    );
  }
};

export default CategoriesView;
