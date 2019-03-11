import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { followDiscussion } from '../store/actions/index.js';

// action creators
import { displayError } from '../store/actions/index.js';

// components
import { ToolTip } from './index.js';


/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const FollowWrapper = styled.div`
display: flex;
width: 15%;
`;

const Followed = styled.div`
  width: 100%;
  position: relative;
  
  &:hover {
    .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }
  
  .follow {
    cursor: pointer;
  }

  button{
    color: white;
    padding: 4px;
    font-size: 12px;
    width: 100%;
  }

  @media (max-width: 525px) {
  width: 100%;
}
`;


  // color: ${props => props.theme.topDiscussionTitleColor};


/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Follow extends Component {
	  handleChange = e => this.setState({ [e.target.name]: e.target.value });
	  handleFollowClick = e => {
        e.preventDefault();
        const { followDiscussion, displayError, discussion_id, user_id, historyPush } = this.props;
        if (!user_id) {
          return displayError('You must be logged in to follow a discussion.');
        }
		    return followDiscussion(discussion_id, user_id, historyPush);
	  };

    render() {
        const { user_id } = this.props;
        const isFollowing = this.props.discussionFollows.some(follow => follow.discussion_id === Number(this.props.discussion_id));
        const followUnfollow = () => {
          if(isFollowing === true){
            return 'Unfollow Thread'
          } else {
            return 'Follow Thread'
          }
        }
        return (
          <FollowWrapper>
            <Followed>
            <button
                  className = 'follow'
                  onClick={this.handleFollowClick}
                  onChange = { this.handleChange }
                  style={{backgroundColor: isFollowing ? 'lightsteelblue' : 'steelblue'}}
              >
                <i className = 'fas fa-plus'></i>&nbsp;&nbsp;{followUnfollow()}
              </button>
              {
                !user_id &&
                <ToolTip
                  text = 'You must be logged in to follow a discussion.' // must  be any string
                  arrow = 'left' // must be string that says 'top', 'right', 'left', or 'bottom'
                  width = { 200 } // must be a number
                />
              }
            </Followed>
          </FollowWrapper>
        );
    }
};

const mapStateToProps = state => ({
    discussionFollows: state.users.discussionFollows,
    user_id: state.users.user_id
});

export default connect(mapStateToProps, { followDiscussion, displayError })(Follow);

