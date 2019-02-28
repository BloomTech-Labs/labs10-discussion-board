import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

//globals
import { phoneL, phoneP, tabletP } from '../globals/globals.js'

// components
import { AddReplyForm, AddPostForm, EditDiscussionForm, VoteCount, Deleted } from './index.js';

// views
import { PostsView } from '../views/index.js';

// action creators
import { getDiscussionById, removePost, removeDiscussion, handleDiscussionVote } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************* Styles *********************************************
 **************************************************************************************************/
const DiscussionWrapper = styled.div`
display: flex;
flex-direction: column;
border-radius: 15px;
border-bottom: 16px;
padding: 10px;
box-shadow: ${props => props.theme.topDiscussionWrapperBxShdw};
background-color: ${props => props.theme.topDiscussionWrapperBgHov};
`
const DiscussionSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const SubWrapper = styled.div`
width: 98%;
display: flex;
flex-direction: column;
margin: 0 auto;

@media ${tabletP} {
  width: 90%;
}

  @media ${phoneL}{
    width: 90%;
    text-align: center;
  }

h1 {
  margin-top: 30px;
  margin-bottom: 10px;
}
`;

const DiscussionInfo = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${tabletP} {
    display: flex;
    width: 90%;
  }
`;

const Posts = styled.div`
`

const Title = styled.div`
  color: ${props => props.theme.discussionPostColor};
`

const PostedBy = styled.div`
  display: flex;
  flex-direction: row;
  text-decoration: none;

  @media ${tabletP}{
      justify-content: space-evenly;
  }

  .username {
    color: ${props => props.theme.discussionUsernameColor}; 
    font-weight: bold;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const Elip = styled.div`
  display: inline;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  padding: 10px;
  color: ${props => props.theme.discussionPostColor};


  @media ${tabletP} {
    text-align: center;
  }
`;

const Sort = styled.div`
display: flex;
flex-direction: row;
padding-bottom: 1em;
align-items: baseline;
justify-content: space-between;

@media ${tabletP} {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  @media ${phoneP}{
  margin: 0 auto;
  align-items: center;
  width: 70%;
  }
}

.sortName {
  margin: 5px;
}

.sorted {
  font-weight: bold;
  padding: 5px;
  color: ${props => props.theme.discussionPostColor};

}

  button{
    margin-top: 10px;

    @media ${phoneL} {
      font-size: 17px;
      padding: 11px 0px;
      width: 110px;
    }
  }

.dropDowns {
  display: flex;
  flex-direction: row;

  @media ${phoneP}{
    flex-direction: column;
    margin: 0 auto;
  }
  @media ${phoneL}{
    flex-direction: column;
  }
}
`;

const AddPostBtn = styled.div`

`;

class Discussion extends Component {
  state = {
    showAddPostForm: false, // boolean
    showEditDiscussionForm: false, // boolean
    showEditPostForm: null, // post_id
    showAddReplyForm: null, // post_id
    order: 'created_at', // possible values: 'created_at', 'post_votes'
    orderType: '', // possible values: 'desc', 'asc'
  };
  handleSelectChange = e => this.setState({ [e.target.name]: e.target.value }, () => {
    return this.props.getDiscussionById(this.props.id, this.state.order, this.state.orderType);
  });
  toggleAddPostForm = () => this.setState({ showAddPostForm: !this.state.showAddPostForm });
  toggleEditDiscussionForm = () => this.setState({ showEditDiscussionForm: !this.state.showEditDiscussionForm });
  toggleAddReplyForm = id => this.setState({ showAddReplyForm: id });
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
    return handleDiscussionVote(discussion_id, this.props.loggedInUserId, type)
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
      showEditDiscussionForm,
      showAddReplyForm,
    } = this.state;
    const { discussion, historyPush, loggedInUserId } = this.props;
    const {
      body,
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
        <DiscussionSubWrapper>
          <VoteCount
            handleVote={handleVote}
            vote_count={discussion_votes}
            user_vote={user_vote}
          />
          <SubWrapper>
            {
              loggedInUserId === user_id &&
              (
                showEditDiscussionForm ?
                  <EditDiscussionForm
                    toggleEditDiscussionForm={this.toggleEditDiscussionForm}
                    title={title}
                    body={body}
                    discussion_id={id}
                    historyPush={historyPush}
                  />
                  :
                  <button onClick={this.toggleEditDiscussionForm}
                  >Edit discussion</button>
              )
            }
            {last_edited_at && (
              <p>
                Last edited {moment(new Date(Number(last_edited_at))).fromNow()}
              </p>
            )}
            {
              loggedInUserId === user_id &&
              <button onClick={this.handleRemoveDiscussion}>Remove discussion</button>
            }
            <Title>
              <h1> {title} </h1>
              <PostedBy>
                Posted by: &nbsp;
                {
                  username ?
                    <Link className='username' to={`/profile/${user_id}`}>
                      {username},
                  </Link> :
                    <Deleted />
                }
                <div>{moment(new Date(Number(created_at))).fromNow()}</div>
              </PostedBy>
            </Title>
            <DiscussionInfo>
              <Elip>{body}</Elip>
            </DiscussionInfo>
            <Sort>
              <div className='dropDowns'>
                <span className='sorted'>Sort</span>
                <select className='sortName' onChange={this.handleSelectChange} name='order'>
                  <option value='created_at'>date created</option>
                  <option value='post_votes'>votes</option>
                </select>
                <select className='sortName' onChange={this.handleSelectChange} name='orderType'>
                  <option value='desc'>
                    {order === 'created_at' ? 'most recent first' : 'most first'}
                  </option>
                  <option value='asc'>
                    {order === 'created_at' ? 'least recent first' : 'least first'}
                  </option>
                </select>
              </div>
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
            </Sort>
          </SubWrapper>
        </DiscussionSubWrapper>
        <Posts>
          <PostsView
            posts={posts}
            historyPush={historyPush}
            showEditPostForm={showEditPostForm}
            updateEditPostForm={this.updateEditPostForm}
            handleRemovePost={this.handleRemovePost}
            toggleAddReplyForm={this.toggleAddReplyForm}
            order={order}
            orderType={orderType}
          />
          {
            showAddReplyForm &&
            <AddReplyForm
              toggleAddReplyForm={this.toggleAddReplyForm}
              discussion_id={id}
              historyPush={historyPush}
              repliedPost={posts.find(post => post.id === showAddReplyForm)}
            />
          }
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
