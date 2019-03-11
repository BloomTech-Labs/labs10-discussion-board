import React from 'react';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const VoteCountWrapper = styled.div`
	display: flex;
	margin-right: 10px;

	i {
		padding-left: 10px;
		padding-right: 5px;
	}

	.fa-arrow-alt-circle-up {
		${ ({ user_vote }) => user_vote === 1 && 'color: blue;' }

		&:hover {
		cursor: pointer;
		color: #3898d1;
		}
	}
	.fa-arrow-alt-circle-down {
		${ ({ user_vote }) => user_vote === -1 && 'color: red;' }

		&:hover {
		cursor: pointer;
		color: #e54340;
		}
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const VoteCount = ({
	upvotes,
	downvotes,
	handleVote,
	user_vote,
}) => {
	const handleClick = (e, type) => handleVote(e, type);
	return (
		<VoteCountWrapper user_vote = { user_vote }>
			<i onClick = { e => handleClick(e, 1) } className = 'fas fa-arrow-alt-circle-up' />
			<span>{ upvotes || 0 }</span>
			<i onClick = { e => handleClick(e, -1) } className = 'fas fa-arrow-alt-circle-down' />
			<span>{ downvotes || 0 }</span>
		</VoteCountWrapper>
	);
};

export default VoteCount;
