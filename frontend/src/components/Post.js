import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// components
import { EditPostForm, VoteCount, Deleted, Avatar } from './index.js';


import { handlePostVote } from '../store/actions/index.js';

const PostWrapper = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-evenly;
 border: 1px solid black;
 border: ${props => props.theme.postWrapperBorder};
 padding-top: 16px;
 padding-bottom: 16px;
 margin: 0 auto;
`;

const PostSubWrapper = styled.div`
border: 1px solid purple;
width: 80%
`;

const PostedBy = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid red;
  width: 15%;
  align-items: center;

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
flex-direction: row;
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
}) => {

  const {
    body,
    created_at,
    discussion_id,
    id,
    last_edited_at,
    post_votes,
    user_id,
    username,
    user_vote,
    avatar
  } = post;

  const handleVote = type => {
    return handlePostVote(post.id, type, discussion_id, order, orderType);
  };
  const handleEdit = () => updateEditPostForm(id);
  const handleRemove = () => handleRemovePost(loggedInUserId, id, historyPush, discussion_id);
  const userCreatedPost = loggedInUserId === user_id;
  return (
    <PostWrapper name = { id }>
      <PostSubWrapper>
        <Vote>
          {/* <p>post votes: {post_votes}</p> */}
            <VoteCount 
              handleVote = { handleVote } 
              vote_count = { post_votes }
              user_vote = { user_vote }
            />
          
          <Elip>{body}</Elip>
        </Vote>
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
            
          </>
        ))}
        {userCreatedPost && <button onClick={handleRemove}>REMOVE POST</button>}
        {last_edited_at && (
              <p>
                Last edited: {moment(new Date(Number(last_edited_at))).fromNow()}
              </p>
            )}
        </PostSubWrapper>
        <PostedBy>
          <Avatar height={'72px'} width={'72px'} src={avatar} />
          {
            username ?
            <Link className='username' to={`/profile/${user_id}`}>
              {username}, 
            </Link> :
            <Deleted />
          }
          {moment(new Date(Number(created_at))).fromNow()}
        </PostedBy>
    </PostWrapper>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.users.user_id,
  avatar: state.users.avatar,
});

export default connect(
  mapStateToProps,
  {handlePostVote}
)(Post);
