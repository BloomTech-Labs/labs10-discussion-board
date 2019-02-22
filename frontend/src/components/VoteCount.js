import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// action creators
import { displayError } from '../store/actions/index.js';

// components
import { ToolTip } from './index.js';

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
	position: relative;

	&:hover {
		.tooltiptext {
			visibility: visible;
			opacity: 1;
		}
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
	vote_count,
	handleVote,
	user_id,
	displayError,
	user_vote,
}) => {
	const handleClick = type => {
		if (user_id) return handleVote(type);
		return displayError('You must be logged in to vote.');
	};
	return (
		<VoteCountWrapper user_vote = { user_vote }>
			<i
				className = 'fas fa-arrow-alt-circle-up'
				onClick = { () => handleClick(1) }
			/>
			<div>{ vote_count }</div>
			<i
				className = 'fas fa-arrow-alt-circle-down'
				onClick = { () => handleClick(-1) }
			/>
			{
				!user_id &&
				<ToolTip
					text = 'You must be logged in to vote.' // must  be any string
					arrow = 'bottom' // must be string that says 'top', 'right', 'left', or 'bottom'
					width = { 100 } // must be a number
				/>
			}
		</VoteCountWrapper>
	);
};

const mapStateToProps = state => ({
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { displayError })(VoteCount);
