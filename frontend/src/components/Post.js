import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//globals
import {
  // phoneP,
  phoneL,
  // tabletP,
} from '../globals/globals.js'

// components
import { AddReplyForm, EditPostForm, VoteCount, Deleted, Avatar, Quote } from './index.js';

import { RepliesView } from '../views/index.js';

import { handlePostVote } from '../store/actions/index.js';

//Styled Divs 
// const H5signature = styled.h5`
//   border-top: 1px solid black;
//   padding: 15px;
// `;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 14px;

  .title {
    margin-top: 30px;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 0;
    margin-top: 30px;
  }

`

//make a global for the avatar box Background
const PostedBy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;


  .p-creator{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    border-radius: 50%;
    margin-right: 10px;
    width: 23px;
  }

  @media ${phoneL} {

  }

  .username {
    text-decoration: none;
    margin-right: 15px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  span {
    cursor: pointer;

    &:hover {
      color: steelblue;
    };
  }
`;

//Signature

/* <div className='signature'>
  { signature && <H5signature>{ signature }</H5signature> }
</div> */

//Reply with Quote Modal

/* {reply_to && <Quote reply_to={reply_to} />} */

//Remove Written Post

// {userCreatedPost && <h4 onClick={handleRemove}>{' '}<i className="fas fa-trash-alt"></i>{' '} Remove</h4>}

//Edit Post Form

// {userCreatedPost &&
//   (showEditPostForm === id ? (
//     <EditPostForm
//       user_id={user_id}
//       post_id={id}
//       discussion_id={discussion_id}
//       historyPush={historyPush}
//       updateEditPostForm={updateEditPostForm}
//     />
//   ) : (
//       <>
//         <h4 onClick={handleEdit}>{'| '} Edit {' |'}</h4>
//       </>
//     ))}

const Post = ({
  post,
  loggedInUserId,
  historyPush,
  showEditPostForm,
  updateEditPostForm,
  handleRemovePost,
  showAddReplyForm,
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
    upvotes,
    downvotes,
    replies,
    user_id,
    username,
    user_vote,
    avatar,
    // signature,
  } = post;

  const handleVote = (e, type) => handlePostVote(post.id, type, discussion_id, order, orderType);

  const handleAddReply = () => {
    if (showAddReplyForm === id){
      return toggleAddReplyForm()
    } else{
      return toggleAddReplyForm(id)
    }
  };
  // const handleEdit = () => updateEditPostForm(id);
  // const handleRemove = () => handleRemovePost(loggedInUserId, id, historyPush, discussion_id);
  // const userCreatedPost = loggedInUserId === user_id;

  //Shows Created timestamp, then Edited Time stamp overrides it once post is edited
  const timeStamp =() => {
    if(last_edited_at){
      return (
            <span>
              Last edited: {moment(new Date(Number(last_edited_at))).fromNow()}
            </span>
          )
    } else if(created_at) {
      return (<span>Created: {moment(new Date(Number(created_at))).fromNow()}</span>
      )
    }
  }
  return (
    <PostWrapper>
      <p>{body}</p>
      <PostedBy>
        <div className='p-creator'>
          <img alt='user' src={avatar} />              
          {
            username ?
              <Link className='username' to={`/profile/${user_id}`}>
                {username}
              </Link> :
              <Deleted />
          }
          {
            loggedInUserId !== 0 &&
            <span onClick={handleAddReply}><i className="fas fa-reply"></i>{' '} Reply {' '}</span>
          }
        </div>
          &nbsp;
          &nbsp;
        <VoteCount
          upvotes = { upvotes }
          downvotes = { downvotes }
          user_vote = { user_vote }
          handleVote = { handleVote }
        />
          &nbsp;
          &nbsp;
        {timeStamp(last_edited_at, created_at)}
      </PostedBy>
        {  
          showAddReplyForm === id &&
          <AddReplyForm
            user_id={loggedInUserId}
            toggleAddReplyForm={toggleAddReplyForm}
            post_id={id}
            discussion_id = {discussion_id}
            historyPush={historyPush}
          />
        }
        <RepliesView
            replies = {replies}
            historyPush = {historyPush}
            toggleAddReplyForm={toggleAddReplyForm}
            showAddReplyForm = {showAddReplyForm}
          />
          &nbsp;
          &nbsp;    
  </PostWrapper>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.users.user_id,
  avatar: state.users.avatar,

});

export default connect(
  mapStateToProps,
  { handlePostVote }
)(Post);
