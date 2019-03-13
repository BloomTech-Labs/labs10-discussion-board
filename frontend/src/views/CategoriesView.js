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
  // CategoriesNav,
  // AddCategoryModal
} from '../components/index.js';

const CategoriesWrapper = styled.div`
  width: 95%;
`;

// const H1Categories = styled.h1`
//   user-select: none;
//   width: 100%;
//   text-align: center;
// `;

const DivCategoriesComponent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const CategoriesHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .name-wrapper {
    display: flex;
    align-items: center;
    .name {
      font-size: 24px;
    }
  }

  @media (max-width: 910px) {
    flex-direction: column;
  }

  .filter-wrapper {
    i {
      margin-right: 5px;
      color: ${props => props.theme.discussionPostColor};
    }

    .filter {
      border: none;
      background-color: rgba(0, 0, 0, 0);
      padding: 5px;
      color: ${props => props.theme.discussionPostColor};
      &:focus {
        outline: none;
      }
    }
  
    // .add-post-btn {
    //   margin-left: 10px;
    //   padding: 10px 15px;
    //   border-radius: 5px;
    //   border: none;
    //   background-color: #418DCF;
    //   color: white;

    //   &:hover {
    //     cursor: pointer;
    //     background-color: white;
    //     color: #418DCF;
    //     border: 1px solid #418DCF;
    //   }
    // }
  }
`;

const name = 'name';
const newest = 'newest';
const oldest = 'oldest';

class CategoriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'name', // possible values: 'name', 'discussion_count', 'created_at'
      orderType: '', // possible values: 'asc', 'desc'
    };
  };

  handleSelectChange = e => {
    let order = 'created_at';
    let orderType;
    switch (e.target.value) {
      case name:
        order = 'name';
        orderType = 'asc';
        break;
      case newest:
        order = 'created_at';
        orderType = 'desc';
        break;
      case oldest:
        order = 'created_at';
        orderType = 'asc';
        break;
      default:
        break;
    };
    return this.setState({ order, orderType }, () => {
      return this.props.getCategories(this.state.order, this.state.orderType);
    });
  };
  sortHandler = ev => {
    ev.preventDefault();
    return Promise.resolve(this.setState({ [ev.target.name]: ev.target.value })).then(() => {
      this.props.getCategories(this.state.order, this.state.orderType);
    });
  };
  componentDidMount = () => this.props.getCategories(this.state.order, this.state.orderType);
  render() {
    const {
      user_id,
      user_type,
      setAddCatModalRaised,
    } = this.props;
    return (
      <CategoriesWrapper>
        <CategoriesHeader>
          <div className = 'name-wrapper'>
            <h2 className='name'>Categories</h2>
          </div>
          <div className='filter-wrapper'>
            <i className='fab fa-mix' />
            <span>Filter by</span>
            <select
              className='filter'
              onChange={this.handleSelectChange}
              name='filter'
            >
              <option value={name}>{name}</option>
              <option value={newest}>{newest}</option>
              <option value={oldest}>{oldest}</option>
            </select>
          </div>
        </CategoriesHeader>
        <DivCategoriesComponent>
          {/* <CategoriesNav
            sortHandler={this.sortHandler}
            order={this.order}
            orderType={this.orderType}
            user_id={user_id}
            setAddCatModalRaised={setAddCatModalRaised}
            user_type={user_type}
          /> */}
          <Categories categories={this.props.categories} history={this.props.history} />
        </DivCategoriesComponent>
      </CategoriesWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.users.user_id,
  user_type: state.users.user_type,
  categories: state.categories.categories,
});

export default connect(
  mapStateToProps,
  { getCategories }
)(CategoriesView);
