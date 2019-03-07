import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Deleted, AddReplyForm } from './index.js'

//styles
const ReplyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 50px;
`;

const PostedBy = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.8rem;
    color: #a7a7a7;

    .r-creator{
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    
      img {
        border-radius: 50%;
        margin-right: 10px;
        width: 23px;
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
        margin-right: 12px;
    
        &:hover {
          color: steelblue;
        };
    }  
`;

//components

const Reply = ({
    reply,
    loggedInUserId,
    historyPush,
    toggleAddReplyForm,
    showAddReplyForm,
}) => {
    const {
        body, 
        created_at,
        last_edited_at,
        post_id,
        avatar,
        username,
        user_id,
        id,
        discussion_id,
    } = reply;

    const handleAddReply = () => {
       if (showAddReplyForm === id){
         return toggleAddReplyForm()
       } else{
         return toggleAddReplyForm(id)
       }
      };

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

      //Bug 1: Vote currently does not work
    return(
        <ReplyWrapper>
            <p>{body}</p>
            <PostedBy>
                <div className = 'r-creator'>
                    <img alt='picture' src={avatar} />              
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
                    {/* &nbsp;
                    &nbsp; */}
                {/* <VoteCount
                    handleVote={handleVote}
                    vote_count={post_votes}
                    user_vote={user_vote}
                />
                    &nbsp;
                    &nbsp; */}
                {timeStamp(last_edited_at, created_at)}
            </PostedBy>
            {  
            showAddReplyForm === id &&
            <AddReplyForm
                user_id={loggedInUserId}
                toggleAddReplyForm={toggleAddReplyForm}
                discussion_id = {discussion_id}
                post_id={post_id}
                historyPush={historyPush}
            />
            }
        </ReplyWrapper>
    );
};

const mapStateToProps = state => ({
    loggedInUserId: state.users.user_id,
    avatar: state.users.avatar,
    username: state.users.username,
	user_id: state.users.user_id
  });

  export default connect(mapStateToProps,{})(Reply);