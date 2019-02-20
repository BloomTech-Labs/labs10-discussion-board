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
        return (
          <FollowWrapper>
            <Followed>
              <input
                  className="follow"
                  onClick={this.handleFollowClick}
                  onChange = { this.handleChange }
                  style={{backgroundColor: this.state.followed ? 'green' : 'red'}}
                  value={followed ? 'Follow?' : 'Following'}
              />
              {/* <button onClick = {this.handleFollowClick}>FOLLOW</button> */}
              {/* <button onClick = {this.handleFollowClick}>UNFOLLOW</button> */}
            </Followed>
          </FollowWrapper>
        );
    }
}

const mapStateToProps = state => ({
    follow: state.discussions.follows,
    user_id: state.users.user_id
});

export default connect(mapStateToProps, { followDiscussion })(Follow);

