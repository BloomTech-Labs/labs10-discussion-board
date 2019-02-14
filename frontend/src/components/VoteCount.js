import React from 'react';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const VoteCountWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	margin: 5px;
	padding: 10px;
	border: 1px solid black;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const VoteCount = ({ vote_count }) => {
	return (
		<VoteCountWrapper>
			<i className = 'fas fa-arrow-alt-circle-up' />
			<div>{ vote_count }</div>
			<i className = 'fas fa-arrow-alt-circle-down' />
		</VoteCountWrapper>
	);
};

export default VoteCount;
