import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// actions
import { getCategories } from '../store/actions/index.js';

// globals
// import { phoneP, tabletP, tabletL } from '../globals/globals';

// components
import {
  Categories,
  CategoriesNav,
  // AddCategoryModal
} from '../components/index.js';

const CategoriesWrapper = styled.div`
  width: 95%;
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
      order: 'name', // possible values: 'name', 'discussion_count', 'created_at'
      orderType: '', // possible values: 'asc', 'desc'
    };
  }

  componentDidMount = () => this.props.getCategories(this.state.order, this.state.orderType);

  sortHandler = ev => {
    ev.preventDefault();
    return Promise.resolve(this.setState({ [ev.target.name]: ev.target.value })).then(() => {
      this.props.getCategories(this.state.order, this.state.orderType);
    });
  }

  render() {
    const {
      user_id,
      setAddCatModalRaised,
      // isAddCatModalRaised,
      // historyPush,
    } = this.props;
    return (
      <CategoriesWrapper>
        <H1Categories className='cat-header'>Categories</H1Categories>
        <DivCategoriesComponent>
          <CategoriesNav
            sortHandler={this.sortHandler}
            order={this.order}
            orderType={this.orderType}
            user_id={user_id}
            setAddCatModalRaised={setAddCatModalRaised}
          />
          <Categories categories={this.props.categories} />
        </DivCategoriesComponent>
      </CategoriesWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.users.user_id,
  categories: state.categories.categories,
});

export default connect(
  mapStateToProps,
  { getCategories }
)(CategoriesView);
