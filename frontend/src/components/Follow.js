import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { followDiscussion } from '../store/actions/index.js';

const FollowWrapper = styled.div`
  padding: 10px;
`;
const Followed = styled.div`
  padding: 10px;
  width: 120px;
  .follow {
    cursor: pointer;
    width: 120px;
    height: 120px;
  }
`;

class Follow extends Component {
    state = { followed: this.props.follow};
	  handleChange = e => this.setState({ [e.target.name]: e.target.value });
	  handleFollowClick = e => {
        e.preventDefault();
		    const { followed } = this.state;
        const { discussion_id, user_id, historyPush } = this.props;
		    return this.props.followDiscussion(discussion_id, user_id, followed, historyPush);
	  };
    handleClick() {
      this.setState(function(prevState) {
        return {isToggleOn: !prevState.isToggleOn};
      });
    }

    render() {
        const { followed } = this.state;
        const isFollowing = this.props.discussionFollows.includes(this.props.discussion_id)
        console.log('id', this.props.discussionFollows);
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
              {/* <button onClick = {this.handleFollowClick}>FOLLOW</button> */}
              {/* <button onClick = {this.handleFollowClick}>UNFOLLOW</button> */}
            </Followed>
          </FollowWrapper>
        );
    }
}

const mapStateToProps = state => ({
    discussionFollows: state.users.discussionFollows,
    user_id: state.users.user_id
});

export default connect(mapStateToProps, { followDiscussion })(Follow);

