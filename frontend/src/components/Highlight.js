import React from 'react';
import styled from 'styled-components';

const HighlightWrapper = styled.span`
	background: ${ ({ color }) => color };
	border-radius: 5px;
	padding: 0 2px;
	color: ${props => props.theme.highlightWrapperColor};
`;

const Highlight = ({ text, color }) => <HighlightWrapper color = { color }>{ text }</HighlightWrapper>;

export default Highlight;
