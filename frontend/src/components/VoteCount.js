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
			.fa-arrow-alt-circle-up {
				:hover {
				cursor: pointer;
				color: #3898d1;
				}
			}
			.fa-arrow-alt-circle-down {
				:hover {
				cursor: pointer;
				color: #e54340;
				}
			}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const VoteCount = ({ vote_count, handleVote }) => {
	return (
		<VoteCountWrapper>
			<i
				className = 'fas fa-arrow-alt-circle-up'
				onClick = { () => handleVote(1) }
			/>
			<div>{ vote_count }</div>
			<i
				className = 'fas fa-arrow-alt-circle-down'
				onClick = { () => handleVote(-1) }
			/>
		</VoteCountWrapper>
	);
};

export default VoteCount;
