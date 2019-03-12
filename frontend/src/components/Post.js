import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

//globals
import {
  // phoneP,
  phoneL,
  // tabletP,
} from '../globals/globals.js'

// components
import {
  AddReplyForm,
  // EditPostForm,
  VoteCount,
  // Deleted,
  // Avatar,
  // Quote,
  Avatar,
} from './index.js';

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
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid black;

  .title {
    margin-top: 30px;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 16px;
    margin-top: 16px;
  }

`;

const BodyWrapper = styled.p`
  text-align: justify;
  margin-bottom: 20px;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.9rem;
  color: #a7a7a7;

  .user-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 25%;
    margin-right: 20px;

    .user {
      width: fit-content;
      color: black;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    @media (max-width: 530px) {
      width: 100%;
    }
  }

  .discussion-info {
    display: flex;
    width: 75%;

    .votes-wrapper {
      margin-right: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      i {
        padding-left: 10px;
        padding-right: 5px;
        padding-top: 2px;
      }
    }

    .date-views-comment {
      display: flex;
    }

    @media (max-width: 830px) {
      justify-content: center;

      .desktop {
        display: none;
      }
    }

    @media (max-width: 630px) {
      .tablet {
        display: none;
      }
    }

    @media (max-width: 530px) {
      width: 100%;
      justify-content: flex-start;
      padding-top: 10px;
      margin-left: -10px;
    }
  }

  .fa-circle {
    font-size: 0.4rem;
    margin-top: 9px;
    margin-left: 8px;
    margin-right: 8px;
  }

  @media (max-width: 830px) {
    .desktop {
      display: none;
    }
  }

  @media (max-width: 630px) {
    .tablet, .desktop {
      display: none;
    }
  }

  @media (max-width: 530px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const UsernameWrapper = styled.span`
  color: ${props => props.theme.discussionPostColor};
`;

//make a global for the avatar box Background
const PostedBy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.8rem;
	color: #a7a7a7;


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
    color: black;

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
  };

  const handleUserClick = e => {
    e.stopPropagation();
    return historyPush(`/profile/${ user_id }`);
  };

  return (
    <PostWrapper>
      <BodyWrapper>{ body.length > 183 ? body.substr(0, 183) + '...' : body }</BodyWrapper>
      <InfoWrapper>
        <div className = 'user-info'>
          <div className = 'user' onClick = { handleUserClick }>
            <Avatar
              height = '20px'
              width = '20px'
              src = { avatar }
            />
            &nbsp;
            <UsernameWrapper>{ username }</UsernameWrapper>
          </div>
        </div>
        <div className = 'discussion-info'>
          <div className = 'votes-wrapper'>
            <VoteCount
              upvotes = { upvotes }
              downvotes = { downvotes }
              user_vote = { user_vote }
              handleVote = { handleVote }
            />
          </div>
          <div className = 'date-views-comment tablet'>
            <span>{moment(new Date(Number(created_at))).fromNow()}</span>
          </div>
        </div>
      </InfoWrapper>
      {/* <p>{body}</p>
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
          &nbsp;     */}
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
