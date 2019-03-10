import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../assets/gif/spinner/Spinner'; //need to move to assets folder
import { getProfile } from '../store/actions/index';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { phoneP, tabletP, } from '../globals/globals';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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
  // border: ${props => props.theme.profileBorder};
  width: 92%;
  // box-shadow: ${props => props.theme.profileBxShdw};
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
  }
  .username-style { 
    font-size: 18px;
    // margin-top: -60px;
    // margin-right: 80%;

  }
  .status-style {
    // margin-right: 80%;
    font-size: 10px;
    font-style: italic;
    // margin-top: -20px;
  }
  @media ${tabletP}{
    display: flex;
    flex-direction: column;
    width: 380px;
    @media ${phoneP} {
      display: flex;
      flex-direction: column;
      width: 240px;
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
  margin: 5px;
  padding: 2%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3px;
  padding: 3px;
  .property-title {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: 3px;
    padding: 3px;
    color: ${props => props.theme.profileTitleColor};
  }
  .property-titleC {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: 3px;
    padding: 3px;
    color: ${props => props.theme.profileTitleContentColor};
      @media ${phoneP} {
        display: none;
      }
    }
  .property-content {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: space-around;
    margin: 3px;
    padding: 3px;
    color: ${props => props.theme.profileTitleContentColor};
  }
`;

const ContentDiv = styled.div`
margin: 5px;
padding: 2%;
display: flex;
flex-direction: column;
align-self: center;
margin: 3px;
padding: 3px;
color: ${props => props.theme.profileTitleContentDColor};
`;

const SubContentDiv = styled.div`
margin: 5px;
padding: 2%;
display: flex;
flex-direction: column;
align-self: center;
margin: 3px;
padding: 3px;
display: inline;
-webkit-line-clamp: 3;
text-overflow: ellipsis;
overflow: hidden;
display: -webkit-box;
-webkit-box-orient: vertical;
word-break: break-word;
color: ${props => props.theme.profileTitleSubContentDColor};

@media ${tabletP}{
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 3px;
  padding: 3px;
  @media ${phoneP} {
    display: none;
  }
}
`;

// const ProfileTitle = styled.div`
//   margin: 5px;
//   padding: 2%;
//   display: flex;
//   font-weight: bold;
//   justify-content: space-around;
//   color: black;
//   font-size: 36px;
// `;

const Elip = styled.div`
  display: inline;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
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
                  <p className='property-content'> ({profile.status})</p>
                </WrappedDiv>
              </HeaderStyle>
              <Tabs>
                <TabList>
                  <Tab> Followed Post</Tab>
                  <Tab>Followed Categories</Tab>
                  <Tab>Posts</Tab>
                  <Tab>Comments</Tab>
                  <Tab>Replies</Tab>
                </TabList>
                <TabPanel>
                  <WrappedDiv>
                    <p className='property-title'> Followed Posts </p>
                      {profile.discussionFollows.map((discussionFollowed, index) =>
                        <ContentDiv key={index}>
                          <Link to={`/discussion/${discussionFollowed.discussion_id}`}>
                            <p className='property-content'> {discussionFollowed.body}</p></Link>
                        </ContentDiv>)}
                  </WrappedDiv>
                </TabPanel>
                <TabPanel>
                  <WrappedDiv>
                    <p className='property-title'> Followed Categories: </p>
                      {profile.categoryFollows.map((categoryFollowed, index) =>
                        <ContentDiv key={index}>
                          <Link to={`/discussions/category/${categoryFollowed.category_id}`}>
                            <p className='property-content'> {categoryFollowed.name}</p></Link>
                        </ContentDiv>)}
                  </WrappedDiv>
                </TabPanel>
                <TabPanel>
                  <WrappedDiv>
                    <p className='property-titleC'> Posts: </p>
                      {profile.discussions.map((discussion, index) => 
                        <SubContentDiv key={index}>
                          {discussion.body}
                        </SubContentDiv>)}
                  </WrappedDiv>
                </TabPanel>
                <TabPanel>
                <WrappedDiv>
                    <p className='property-titleC'> Comments: </p>
                      <Elip>{profile.posts.map((post, index) => 
                        <SubContentDiv key={index}>
                          {post.body}</SubContentDiv>)}
                      </Elip>
                </WrappedDiv>
                </TabPanel>
                <TabPanel>
                  <WrappedDiv>
                    <p className='property-titleC'> Replies: </p>
                      {profile.replies.map((reply, index) => 
                        <SubContentDiv key={index}>
                          {reply.body}
                        </SubContentDiv>)}
                  </WrappedDiv>
                </TabPanel>
                <TabPanel>
                  TEST
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
