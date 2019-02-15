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
	border: 2px solid black;
	padding: 5px;

	hr {
		border-color: black;
		margin-top: -10px;
		margin-bottom 20px;
	}
`;

const TopDiscussionsImage = styled.img`
	src: url(${props => props.src});
	display: flex;
	height: 120px;
	width: 120px;
`;

const TopDiscussionsHeader = styled.div`
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
		font-size: 40px;
		padding-right: 10px;
	}
`;

const TopDiscussionsTitle = styled.div`
	display: flex;
	align-self: center;
	font-size: 28px;
	margin-left: 30px;
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
                <TextLoop>
                    <span>See what's being discussed</span>
                    <span>Find your interests</span>
                    <span>Start talking!</span>
                </TextLoop>{" "}
			</TopDiscussionsHeader>
			<hr />
			<TopDiscussions />
		</TopDiscussionsViewWrapper>
	);
};

export default TopDiscussionsView;
