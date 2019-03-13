import React from 'react';
import styled from 'styled-components';

const HighlightWrapper = styled.span`
	background: #ddd;
	border-radius: 5px;
	padding: 0 2px;
	color: black;
`;

const Highlight = ({ text }) => <HighlightWrapper>{ text }</HighlightWrapper>;

export default Highlight;
