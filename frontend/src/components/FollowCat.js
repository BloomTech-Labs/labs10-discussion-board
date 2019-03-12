import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { followCategory } from '../store/actions/index.js';

// action creators
import { displayError } from '../store/actions/index.js';

// components
import { ToolTip } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const FollowWrapper = styled.div`
  position: relative;
  height: fit-content;
  
  &:hover {
    .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }
`;
const Followed = styled.div`
  .follow {
    cursor: pointer;
    margin-left: 10px;
    padding: 10px 15px;
		border-radius: 5px;
		border: none;
		background-color: #418DCF;
		color: white;
  }
`;


/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class FollowCat extends Component {
	  handleChange = e => this.setState({ [e.target.name]: e.target.value });
	  handleFollowClick = e => {
        e.preventDefault();
        const { followCategory, displayError, category_id, user_id, historyPush } = this.props;
        if (!user_id) {
          return displayError('You must be logged in to follow a category.');
        }
		    return followCategory(category_id, user_id, historyPush);
	  };
    
    render() {
        const { user_id } = this.props;
        const isFollowing = this.props.categoriesFollowed.some(follow => follow.id === Number(this.props.category_id));
        const followUnfollow = () => {
          if(isFollowing === true){
            return 'Unfollow'
          } else {
            return 'Follow'
          }
        }
        return (
          <FollowWrapper>
            <Followed>
              <button
                  className="follow"
                  onClick={this.handleFollowClick}
                  onChange = { this.handleChange }
                  style={{backgroundColor: isFollowing ? 'lightsteelblue' : 'steelblue'}}
              >
              
                <i className={isFollowing ? "fas fa-minus-circle" : "fas fa-plus-circle"}></i>&nbsp;&nbsp;{followUnfollow()}
              </button>
            </Followed>
            {
                !user_id &&
                <ToolTip
                  text = 'You must be logged in to follow a category.' // must  be any string
                  arrow = 'left' // must be string that says 'top', 'right', 'left', or 'bottom'
                  width = { 200 } // must be a number
                />
              }
          </FollowWrapper>
        );
    }
};

const mapStateToProps = state => ({
    categoriesFollowed: state.categories.categoriesFollowed,
    user_id: state.users.user_id
});

export default connect(mapStateToProps, { followCategory, displayError })(FollowCat);

