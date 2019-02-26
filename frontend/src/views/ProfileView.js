import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../assets/gif/spinner/Spinner'; //need to move to assets folder
import { getProfile } from '../store/actions/index';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {phoneP, PhoneL, tabletP, tabletL } from '../globals/globals';

// components
import { Avatar, Deleted } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;
  width: 480px;
  background-color: ${props => props.theme.profileBgColor};
  box-shadow: ${props => props.theme.profileBxShdw};
  @media (max-width: ${tabletP}){
    display: flex;
    flex-direction: column;
    width: 380px;
    @media(max-width: ${phoneP}){
      display: flex;
      flex-direction: column;
      width: 240px;
      
    }
  }
  
  
  .discussion-title {
    font-weight: bold;
  }
`;

const WrappedDiv = styled.div`
  margin: 5px;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-self: center;
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
      @media(max-width: ${phoneP}){
        display: none;
      }
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
`
const SubContentDiv = styled.div`
margin: 5px;
padding: 2%;
display: flex;
flex-direction: column;
align-self: center;
margin: 3px;
padding: 3px;
color: ${props => props.theme.profileTitleSubContentDColor};
@media (max-width: ${tabletP}){
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 3px;
  padding: 3px;
  @media(max-width: ${phoneP}){
    display: none;
  }
}
`

const ProfileTitle = styled.div`
  margin: 5px;
  padding: 2%;
  display: flex;
  font-weight: bold;
  justify-content: space-around;
  color: black;
  font-size: 36px;
`;

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
          <div key={index}>
            <ProfileWrapper>
              <WrappedDiv>
                <Avatar
                  height = '50px'
                  width = '50px'
                  src = { profile.avatar }
                />
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-title'> Username: </p>
                <p className='property-content'> {profile.username ? profile.username : <Deleted />}</p>
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-title'> Status: </p>
                <p className='property-content'> {profile.status}</p>
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-title'> Followed Discussions: </p>
                {profile.discussionFollows.map((discussionFollowed, index)=> 
                  <ContentDiv key = {index}>
                    <Link to = {`/discussion/${discussionFollowed.discussion_id}`}><p className='property-content'> {discussionFollowed.title}</p></Link>
                  </ContentDiv>)}
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-title'> Followed Categories: </p>
                {profile.categoryFollows.map((categoryFollowed, index)=> 
                  <ContentDiv key = {index}>
                    <Link to = {`/discussions/category/${categoryFollowed.category_id}`}><p className='property-content'> {categoryFollowed.name}</p></Link>
                  </ContentDiv>)}
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-titleC'> Discussions: </p>
                {profile.discussions.map((discussion, index)=> <SubContentDiv key= {index}>{discussion.title}</SubContentDiv>)}
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-titleC'> Posts: </p>
                <Elip>{profile.posts.map((post, index)=> <SubContentDiv key= {index}>{post.body}</SubContentDiv>)}</Elip>
              </WrappedDiv>
            </ProfileWrapper>
          </div>
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }
    return (
      <div>
        {/* <ProfileTitle> PROFILE </ProfileTitle> */}
        {profileItems}
      </div>
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

export default connect(mapStateToProps,{ getProfile })(Profile);
