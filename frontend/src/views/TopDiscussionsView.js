import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Discuss from '../assets/img/Discuss.png';
import TextLoop from "react-text-loop";


// components
import { TopDiscussions } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionsViewWrapper = styled.div`
	border: 0px solid black;
	padding: 10px;
	box-shadow: gray 0px 0px;
	hr {
		border-color: gray;
	}
`;

const TopDiscussionsImage = styled.img`
	src: url(${props => props.src});
	display: flex;
	height: 150px;
	width: 150px;
`;

const TopDiscussionsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0 20px 25px;

	.logotopd {
		display: flex;
	}

	.x0 {
		width: 600px;
		display: flex;
		justify-content: flex-end;
		font-size: 40px;
		padding-right: 40px;
	}
`;

const TopDiscussionsTitle = styled.div`
	display: flex;
	align-self: center;
	font-size: 18px;
	margin-left: 25px;
	color: white;
`;

const TextLooper = styled.div`
	display: flex;
	align-self: center;
	font-size: 28px;
	margin-left: 50px;
	color: white;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopDiscussionsView = () => {
	return (
		<TopDiscussionsViewWrapper>
			<TopDiscussionsHeader>
				<div className = 'logotopd'>
					<TopDiscussionsImage src={Discuss} alt='Top discussions' />
						<TopDiscussionsTitle>
							<h1>Top Discussions</h1>
						</TopDiscussionsTitle>
				</div>
				<TextLooper>
                <TextLoop>
                    <span>See what's being discussed</span>
                    <span>Find your interests</span>
                    <span>Start talking!</span>
				</TextLoop>{" "}
				</TextLooper>
			</TopDiscussionsHeader>
			<hr />
			<TopDiscussions />
		</TopDiscussionsViewWrapper>
	);
};

export default TopDiscussionsView;
