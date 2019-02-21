import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// components
import { EditPostForm, VoteCount } from './index.js';
import { handlePostVote } from '../store/actions/index.js';

const PostWrapper = styled.div`
  width: 100%;
  border: 1px solid black;
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



const Post = ({
  post,
  loggedInUserId,
  historyPush,
  showEditPostForm,
  updateEditPostForm,
  handleRemovePost,
}) => {

  const {
    body,
    created_at,
    discussion_id,
    id,
    last_edited_at,
    post_votes,
    user_id,
    username
  } = post;

  const handlePostVote = (type) => {
    console.log('id', post.id)
    console.log('user id', post.user_id) 
    console.log('type', type) 
  }
  const handleEdit = () => updateEditPostForm(id);
  const handleRemove = () =>
    handleRemovePost(loggedInUserId, id, historyPush, discussion_id);
  
  let lastEditDate;
  if (last_edited_at) {
    lastEditDate = new Date(parseInt(last_edited_at));
    lastEditDate = lastEditDate.toISOString();
  }
  const userCreatedPost = loggedInUserId === user_id;
  return (
    <PostWrapper>
      {userCreatedPost && <button onClick={handleRemove}>REMOVE POST</button>}
      <h1>POST</h1>
      <p>post votes: {post_votes}</p>
      <div>
       <VoteCount 
        handleVote = { handlePostVote } 
        vote_count = { post_votes } />
      </div>
      <PostedBy>
        Posted by:
        <Link className='username' to={`/profile/${user_id}`}>
          {username}
        </Link>
        {moment(new Date(Number(created_at))).fromNow()}
      </PostedBy>
      <p>Body: {body}</p>

      {userCreatedPost &&
        (showEditPostForm === id ? (
          <EditPostForm
            user_id={user_id}
            post_id={id}
            discussion_id={discussion_id}
            historyPush={historyPush}
            updateEditPostForm={updateEditPostForm}
          />
        ) : (
          <>
            <button onClick={handleEdit}>Edit Post</button>
            {last_edited_at && (
              <p>
                Last edited {moment(new Date(Number(last_edited_at))).fromNow()}
              </p>
            )}
          </>
        ))}
    </PostWrapper>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.users.user_id,
});

export default connect(
  mapStateToProps,
  {}
)(Post);
