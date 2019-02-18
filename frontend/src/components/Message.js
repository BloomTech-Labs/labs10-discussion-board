import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { displayMessage } from '../store/actions/index.js';

const MessageWrapper = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	position: absolute;
	z-index: 2;
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const MessageBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: #657ED4;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid black;
	width: 300px;

	p {
		color: black;
		font-weight: 700;
		text-align: center;
		margin: 10px;
	}
`;

const Message = ({ message, displayMessage }) => {
	return(
		<MessageWrapper>
			<MessageBox>
				<p>{ message }</p>
				<button onClick = { () => displayMessage('') }>OK</button>
			</MessageBox>
		</MessageWrapper>
	);
};

export default connect(null, { displayMessage })(Message);
