import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// actions
import { getCategories } from '../store/actions/index.js';

// globals
import { phoneP, tabletP, tabletL } from '../globals/globals';

// components
import { AddCategoryForm, Categories, CategoriesNav } from '../components/index.js';

const CategoriesWrapper = styled.div`
  width: 1024px;
`;

const H1Categories = styled.h1`
  user-select: none;
  width: 100%;
  text-align: center;
`;

const DivCategoriesComponent = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  background: rgba(84, 189, 255, 0.3);
  border-radius: 10px;
`;



class CategoriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      order: 'name', // possible values: 'name', 'discussion_count', 'created_at'
      orderType: '', // possible values: 'asc', 'desc'
    };
  }

  componentDidMount = () => this.props.getCategories(this.state.order, this.state.orderType);

  toggleAddForm = () => this.setState({ showAddForm: !this.state.showAddForm });

  sortHandler = ev => {
    ev.preventDefault();
    return Promise.resolve(this.setState({ [ev.target.name]: ev.target.value })).then(() => {
      this.props.getCategories(this.state.order, this.state.orderType);
    });
  }

  render() {
    const { showAddForm } = this.state;
    const { history, user_id } = this.props;
    return (
      <CategoriesWrapper>
        <H1Categories className='cat-header'>Categories</H1Categories>
        {user_id && showAddForm ? (
          <AddCategoryForm
            toggleAddForm={this.toggleAddForm}
            historyPush={history.push}
          />
        ) : (
            <DivCategoriesComponent>
              <CategoriesNav
                toggleAddForm={this.toggleAddForm}
                sortHandler={this.sortHandler}
                order={this.order}
                orderType={this.orderType}
              />
              <Categories categories={this.props.categories} />
            </DivCategoriesComponent>
          )}
      </CategoriesWrapper>
    );
  }
}
// <CategoriesList />
const mapStateToProps = state => ({
  user_id: state.users.user_id,
  categories: state.categories.categories,
});

export default connect(
  mapStateToProps,
  { getCategories }
)(CategoriesView);
