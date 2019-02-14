import React from 'react';
import styled from 'styled-components';
import Discuss from '../assets/img/Discuss.png';

// components
import { TopDiscussions } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionsViewWrapper = styled.div`
	display: flex;
	border: 2px solid black;
	padding: 10px;

	hr {
		border-color: black;
		margin-left: 50px;
	}
`;

const TopDiscussionsImage = styled.img`
	src: url(${props => props.src});
	display: flex;
	height: 150px;
	width: 150px;
`;

const TopDiscussionsHeader = styled.div`
	align-self: flex-end;
	margin-left: 25px;
	margin-bottom: 20px;
	font-size: 22px;
`

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopDiscussionsView = () => {
	return (
		<TopDiscussionsViewWrapper>
			<TopDiscussionsImage src={Discuss} alt='Top discussions' />
			<TopDiscussionsHeader><h1>Top Discussions</h1></TopDiscussionsHeader>
			<hr />
			<TopDiscussions />
		</TopDiscussionsViewWrapper>
	);
};

export default TopDiscussionsView;
