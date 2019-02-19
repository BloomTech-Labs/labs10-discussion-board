import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { followDiscussion } from '../store/actions/index.js';

const FollowWrapper = styled.form`
  padding: 10px;
`;
const Followed = styled.form`
  padding: 10px;
  width: 120px;
  .follow {
    cursor: pointer;
  }
`;

class Follow extends Component {
    state = { followed: true };
	  handleChange = e => this.setState({ [e.target.name]: e.target.value });
	  handleFollowClick = e => {
        e.preventDefault();
		    const { followed } = this.state;
		    const { user_id, discussion_id, title, historyPush } = this.props;
		    return this.props.followDiscussion(user_id, discussion_id, title, followed, historyPush);
	  };
  
    render() {
        const { followed } = this.state;
        return (
          <FollowWrapper onClick = { this.handleFollowClick }>
              <h2>Follow</h2> 
            <Followed>
              <input
                  className="follow"
                  onClick={this.handleFollowClick}
                  onChange = { this.handleChange }
                  style={{backgroundColor: this.state.followed ? 'green' : 'red'}}
                  value={followed ? 'Follow' : 'Following'}
              />
            </Followed>
          </FollowWrapper>
        );
    }
}



export default connect(null, { followDiscussion })(Follow);
