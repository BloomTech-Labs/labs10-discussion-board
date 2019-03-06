import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { Highlight, Deleted } from './index.js';

const SearchCatResultWrapper = styled.div`
	border: 1px solid blue;
	border-radius: 5px;
	padding: 5px 10px;
	margin: 5px;

	.type {
		border-radius: 5px;
		margin: 0;
		background-color: ${props => props.theme.searchCatResultWrapperTypeBgColor};
		text-align: center;
		color: ${props => props.theme.searchCatResultWrapperTypeColor};
		padding: 7px;
	}

	.category-wrapper, .username-wrapper {
		border-radius: 5px;
		padding: 10px;
		font-weight: bold;

		&:hover {
			cursor: pointer;
			background-color: ${props => props.theme.searchCatResultWrapperUsernameBgColorHov};
			color: ${props => props.theme.searchCatResultWrapperUsernameColorHov};
		}
	}

	hr {
		border: 1px solid black;
	}
`;

const SearchCatResult = ({ category, goTo, searchText, type }) => {
	const {
		id,
		name,
		user_id,
		username,
		created_at,
	} = category;
	const handleCategoryClick = () => goTo(`/discussions/category/${ id }`);
	const handleUsernameClick = () => goTo(`/profile/${ user_id }`);
	searchText = searchText.toLowerCase();
	const lowerCaseName = name.toLowerCase();
	return(
		<SearchCatResultWrapper>
			{ type && <p className = 'type'>{ type }</p> }
			<div className = 'category-wrapper' onClick = { handleCategoryClick }>
				{
					// if it includes the searchText
					lowerCaseName.includes(searchText) ?
					(
						<p>
							{
								// render a substring of all the chars to the left of the searchText
								name.substr(0, lowerCaseName.indexOf(searchText))
							}
							<Highlight
								// highlight the searchText
								text = { name.substr(lowerCaseName.indexOf(searchText)).slice(0, searchText.length) }
								color = 'blue'
							/>
							{
								// render a substring of all the chars to the right of the searchText
								name.substr(lowerCaseName.indexOf(searchText) + searchText.length)
							}
						</p>
					) :
					(
						// else if it doesnt include the searchText, render the entirety of it
						<p>{ name }</p>
					)
				}
			</div>
			<hr />
			<p>Created by &nbsp;
				{
					username ?
					<span
						className = 'username-wrapper'
						onClick = { handleUsernameClick }
					>{ username }</span> :
					<Deleted />
				}
				<br />
				<br />
				{moment(new Date(Number(created_at))).fromNow()}
			</p>
		</SearchCatResultWrapper>
	);
};

export default SearchCatResult;
