import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// components
import { EditPostForm, VoteCount, Deleted, Quote } from './index.js';

import { handlePostVote } from '../store/actions/index.js';

const PostWrapper = styled.div`
  width: 100%;
  border: ${props => props.theme.postWrapperBorder};
`;

const PostedBy = styled.div`
  display: flex;
  width: 250px;
  padding: 10px;

  .username {
    margin: 0px 7px;
    font-weight: bold;
    color: ${props => props.theme.postPostedByUsernameColor};
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
  padding: 10px;
`;

const Vote = styled.div `
display: flex;
padding: 5px;
margin-left: 90%;
bottom: 45px;
`;

const Post = ({
  post,
  loggedInUserId,
  historyPush,
  showEditPostForm,
  updateEditPostForm,
  handleRemovePost,
  handlePostVote,
  order,
  orderType,
  toggleAddReplyForm,
}) => {

  const {
    body,
    created_at,
    discussion_id,
    id,
    last_edited_at,
    post_votes,
    reply_to,
    user_id,
    username,
    user_vote,
  } = post;

  const handleVote = type => handlePostVote(post.id, type, discussion_id, order, orderType);
  const handleEdit = () => updateEditPostForm(id);
  const handleRemove = () => handleRemovePost(loggedInUserId, id, historyPush, discussion_id);
  const userCreatedPost = loggedInUserId === user_id;
  return (
    // name attribute for use with react-scroll
    <PostWrapper name = { id }>
      { reply_to && <Quote reply_to = { reply_to } /> }
      {userCreatedPost && <button onClick={handleRemove}>REMOVE POST</button>}

      <Vote>
      <p>post votes: {post_votes}</p>
        <VoteCount 
          handleVote = { handleVote } 
          vote_count = { post_votes }
          user_vote = { user_vote }
        />
      </Vote>
      <PostedBy>
        Posted by: &nbsp;
        {
          username ?
          <Link className='username' to={`/profile/${user_id}`}>
            {username}
          </Link> :
          <Deleted />
        }
        {moment(new Date(Number(created_at))).fromNow()}
      </PostedBy>
      <Elip>{body}</Elip>

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
        {
          loggedInUserId !== 0 &&
          <button onClick = { () => toggleAddReplyForm(id) }>Reply</button>
        }
    </PostWrapper>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.users.user_id,
});

export default connect(
  mapStateToProps,
  {handlePostVote}
)(Post);
