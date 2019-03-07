import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { displayError } from '../store/actions/index.js';

const ErrorWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.errorWrapperBgColor};
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	overflow: auto;
	z-index: 9999;
`;

const ErrorBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: ${props => props.theme.errorBoxBgColor};
	padding: 10px;
	border-radius: 5px;
	border: 1px solid black;
	width: 300px;

	p {
		color: ${props => props.theme.errorBoxPColor};
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
