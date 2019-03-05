import React from 'react';
import styled from 'styled-components';
import Discuss from '../assets/img/Discuss.png';
import TextLoop from 'react-text-loop';
import {phoneP, tabletP, } from '../globals/globals';

// components
import { HotDiscussions } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const ViewWrapper = styled.div`
  background-color: ${props => props.theme.landingViewWrapperBgColor};
  width: 740px;
  border-radius: 30px;
  margin-right: 30%;
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

 const HotDiscussionsViewWrapper = styled.div`
  border: 0px solid black;
  padding: 5px;
  box-shadow: gray 0px 0px;
  hr {
    border-color: gray;
    margin-top: -10px;
    margin-bottom: 20px;
  }
`;

const HotDiscussionsImage = styled.img`
  src: url(${props => props.src});
  display: flex;
  height: 120px;
  width: 120px;
`;

const HotDiscussionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;

  .logotopd {
    display: flex;
  }

  .x0 {
    width: 400px;
    display: flex;
    justify-content: flex-end;
    font-size: 30px;
    padding-right: 10px;
  }
`;

const HotDiscussionsTitle = styled.div`
  display: flex;
  align-self: center;
  font-size: 18px;
  margin-left: 25px;
  color: ${props => props.theme.topDiscussionTitleColor};
  width: 20px;
  .toptitle{
    @media  ${tabletP}{
    
      @media${phoneP}{
        display: flex;
        align-content: center;
        font-size: px;
      }
    }

  }
  
`;

const TextLooper = styled.div`
  display: flex;
  align-self: center;
  font-size: 24px;
  color: ${props => props.theme.topDiscussionTitleColor};
  @media (max-width: 768px){
    display: none;
  }
  .looptext {
    font-size: 22px;
  }
`;



/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const HotDiscussionsView = () => {
  return (
    <ViewWrapper>
		<HotDiscussionsViewWrapper>
			<HotDiscussionsHeader>
				<div className='logotopd'>
				<HotDiscussionsImage src={Discuss} alt='Hot discussions' />
				<HotDiscussionsTitle>
					<h1 className ='toptitle'>Hot Discussions</h1>
				</HotDiscussionsTitle>
				</div>
				<TextLooper>
				<TextLoop className = 'looptext'>
					<span className = 'looptext'>See what's being discussed</span>
					<span className = 'looptext'>Find your interests</span>
					<span className = 'looptext'>Start talking!</span>
				</TextLoop>{' '}
				</TextLooper>
			</HotDiscussionsHeader>
			<hr />
			<HotDiscussions />
		</HotDiscussionsViewWrapper>
	</ViewWrapper>
  );
};

export default HotDiscussionsView;
