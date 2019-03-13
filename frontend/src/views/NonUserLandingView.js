import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { tabletP } from '../globals/globals';
import { socrates} from '../assets/index.js';

const Woah = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  background-image: url(${socrates});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

.blurb{
    width: 300px;
    font-size: 1.4rem;
    position: absolute;
    height: 100px;
    top: 180px;
    right: 100px;
}
`;

const LandingText = styled.div `
    height: 100%
    width: 40%
    `
const VideoPlayer = styled.div `
    width: 50%;
    padding-top: 40%
    position: relative;
    .vid-player{
         width: 100%;
         height: 100%;
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

const TopDiscussionsImage = styled.img`
   src: url(${socrates});
    display: flex;
    height: 100%;
   width: 100%;
 `;

const Vidception = styled.div `
  width: 60%;
  height: 100%;
  padding: 130px;
  padding-left: 0px;
  `;


class NonUserLandingView extends Component {
  render () {
    return(

        <Woah>
          <LandingText>
            <p className = 'blurb'>
              Symposium is a place where like-minded people can come together to share and discuss ideas.
            </p>
          </LandingText>
          <Vidception>
            <VideoPlayer>
              <ReactPlayer 
              className = 'vid-player' 
              url='https://youtu.be/T-Dji780Ro0' 
              width = '100%' height = '100%' 
              controls = {true}/>
            </VideoPlayer>
          </Vidception>
        
        </Woah>
         )
  }
}

export default NonUserLandingView;