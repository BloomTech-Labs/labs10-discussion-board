import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { followDiscussion } from '../store/actions/index.js';


/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const FollowWrapper = styled.div`
  padding: 10px;
`;
const Followed = styled.div`
  padding: 10px;
  width: 120px;
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
class Follow extends Component {
    state = { followed: this.props.follow};
	  handleChange = e => this.setState({ [e.target.name]: e.target.value });
	  handleFollowClick = e => {
        e.preventDefault();
		    const { followed } = this.state;
        const { discussion_id, user_id, historyPush } = this.props;
		    return this.props.followDiscussion(discussion_id, user_id, followed, historyPush);
	  };

    render() {
        const { followed } = this.state;
        const isFollowing = this.props.discussionFollows.includes(Number(this.props.discussion_id))

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
          </FollowWrapper>
        );
    }
}

const mapStateToProps = state => ({
    discussionFollows: state.users.discussionFollows,
    user_id: state.users.user_id
});

export default connect(mapStateToProps, { followDiscussion })(Follow);

