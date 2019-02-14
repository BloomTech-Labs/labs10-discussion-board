import React from 'react';
import styled from 'styled-components';
import Discuss from '../assets/img/Discuss.png';


// components
import { TopDiscussions } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionsViewWrapper = styled.div`
	border: 2px solid black;
	padding: 10px;

	hr {
		border-color: black;
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
	margin: 20px 0 20px 25px;
`;

const TopDiscussionsTitle = styled.div`
	display: flex;
	align-self: center;
	margin-left: 50px;
	font-size: 28px;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopDiscussionsView = () => {
	return (
		<TopDiscussionsViewWrapper>
			<TopDiscussionsHeader>
				<TopDiscussionsImage src={Discuss} alt='Top discussions' />
				<TopDiscussionsTitle><h1>Top Discussions</h1></TopDiscussionsTitle>
			</TopDiscussionsHeader>
			<hr />
			<TopDiscussions />
		</TopDiscussionsViewWrapper>
	);
};

export default TopDiscussionsView;
