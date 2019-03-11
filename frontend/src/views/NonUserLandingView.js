import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { tabletP } from '../globals/globals';
 
const VideoPlayer = styled.div `
    margin-top: 5%;
    width: 70%;
    padding-top: 40%
    position: relative;
    .vid-player{
         width: auto;
         height: auto;
         position: absolute;
         top: 0;
      @media ${tabletP} {
          width: 50%;
        }
    }
    @media (max-width: 1350px){
        padding-top: 26%;
        width: 50%;
    }
`;
class NonUserLandingView extends Component {
  render () {
    return(
        <VideoPlayer>
            <ReactPlayer 
            className = 'vid-player' 
            url='https://youtu.be/T-Dji780Ro0' 
            width = '100%' height = '100%' 
            controls = {true}/>
         </VideoPlayer>
         )
  }
}

export default NonUserLandingView;