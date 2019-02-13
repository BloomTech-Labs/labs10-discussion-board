import React from 'react';
import styled from 'styled-components';

// views
import { TopPostsView }	from './index.js';

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

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopDiscussions = () => {
	return (
		<TopDiscussionsViewWrapper>
			<h1>Top Discussions</h1>
			<hr />
			<TopPostsView />
		</TopDiscussionsViewWrapper>
	);
};

export default TopDiscussions;
