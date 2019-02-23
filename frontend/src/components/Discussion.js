import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

// components
import { AddPostForm, EditDiscussionForm, VoteCount } from './index.js';

// views
import { PostsView } from '../views/index.js';

// action creators
import { getDiscussionById, removePost, removeDiscussion, handleDiscussionVote } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************* Styles *********************************************
 **************************************************************************************************/
const DiscussionWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;

  @media(max-width: 768px){
    display: flex;
    width: 90%

    @media (max-width: 450px){
      width: 90%;
    }
  h1 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

const DiscussionInfo = styled.div`
  display: flex;
  justify-content: space-between;

  @media(max-width: 768px){
    display: flex;
    width: 90%

    @media (max-width: 450px){
    }
`;
const CategoryName = styled.div`
  font-size: 18px;
  width: 10%;
  font-weight: bold;
`;

const PostedBy = styled.div`
  display: flex;
  flex-direction: column;
  @media(max-width: 768px){


    @media (max-width: 450px){
    }
  }
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

const Elip = styled.div `
  display: inline;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
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
  handleDiscussionVote = (discussion_id, type) => {
		const { id, getDiscussionById, handleDiscussionVote } = this.props;
		return handleDiscussionVote(discussion_id, this.props.user_id, type)
			.then(() => getDiscussionById(id));
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
      username,
      user_vote,
    } = discussion;
    const handleVote = type => this.handleDiscussionVote(id, type);
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
          <VoteCount
            handleVote={handleVote}
            vote_count={discussion_votes}
            user_vote={user_vote}
          />
          <CategoryName>/d/{category_name}</CategoryName>
          <PostedBy>
            Posted by:
            <Link className='username' to={`/profile/${user_id}`}>
              {username}
            </Link>
            <div>{moment(new Date(Number(created_at))).fromNow()}</div>
          </PostedBy>
        </DiscussionInfo>
        <p>Title: {title}</p>
        <Elip>Body: {body}</Elip>

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
  { getDiscussionById, removePost, removeDiscussion, handleDiscussionVote }
)(Discussion);
