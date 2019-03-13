import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../assets/gif/spinner/Spinner'; //need to move to assets folder
import { getProfile } from '../store/actions/index';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { phoneP, tabletP, } from '../globals/globals';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';
import "react-tabs/style/react-tabs.css";

// components
import { Avatar, Deleted } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const ProfileStyle = styled.div `
  width: 100%;
  flex-direction: column;
  justify-content: center;
  `;
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  margin: 10px;
  padding: 10px;
  width: 92%;
  color: ${props => props.theme.discussionPostColor};
  @media ${tabletP} {
    .react-tabs__tab {
      width: 93%;
      text-align: center;
    }
  }
  @media ${phoneP} {
    .react-tabs__tab {
      width: 93%;
      text-align: center;
    }
  }
  .avatar-style {
    width: 10%;
    display: flex;
    align-self: flex-start;
    @media ${phoneP} {
      width: 20%;
      }
  }
  .username-style { 
    margin-left: 0px;
    font-size: 18px;
    justify-content: flex-start
    @media ${tabletP} {
      margin-left: 0px;
      display: flex;
      justify-content: flex-start;
      width: 80%;
      }
  }
    @media ${phoneP} {
      margin-left: 0px;
      display: flex;
      justify-content: flex-start;
      }
  }
  .status-style {
    font-size: 10px;
    font-style: italic;
  }
  @media ${tabletP}{
    display: flex;
    flex-direction: column;
    width: 90%;
    @media ${phoneP} {
      display: flex;
      flex-direction: column;
      width: 90%;
    }
  }
  .discussion-title {
    font-weight: bold;
  }
`;

const HeaderStyle = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  `;

const WrappedDiv = styled.div`
display: flex;
flex-direction: row;
width: 90%;
margin: 0 auto;
color: ${props => props.theme.discussionPostColor};
.back {
  margin-right: 5px;
  width: 7%;
  height: 50px;
  font-size: 30px;
  color: black;
  
  &:hover{
    cursor: pointer;
  }
}
`;

const ContentDiv = styled.div`
margin: 20px 0px 10px 0px;
  display: flex;
  border-bottom: 1px solid black;
  a {
    text-decoration: none;
  }
  p {
    font-size: 22px;
    margin-top: 16px;
  }
color: ${props => props.theme.profileTitleContentDColor};
`;

const DiscussionTitle = styled.div`
  color: black;
`;

const PostedBy = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-left: auto;
  align-items: center;
  max-width: 100%;
  .c-name {
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 150px;
  min-width: 100px;
  }
  .c-time {
    font-size: 0.8rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 150px;
    width: 50%
    min-width: 150px;
    @media (max-width: 800px) {
      display: none;
    }
  }
  }
  span {
    margin-left: 5px;
    
    @media (max-width: 525px) {
      display: none;
    }
  }

    @media (max-width: 525px) {
      display: none;
    }
}
`;

const PostHeader = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 12px;
  margin-bottom: 15px;
  font-size: 0.8rem;
	color: #a7a7a7;
  .d-creator {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 150px;
    img{
      border-radius: 50%;
      margin-right: 10px;
      width: 23px;
    }

    .username{
      font-size: 0.8rem;
      color: ${props => props.theme.discussionPostColor};
    }
  }
`;

const SubWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Profile extends Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      return this.props.getProfile(this.props.match.params.id);
    }
  };
  /* we use profileItems to manipulate what data is displayed. if the data received from our props is 0,
  profileItems displays our spinner component, however if our props contains a profile we display that profile
  by mapping through our data received and choosing what properties we want to display with our profile parameter*/
  render() {
    
    let profileItems;
    if (this.props.profile.length === 0) {
      profileItems = <Spinner />;
    } else {
      if (this.props.profile) {
        profileItems = this.props.profile.map((profile, index) => (
          
          <ProfileStyle key={index}>
            <ProfileWrapper className = 'prowrap'>
              <HeaderStyle>
                <WrappedDiv className = 'avatar-style'>
                  <Avatar
                    height='50px'
                    width='50px'
                    src={profile.avatar}
                  />
                </WrappedDiv>
                <WrappedDiv className = 'username-style'>
                  <p className='property-content'> {profile.username ? profile.username : <Deleted />}</p>
                  {/* <p className='property-content'> ({profile.status})</p> */}
                </WrappedDiv>
              </HeaderStyle>
              <Tabs>
                <TabList>
                  <Tab> Followed Posts</Tab>
                  {/* <Tab>Followed Categories</Tab> */}
                  {/* <Tab>Posts</Tab> */}
                  <Tab>Comments</Tab>
                  <Tab>Replies</Tab>
                </TabList>
                <TabPanel>
                  <WrappedDiv>
                    <SubWrapper>
                      {profile.discussionFollows.map((discussionFollowed, index) =>
                        <ContentDiv key={index}>
                          <Link to={`/discussion/${discussionFollowed.discussion_id}`}>
                            <PostHeader>
                              <DiscussionTitle>
                                <div className='content'>
                                  <p> {discussionFollowed.body}</p>
                                </div>
                              </DiscussionTitle>
                              <PostedBy>
                                <div className = 'd-creator'>
                                  <img alt='user' src={discussionFollowed.avatar} />
                                  <p className = 'username' to = {`/discussion/${discussionFollowed.discussion_id}`}> 
                                    {discussionFollowed.username}
                                  </p>
                                </div>
                                  &nbsp;
                                  &nbsp;
                                <div className='c-name'>
                                  <i className={discussionFollowed.category_icon} />
                                  <span>
                                    {discussionFollowed.category_name}
                                  </span>
                                </div>
                                <div className='c-time'>
                                  <span>
                                    {moment(new Date(Number(discussionFollowed.created_at))).fromNow()}
                                  </span>
                                </div>
                              </PostedBy>
                            </PostHeader>
                          </Link>
                        </ContentDiv>)}
                        </SubWrapper>
                  </WrappedDiv>
                </TabPanel>
              {/*<TabPanel>
                  <WrappedDiv>
                      {profile.categoryFollows.map((categoryFollowed, index) =>
                        <ContentDiv key={index}>
                          <Link to={`/discussions/category/${categoryFollowed.category_id}`}>
                            <p className='property-content'> {categoryFollowed.name}</p></Link>
                        </ContentDiv>)}
                  </WrappedDiv> 
                </TabPanel>*/}
                {/* <TabPanel>
                  <WrappedDiv>
                      {profile.discussions.map((discussion, index) => 
                        <SubContentDiv key={index}>
                          <p className='property-content'> {discussion.username}</p>
                          <p className='property-content'> {discussion.body}</p>
                          <p className='property-content'> {moment(new Date(Number(discussion.created_at))).fromNow()}</p>
                          <img alt='user' src = {discussion.avatar} />
                        </SubContentDiv>)}
                  </WrappedDiv>
                </TabPanel> */}
                <TabPanel>
                <WrappedDiv>
                    <SubWrapper>
                      {profile.posts.map((post, index) => 
                        <ContentDiv key={index}>
                          <Link to={`/discussion/${post.discussion_id}`}>
                          <PostHeader>
                            <DiscussionTitle>
                              <div className='content'>
                                <p> {post.body}</p>
                              </div>
                            </DiscussionTitle>
                            <PostedBy>
                              <div className = 'd-creator'>
                                  <img alt='user' src={post.avatar} />
                                  <p className = 'username' to = {`/discussion/${post.discussion_id}`}> 
                                    {post.username}
                                  </p>
                                </div>
                                  &nbsp;
                                  &nbsp;
                                <div className='c-time'>
                                  <span>
                                    {moment(new Date(Number(post.created_at))).fromNow()}
                                  </span>
                                </div>
                            </PostedBy>
                          </PostHeader>
                          </Link>
                        </ContentDiv>)}
                    </SubWrapper>
                </WrappedDiv>
                </TabPanel>
                <TabPanel>
                  <WrappedDiv>
                    <SubWrapper>
                      {profile.replies.map((reply, index) => 
                        <ContentDiv key={index}>
                          <Link to={`/discussion/${reply.discussion_id}`}>
                            <PostHeader>
                              <DiscussionTitle>
                                  <div className='content'>
                                    <p> {reply.body}</p>
                                  </div>
                              </DiscussionTitle>
                              <PostedBy>
                                <div className = 'd-creator'>
                                  <img alt='user' src={reply.avatar} />
                                  <p className = 'username' to = {`/discussion/${reply.discussion_id}`}> 
                                    {reply.username}
                                  </p>
                                </div>
                                  &nbsp;
                                  &nbsp;
                                <div className='c-time'>
                                  <span>
                                    {moment(new Date(Number(reply.created_at))).fromNow()}
                                  </span>
                                </div>
                              </PostedBy>
                            </PostHeader>
                          </Link>
                        </ContentDiv>)}
                    </SubWrapper>
                  </WrappedDiv>
                </TabPanel>
              </Tabs>
            </ProfileWrapper>
          </ProfileStyle>
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }
    return (
      <ProfileStyle>
        {profileItems}
      </ProfileStyle>
    );
  }
}

Profile.propTypes = {
  getProfile: PropTypes.func,
  profile: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string,
    }))
};

const mapStateToProps = state => ({
  profile: state.profilesData.singleProfileData
});

export default connect(mapStateToProps, { getProfile })(Profile);
