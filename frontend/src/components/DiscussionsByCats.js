import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { DiscussionByFollowedCats, AddDiscussionForm, FollowCat } from './index.js';

// action creators
import { getDiscussionsByCat, handleDiscussionVote } from '../store/actions/index.js';

// globals
import { tabletP, phoneP, accountUserTypes, addPostPermStartIndex } from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/

const DiscussionsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	padding: 10px;
	position: relative;
	justify-content: flex-start;
	align-items: center;
	width: 95%;
	min-height: 100vh;

	hr {
		width: 100%;
		border: 1px solid #d3d3d3;
	}

	.content {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 95%;

		@media ${ tabletP} {
			width: 100%;
		}
	}
`;

const DiscussionHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	.all-posts {
		font-size: 36px;
		flex-grow: 2;

		@media ${ tabletP} {
			flex-grow: 0;
		}
	}

	.filter-wrapper {
		i {
			margin-right: 5px;
		}

		.filter {
			border: none;
			background-color: rgba(0, 0, 0, 0);
			padding: 5px;

			&:focus {
				outline: none;
			}
		}
	}

	.add-post-btn {
		margin-left: 10px;
		padding: 10px 15px;
		border-radius: 5px;
		border: none;
		background-color: #418DCF;
		color: white;

		@media ${ phoneP} {
			width: 100%;
			margin-left: 0;
		}

		&:hover {
			cursor: pointer;
			background-color: white;
			color: #418DCF;
			border: 1px solid #418DCF;
		}
	}
`;

const newest = 'newest';
const oldest = 'oldest';
const mostUpvotes = 'most upvotes';
const mostViews = 'most views';
const mostComments = 'most comments';

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class DiscussionsByCats extends Component {
  state = {
    order: 'created_at', // possible values: 'created_at', 'post_count', 'discussion_votes'
    orderType: '', // possible values: 'desc', 'asc'
    showAddDiscussionForm: false,
  };
  toggleAddDiscussionForm = () => this.setState({
    showAddDiscussionForm: !this.state.showAddDiscussionForm,
  });
  handleDiscussionVote = (discussion_id, type) => {
    const { order, orderType } = this.state;
    const { getDiscussionsByCat, handleDiscussionVote, match } = this.props;
    return handleDiscussionVote(discussion_id, type)
      .then(() => getDiscussionsByCat(match.params.category_id, order, orderType));
  };
  handleSelectChange = e => {
    let order = 'created_at';
    let orderType;
    switch (e.target.value) {
      case newest:
        order = 'created_at';
        orderType = 'desc';
        break;
      case oldest:
        order = 'created_at';
        orderType = 'asc';
        break;
      case mostUpvotes:
        order = 'upvotes';
        orderType = 'desc';
        break;
      case mostViews:
        order = 'views';
        orderType = 'desc';
        break;
      case mostComments:
        order = 'post_count';
        orderType = 'desc';
        break;
      default:
        break;
    };
    return this.setState({ order, orderType }, () => {
      return this.props.getDiscussionsByCat(this.props.match.params.category_id, this.state.order, this.state.orderType);
    });
  };
  getDiscussions = () => {
    const { order, orderType } = this.state;
    const { getDiscussionsByCat, match } = this.props;
    return getDiscussionsByCat(match.params.category_id, order, orderType);
  };
  componentDidMount = () => this.getDiscussions();

  componentDidUpdate(prevProps) {
    const { match, getDiscussionsByCat } = this.props;
    const { category_id } = match.params;
    const { order, orderType } = this.state;
    if (prevProps.match.params.category_id !== category_id) {
      return getDiscussionsByCat(category_id, order, orderType);
    };
  };
  render() {
    const { discussions, history, category_name, match, user_type } = this.props;
    const { showAddDiscussionForm } = this.state;
    return (
      <DiscussionsWrapper>
        <DiscussionHeader>
          <FollowCat
            category_id={match.params.category_id}
            historyPush={history.push}
          />
          <h2 className='all-posts'>{category_name}</h2>
          <div className='filter-wrapper'>
            <i className='fab fa-mix' />
            <span>Filter by</span>
            <select
              className='filter'
              onChange={this.handleSelectChange}
              name='filter'
            >
              <option value={newest}>{newest}</option>
              <option value={oldest}>{oldest}</option>
              <option value={mostUpvotes}>{mostUpvotes}</option>
              <option value={mostViews}>{mostViews}</option>
              <option value={mostComments}>{mostComments}</option>
            </select>
          </div>
          {(accountUserTypes.indexOf(user_type) >= addPostPermStartIndex) &&
            <button onClick={this.toggleAddDiscussionForm} className='add-post-btn'>
              <i className='fas fa-plus-circle' />&nbsp;Add Post
					</button>}
        </DiscussionHeader>
        <hr />
        <div className='content'>
          {discussions.map((discussion, i) =>
            <DiscussionByFollowedCats
              key={i}
              discussion={discussion}
              history={history}
              voteOnDiscussion={this.handleDiscussionVote}
            />)
          }
        </div>
        {
          showAddDiscussionForm &&
          <AddDiscussionForm
            toggleAddDiscussionForm={this.toggleAddDiscussionForm}
            getDiscussions={this.getDiscussions}
            category_id={match.params.category_id}
          />
        }
      </DiscussionsWrapper>
    );
  }
};

const mapStateToProps = state => ({
  user_type: state.users.user_type,
  discussions: state.discussions.discussions,
  category_name: state.categories.category.name,
});

export default connect(mapStateToProps, { getDiscussionsByCat, handleDiscussionVote })(DiscussionsByCats);
