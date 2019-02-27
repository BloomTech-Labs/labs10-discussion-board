import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {phoneP, tabletP, } from '../globals/globals';

// views
import { TopDiscussionsView } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const LandingViewWrapper = styled.div`
  background-color: #976DFF;
  width: 840px;
  border-radius: 30px;
  @media (max-width: ${tabletP}){
    display: flex;
    flex-direction: column;
    width: 380px;
    @media(max-width: ${phoneP}){
      display: flex;
      flex-direction: column;
      width: 240px;
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
        <TopDiscussionsView />
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
