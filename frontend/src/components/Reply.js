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
    font-size: 14px;
    margin-left: 50px;
`;

const PostedBy = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px

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
    } = reply

    // const handleToggleReply = () => {

    // }
    const handleAddReply = () => {
       if (showAddReplyForm === id){
         return toggleAddReplyForm()
       } else{
         return toggleAddReplyForm(id)
       }
      }

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
                reply_id={id}
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