import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { displayError } from '../store/actions/index.js';

const ErrorWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	overflow: auto;
	z-index: 2;
`;

const ErrorBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: #C9C19F;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid black;
	width: 300px;

	.fa-exclamation-triangle {
		font-size: 1.2rem;
		color: #b30000;
		margin: 10px;
	}

	p {
		color: #b30000;
		font-weight: 700;
		text-align: center;
		margin: 10px;
	}
`;

const Error = ({ error, displayError }) => {
	return(
		<ErrorWrapper>
			<ErrorBox>
				<p>{ error }</p>
				<button onClick = { () => displayError('') }>OK</button>
			</ErrorBox>
		</ErrorWrapper>
	);
};

export default connect(null, { displayError })(Error);
