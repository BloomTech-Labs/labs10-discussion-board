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
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class FollowCat extends Component {
    state = { followed: this.props.follow};
	  handleChange = e => this.setState({ [e.target.name]: e.target.value });
	  handleFollowClick = e => {
        e.preventDefault();
		    const { followed } = this.state;
        const { followCategory, displayError, category_id, user_id, historyPush } = this.props;
        if (!user_id) {
          return displayError('You must be logged in to follow a category.');
        }
		    return followCategory(category_id, user_id, followed, historyPush);
	  };

    render() {
        const { followed } = this.state;
        const { user_id } = this.props;
        const isFollowing = this.props.categoryFollows.some(follow => follow.category_id === Number(this.props.category_id));
        return (
          <FollowWrapper>
            <Followed>
              <button
                  className="follow"
                  onClick={this.handleFollowClick}
                  onChange = { this.handleChange }
                  style={{backgroundColor: isFollowing ? 'green' : 'red'}}
                  value={followed ? 'Followed' : 'Follow?'}
              />
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
    categoryFollows: state.users.categoryFollows,
    user_id: state.users.user_id
});

export default connect(mapStateToProps, { followCategory, displayError })(FollowCat);

