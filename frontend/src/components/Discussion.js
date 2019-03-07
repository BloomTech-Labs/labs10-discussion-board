import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//globals
import { phoneL, phoneP, tabletP } from '../globals/globals.js'

// components
import { AddReplyForm, AddPostForm, Follow, PostCount, VoteCount, Deleted } from './index.js';

// views
import { PostsView } from '../views/index.js';

// action creators
import { getDiscussionById, removePost, removeDiscussion, handleDiscussionVote } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************* Styles *********************************************
 **************************************************************************************************/
//Example: how to use themes
// ${props => props.theme.discussionAvatarUsernameColor};
// display: flex;
// flex-direction: column;
// border-radius: 15px;
// border-bottom: 16px;
// padding: 10px;
// box-shadow: ${props => props.theme.topDiscussionWrapperBxShdw};
// background-color: ${props => props.theme.topDiscussionWrapperBgHov};

const DiscussionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  margin-left: 10px;

  .back {
    font-size: 30px;
    padding-right: 35px;
    padding-top: 15px;
    color: black;
    
    &:hover{
      cursor: pointer;
    }
  }
`;
const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DiscussionContent = styled.div`
  // color: darkgray;

  p {
    font-size: 22px;
    margin-top: 16px;
  }
`;

const PostedBy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  margin-bottom: 15px;
  font-size: 0.8rem;
	color: #a7a7a7;

  .d-creator {
    display: flex;
    flex-direction: row;
    align-items: center;

    img{
      border-radius: 50%;
      margin-right: 10px;
      width: 23px;
    }

    .username{
      text-decoration: none;
      font-size: 0.8rem;
      color: black;
    }
  }

.c-name {
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-left: 5px;
  }
}
`;

const CommentWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;

  @media ${tabletP} { 
  }

  @media ${phoneL}{
    text-align: center;
  }
`;

const Posts = styled.div``;

const AddPostBtn = styled.div``;

const CommentSort = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px; 
 
`;

const Sort = styled.span`
display: flex;
flex-direction: row;
align-items: baseline;
justify-content: space-between;

@media ${tabletP} {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // margin: 0 auto;

  @media ${phoneP}{
  margin: 0 auto;
  align-items: center;
  width: 70%;
  }
}

// .sortName {
//   margin: 5px;
// }

// .sorted {
//   font-weight: bold;
//   padding: 5px;
//   color: ${props => props.theme.discussionPostColor};
// }

//   button{
//     margin-top: 10px;

//     @media ${phoneL} {
//       font-size: 17px;
//       padding: 11px 0px;
//       width: 110px;
//     }
//   }

// .dropDowns {
//   display: flex;
//   flex-direction: row;

//   @media ${phoneP}{
//     flex-direction: column;
//     margin: 0 auto;
//   }
//   @media ${phoneL}{
//     flex-direction: column;
//   }
// }
// `;

class Discussion extends Component {
  state = {
    showAddPostForm: false, // boolean
    showEditDiscussionForm: false, // boolean
    showEditPostForm: null, // post_id
    showAddReplyForm: null, // post_id
    order: 'created_at', // possible values: 'created_at', 'post_votes'
    orderType: 'asc', // possible values: 'desc', 'asc'
  };
  handleSelectChange = e => this.setState({ [e.target.name]: e.target.value }, () => {
    return this.props.getDiscussionById(this.props.id, this.state.order, this.state.orderType);
  });
  toggleAddPostForm = () => this.setState({ showAddPostForm: !this.state.showAddPostForm });
  toggleEditDiscussionForm = () => this.setState({ showEditDiscussionForm: !this.state.showEditDiscussionForm });
  toggleAddReplyForm = (id) => this.setState({ showAddReplyForm: id || null});
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
    const { order, orderType } = this.state;
    const { id, getDiscussionById, handleDiscussionVote } = this.props;
    return handleDiscussionVote(discussion_id, type)
      .then(() => getDiscussionById(id, order, orderType));
  };
  componentDidMount = () => {
    const { getDiscussionById, id, scrollTo } = this.props;
    const { order, orderType } = this.state;
    return getDiscussionById(id, order, orderType).then(() => scrollTo());
  };
  componentDidUpdate = prevProps => {
    const { getDiscussionById, id, scrollTo } = this.props;
    const { order, orderType } = this.state;
    if (prevProps.id !== id) return getDiscussionById(id, order, orderType).then(() => scrollTo());
  };


  render() {
    
    const {
      order,
      orderType,
      showAddPostForm,
      showEditPostForm,
      showAddReplyForm,
    } = this.state;
    const { discussion, historyPush, loggedInUserId } = this.props;

    const {
      body,
      // created_at,
      // last_edited_at,
      upvotes,
      downvotes,
      avatar,
      category_name,
      category_id,
      category_icon,
      id,
      posts,
      post_count,
      user_id,
      username,
      user_vote,
    } = discussion;

    const handleVote = (e, type) => this.handleDiscussionVote(id, type);

    return (
      <DiscussionWrapper>
        <Link className='back' to={`/discussions/category/${category_id}`}><i className="far fa-arrow-alt-circle-left"></i></Link>
        <SubWrapper>
          <DiscussionContent>
            <div className='content'>
              <p>{body}</p>
            </div>
            <PostedBy>
              <div className='d-creator'>
                <img alt='user' src={avatar} />
                {
                  username ?
                    <Link className='username' to={`/profile/${user_id}`}>
                      {username}
                    </Link> :
                    <Deleted />
                }
              </div>
              &nbsp;
              &nbsp;
              <div className='c-name'>
                <i className = { category_icon } />
                <span>
                  {category_name}
                </span>
              </div>
              <VoteCount
                upvotes={upvotes}
                downvotes={downvotes}
                user_vote={user_vote}
                handleVote={handleVote}
              />
              &nbsp;
              &nbsp;
              <PostCount post_count={post_count || 0} />
              &nbsp;
              &nbsp;
              <Follow discussion_id={id} historyPush={historyPush} />
            </PostedBy>
          </DiscussionContent>  
          <CommentWrapper>  
            <CommentSort>
              <span className='title'>Comments</span>
              <Sort>
                <div className='dropDowns'>
                  <span className='sorted'>Sort</span>
                  &nbsp;
                  &nbsp;
                  <select className='sortName' onChange={this.handleSelectChange} name='order'>
                    <option value='created_at'>date created</option>
                    <option value='post_votes'>votes</option>
                  </select>
                  &nbsp;
                  &nbsp;
                  <select className='sortName' onChange={this.handleSelectChange} name='orderType'>
                    <option value='desc'>
                      {order === 'created_at' ? 'most recent first' : 'most first'}
                    </option>
                    <option value='asc'>
                      {order === 'created_at' ? 'least recent first' : 'least first'}
                    </option>
                  </select>
                </div>
              </Sort>
            </CommentSort>
              <Posts>
                <PostsView
                  posts={posts}
                  historyPush={historyPush}
                  showEditPostForm={showEditPostForm}
                  updateEditPostForm={this.updateEditPostForm}
                  handleRemovePost={this.handleRemovePost}
                  showAddReplyForm = {showAddReplyForm}
                  toggleAddReplyForm={this.toggleAddReplyForm}
                  discussion_id={id}
                  historyPush={historyPush}
                  repliedPost={posts.find(post => post.id === showAddReplyForm)}
                />
                {/* {
                  showAddReplyForm &&
                  <AddReplyForm
                    toggleAddReplyForm={this.toggleAddReplyForm}
                    discussion_id={id}
                    historyPush={historyPush}
                    toggleAddPostForm={this.toggleAddPostForm}
                  />
                } */}
                <AddPostBtn>
                  {loggedInUserId !== 0 && <button onClick={this.toggleAddPostForm}>Add Post</button>}
                  {showAddPostForm && (
                    <AddPostForm
                      user_id={loggedInUserId}
                      discussion_id={id}
                      historyPush={historyPush}
                      toggleAddPostForm={this.toggleAddPostForm}
                    />
                  )}
                </AddPostBtn>
              </Posts>
          </CommentWrapper>
        </SubWrapper>
      </DiscussionWrapper>
    );
  }
};

const mapStateToProps = state => ({
  discussion: state.discussions.discussion,
  loggedInUserId: state.users.user_id
});

export default connect(
  mapStateToProps,
  { getDiscussionById, removePost, removeDiscussion, handleDiscussionVote }
)(Discussion);
