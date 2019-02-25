import React from 'react';
import styled from 'styled-components';

const HighlightWrapper = styled.span`
	background: ${ ({ color }) => color };
	border-radius: 5px;
	padding: 0 2px;
	color: white;
`;

const Highlight = ({ text, color }) => <HighlightWrapper color = { color }>{ text }</HighlightWrapper>;

export default Highlight;
