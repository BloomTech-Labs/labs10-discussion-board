import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import Votes from '../assets/img/Votes.png';

// components
import { AddPostForm, EditDiscussionForm } from './index.js';

// views
import { PostsView } from '../views/index.js';

// action creators
import { getDiscussionById, removePost, removeDiscussion } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************* Styles *********************************************
 **************************************************************************************************/
const DiscussionWrapper = styled.div`
  width: 90%;

  h1 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

const DiscussionInfo = styled.div`
  display: flex;
  align-items: center;
`;
const CategoryName = styled.div`
  font-size: 18px;
  width: 10%;
  font-weight: bold;
`;

const PostedBy = styled.div`
  display: flex;
  width: 25%;

  .username {
    margin: 0px 7px;
    font-weight: bold;
    color: black;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const DiscussionVotes = styled.div`
  font-size: 20px;
  width: 15%;
  display: flex;
  align-items: center;

  .discussionVotes {
    margin-left: 5px;
    width: 11%;
    height: 11%;
  }
`;

class Discussion extends Component {
  state = {
    showAddPostForm: false, // boolean
    showEditDiscussionForm: false, // boolean
    showEditPostForm: null // post_id
  };
  toggleAddPostForm = () => this.setState({ showAddPostForm: !this.state.showAddPostForm });
  toggleEditDiscussionForm = () => this.setState({ showEditDiscussionForm: !this.state.showEditDiscussionForm });
  updateEditPostForm = post_id => this.setState({ showEditPostForm: post_id });
  handleRemovePost = (user_id, post_id, historyPush, discussion_id) => {
    return this.props.removePost(user_id, post_id, historyPush, discussion_id);
  };
  handleRemoveDiscussion = () => {
    const {
      removeDiscussion,
      id,
      historyPush,
      discussion,
    } = this.props;
    const { category_id } = discussion;
    return removeDiscussion(id, category_id, historyPush);
  };
  componentDidMount = () => this.props.getDiscussionById(this.props.id);
  render() {
    const { showAddPostForm, showEditPostForm, showEditDiscussionForm } = this.state;
    const { discussion, historyPush } = this.props;
    const {
      body,
      category_name,
      created_at,
      last_edited_at,
      discussion_votes,
      id,
      posts,
      title,
      user_id,
      username
    } = discussion;
    return (
      <DiscussionWrapper>
        {
          this.props.user_id === user_id &&
          (
            showEditDiscussionForm ?
            <EditDiscussionForm
              toggleEditDiscussionForm = { this.toggleEditDiscussionForm }
              title = { title }
              body = { body }
              discussion_id = { id }
              historyPush = { historyPush }
            />
            :
            <button onClick = { this.toggleEditDiscussionForm }
            >Edit discussion</button>
          )
        }
        {last_edited_at && (
          <p>
            Last edited {moment(new Date(Number(last_edited_at))).fromNow()}
          </p>
        )}
        {
          this.props.user_id === user_id &&
          <button onClick = { this.handleRemoveDiscussion }>Remove discussion</button>
        }
        <h1> { title } </h1>
        <DiscussionInfo>
          <CategoryName>/d/{category_name}</CategoryName>
          <PostedBy>
            Posted by:
            <Link className='username' to={`/profile/${user_id}`}>
              {username}
            </Link>
            {moment(new Date(Number(created_at))).fromNow()}
          </PostedBy>
          <DiscussionVotes>
            Discussion Votes: {discussion_votes}
            <img className='discussionVotes' src={Votes} alt='votes' />
          </DiscussionVotes>
        </DiscussionInfo>
        <p>Title: {title}</p>
        <p>Body: {body}</p>

        <button onClick={this.toggleAddPostForm}>Add a Post</button>
        {showAddPostForm && (
          <AddPostForm
            user_id={this.props.user_id}
            discussion_id={id}
            historyPush={historyPush}
            toggleAddPostForm={this.toggleAddPostForm}
          />
        )}

        <PostsView
          posts={posts}
          historyPush={historyPush}
          showEditPostForm={showEditPostForm}
          updateEditPostForm={this.updateEditPostForm}
          handleRemovePost={this.handleRemovePost}
        />
      </DiscussionWrapper>
    );
  }
}

const mapStateToProps = state => ({
  discussion: state.discussions.discussion,
  user_id: state.users.user_id
});

export default connect(
  mapStateToProps,
  { getDiscussionById, removePost, removeDiscussion }
)(Discussion);
