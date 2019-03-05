import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {phoneP, tabletP, } from '../globals/globals';

// views
import { TopDiscussionsView, HotDiscussionsView } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const LandingViewWrapper = styled.div`
  background-color: ${props => props.theme.landingViewWrapperBgColor};
  width: 740px;
  border-radius: 30px;
  
  @media ${tabletP}{
    display: flex;
    flex-direction: column;
    width: 90%;
    @media ${phoneP}{
      display: flex;
      flex-direction: column;
      width: 90%;
    }
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const LandingView = props => {
  return (
    <LandingViewWrapper>
      {props.loggingInLoadingMessage ? (
        <div>Logging in...</div>
      ) : (
        <div>
          <TopDiscussionsView />
          <HotDiscussionsView />
        </div>
      )}
    </LandingViewWrapper>
  );
};

// LandingView.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => {
  return {
    loggingInLoadingMessage: state.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  {}
)(LandingView);
