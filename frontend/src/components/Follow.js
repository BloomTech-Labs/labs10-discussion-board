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
  padding: 10px;
`;

const Followed = styled.div`
  width: fit-content;
  position: relative;
  
  &:hover {
    .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }
  
  .follow {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }
`;

const FollowDis = styled.div`
  color: ${props => props.theme.topDiscussionTitleColor};
  font-style: oblique;
  font-weight: bold;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Follow extends Component {
    state = { followed: this.props.follow};
	  handleChange = e => this.setState({ [e.target.name]: e.target.value });
	  handleFollowClick = e => {
        e.preventDefault();
		    const { followed } = this.state;
        const { followDiscussion, displayError, discussion_id, user_id, historyPush } = this.props;
        if (!user_id) {
          return displayError('You must be logged in to follow a discussion.');
        }
		    return followDiscussion(discussion_id, user_id, followed, historyPush);
	  };

    render() {
        const { followed } = this.state;
        const { user_id } = this.props;
        const isFollowing = this.props.discussionFollows.some(follow => follow.discussion_id === Number(this.props.discussion_id));
        return (
          <FollowWrapper>
            <Followed>
            <FollowDis>Follow</FollowDis>
              <button
                  className="follow"
                  onClick={this.handleFollowClick}
                  onChange = { this.handleChange }
                  style={{backgroundColor: isFollowing ? 'green' : 'red'}}
                  value={followed ? 'Followed' : 'Follow?'}
              />
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

