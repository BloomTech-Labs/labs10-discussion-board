import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../assets/gif/spinner/Spinner'; //need to move to assets folder
import { getProfile } from '../store/actions/index';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const ProfilesWrapper = styled.div`
	margin: 4%;
	padding: 10px;
  border: 1px solid black;
  display: flex;
  align-content: space-between;
  width: 100%;
  background-color: #EEE7C8;

	.discussion-title {
		font-weight: bold;
  }
`;

const WrappedDiv = styled.div`
  margin: 5px;
  padding: 2%;
  display: flex;
  
  .property-title {
    font-weight: bold;
    display: flex;
    justify-content: space-around;
  }
  .property-titlee {
    font-weight: bold;
    display: flex;
    justify-content: space-around;
    color: white;
  }

  .property-content {
    padding: 0 0 0 5%;
    display: flex;
    justify-content: space-around;
  }
  `;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Profile extends Component {
    componentDidMount() {
      this.props.getProfile(this.props.match.params.id);
      console.log('profile component', this.props);
    }
  
    render() {
        let profileItems;
        console.log('save it', this.props.profile)
      
    if (this.props.profile.length === 0) {
        profileItems = <Spinner />;
    } else {
        if (this.props.profile) {
          profileItems = this.props.profile.map( (profile, index) => 
          <div key= {index}>
          <ProfilesWrapper>
            <WrappedDiv>
              <p className = 'property-title'> </p>
              <p className = 'property-content'> {profile.id}</p>
            </WrappedDiv>
            <WrappedDiv>
              <p className = 'property-title'> Username: </p>
              <p className = 'property-content'> {profile.username}</p>
            </WrappedDiv>
            <WrappedDiv>
              <p className = 'property-title'> Email: </p>
              <p className = 'property-content'> {profile.email}</p>
            </WrappedDiv>
            <WrappedDiv>
              <p className = 'property-title'> Status: </p>
              <p className = 'property-content'> {profile.status}</p>
            </WrappedDiv>
          </ProfilesWrapper>
          </div>)
        } else {
          profileItems = <h4>No profiles found...</h4>;
        }
    }
    console.log('profile props', this.props);
    return (
        
            <div>
              <h1 className = 'property-titlee'> PROFILE work</h1>
              {profileItems}
            </div>
        );
    }
}
  
//  Profile.propTypes = {
//     getProfile: PropTypes.func.isRequired,
//     profile: PropTypes.shape({
//       status: PropTypes.string,
//       username: PropTypes.string,
//       email: PropTypes.string,
//     })
// };
  
const mapStateToProps = state => ({
        profile: state.profile.profile
});
  
export default connect(mapStateToProps, { getProfile })(Profile);
  