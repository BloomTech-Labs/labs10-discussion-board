import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//globals
import { phoneP, phoneL, tabletP } from '../globals/globals.js'

// components
import { EditPostForm, VoteCount, Deleted, Avatar, Quote } from './index.js';

import { handlePostVote } from '../store/actions/index.js';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PostSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid black;
  padding-top: 16px;
  padding-bottom: 16px;

  @media ${phoneL} {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
  }
`;

const SubWrapper = styled.div`
`;

//make a global for the avatar box Background
const PostedBy = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 230px;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  box-shadow: 2px 3px 2px 2px grey;
  background-color: lavender;

  @media ${phoneL} {
    height: 170px;
    width: 294px;
  }

  .username {
    font-weight: bold;
    color: ${props => props.theme.discussionAvatarUsernameColor};
    text-decoration: none;
    width: 100%;
    background-color: mediumpurple;
    padding: 7px 0;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const DivBody = styled.div `
  padding: 30px;
  padding-top: 10px;
  width: 100%;
  
  span{
    font-size: 12px;
  }

  p {
    margin: 0; 
    margin-bottom: 80px;
    margin-top: 16px
    word-break: break-word;
    color: ${props => props.theme.discussionPostColor};
    font-size: 16px;
  }

  .signature{
    border: 1px solid;
  }
`;

const H5signature = styled.h5`
  border-top: 1px solid black;
  padding: 15px;
`;

const VoteAndBody = styled.div`
display: flex;
flex-direction: row;

`;

const UserActions = styled.div`
display: flex;
flex-direction: row;
align-self: flex-end;
color: ${props => props.theme.discussionPostColor};

  @media ${phoneL}{
    
  }

 h4{
   cursor: pointer;
 }
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
    avatar,
    signature,
  } = post;

  const handleVote = type => handlePostVote(post.id, type, discussion_id, order, orderType);
  const handleEdit = () => updateEditPostForm(id);
  const handleRemove = () => handleRemovePost(loggedInUserId, id, historyPush, discussion_id);
  const userCreatedPost = loggedInUserId === user_id;

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
    //Changed some of the styled div names and incorporated a new
    //styled div with the name Post Wrapper
    //in order to place the UserActions (reply/edit/remove) on the bottom
    //Of the component
    <PostWrapper>
      <PostSubWrapper name={id}>
        <SubWrapper>
          {reply_to && <Quote reply_to={reply_to} />}
          <VoteAndBody>
            <VoteCount
              handleVote={handleVote}
              vote_count={post_votes}
              user_vote={user_vote}
            />
            <PostedBy>
              <Avatar height={'49%'} width={'65%'} src={avatar} />
              {
                username ?
                  <Link className='username' to={`/profile/${user_id}`}>
                    {username},
                  </Link> :
                  <Deleted />
              }
            </PostedBy>
          </VoteAndBody>
        </SubWrapper>
        <DivBody>
          {timeStamp(last_edited_at, created_at)}
          <p>{body}</p>
          <div className='signature'>
            { signature && <H5signature>{ signature }</H5signature> }
          </div>
        </DivBody>
      </PostSubWrapper>
      <UserActions>
      {
        loggedInUserId !== 0 &&
        <h4 onClick={() => toggleAddReplyForm(id)}><i className="fas fa-reply"></i>{' '} Reply {' '}</h4>
      }
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
              <h4 onClick={handleEdit}>{'| '} Edit {' |'}</h4>
            </>
          ))}
      {userCreatedPost && <h4 onClick={handleRemove}>{' '}<i className="fas fa-trash-alt"></i>{' '} Remove</h4>}
    </UserActions>
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