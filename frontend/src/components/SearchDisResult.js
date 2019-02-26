import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// globals
import { searchCharLimit } from '../globals/globals.js';

// components
import { Highlight, Deleted } from './index.js';

const SearchDisResultWrapper = styled.div`
	border: 1px solid red;
	border-radius: 5px;
	padding: 5px 10px;
	margin: 5px;

	.type {
		border-radius: 5px;
		margin: 0;
		background-color: ${props => props.theme.searchDisResultWrapperTypeBgColor};
		text-align: center;
		color: ${props => props.theme.searchDisResultWrapperTypeColor};
	}

	.discussion-wrapper, .username-wrapper, .category-wrapper {
		font-weight: bold;
		border-radius: 5px;
		padding: 10px;

		&:hover {
			cursor: pointer;
			background-color: ${props => props.theme.searchDisResultWrapperUsernameBgColorHov};
			color: ${props => props.theme.searchDisResultWrapperUsernameColorHov};
		}
	}

	hr {
		border: 1px solid black;
	}
`;

const SearchDisResult = ({ discussion, goTo, searchText, type }) => {
	const {
		id,
		title,
		body,
		user_id,
		username,
		created_at,
		votes,
		category_id,
		category_name,
	} = discussion;
	const handleCategoryClick = () => goTo(`/discussions/category/${ category_id }`);
	const handleDiscussionClick = () => goTo(`/discussion/${ id }`);
	const handleUsernameClick = () => goTo(`/profile/${ user_id }`);
	searchText = searchText.toLowerCase();
	const lowerCaseTitle = title.toLowerCase();
	const lowerCaseBody = body.toLowerCase();
	return(
		<SearchDisResultWrapper>
			{ type && <p className = 'type'>{ type }</p> }
			<div className = 'discussion-wrapper' onClick = { handleDiscussionClick }>
				{
					// if it includes the searchText
					lowerCaseTitle.includes(searchText) ?
					(
						<p>
							{
								// if the portion after the searchText is longer than or equal to
								// the portion before it, render this portion
								title.substr(lowerCaseTitle.indexOf(searchText)).length >= title.substr(0, lowerCaseTitle.indexOf(searchText)).length ?
								<>
									{
										// if searchText is not at the beginning,
										// place an ellipsis at the beginning
										lowerCaseTitle.indexOf(searchText) === 0 ? '' : '... '
									}
									<Highlight
										// highlight the searchText
										text = { title.substr(lowerCaseTitle.indexOf(searchText)).slice(0, searchText.length) }
										color = 'red'
									/>
									{
										// render a substring of all the chars to the right
										// of the searchText, up to a limit.
										// if the length exceeds limit, include an ellipsis at the end.
										title.substr(lowerCaseTitle.indexOf(searchText) + searchText.length, searchCharLimit) + (title.substr(lowerCaseTitle.indexOf(searchText)).length > searchCharLimit ? ' ...' : '')
									}
								</>
								:
								// else if the portion before the searchText is longer, render this portion
								<>
									{
										// render a substring of all the chars to the left
										// of the searchText, up to a limit,
										// starting at the searchText and going left.
										// if the length exceeds limit, include an ellipsis at the beginning.
										(title.substring(0, lowerCaseTitle.indexOf(searchText)).length > searchCharLimit ? '... ' : '') + title.substring(0, lowerCaseTitle.indexOf(searchText)).slice(-searchCharLimit)
									}
									<Highlight
										// highlight the searchText
										text = { title.substr(lowerCaseTitle.indexOf(searchText)).slice(0, searchText.length) }
										color = 'red'
									/>
									{
										// if searchText is not at the end, place an ellipsis at the end
										lowerCaseTitle.indexOf(searchText) + searchText.length >= title.length ? '' : ' ...'
									}
								</>
							}
						</p>
					) :
					(
						// else if it doesnt include the searchText and is longer than limit,
						// slice first chars up to limit, and include an ellipsis at the end.
						// else if shorter than limit, render the entirety of it
						title.length > searchCharLimit ?
						<p>{ title.slice(0, searchCharLimit) + ' ...' }</p> :
						<p>{ title }</p>
					)
				}
				{
					// if it includes the searchText
					lowerCaseBody.includes(searchText) ?
					(
						<p>
							{
								// if the portion after the searchText is longer than or equal to
								// the portion before it, render this portion
								body.substr(lowerCaseBody.indexOf(searchText)).length >= body.substr(0, lowerCaseBody.indexOf(searchText)).length ?
								<>
									{
										// if searchText is not at the beginning,
										// place an ellipsis at the beginning
										lowerCaseBody.indexOf(searchText) === 0 ? '' : '... '
									}
									<Highlight
										// highlight the searchText
										text = { body.substr(lowerCaseBody.indexOf(searchText)).slice(0, searchText.length) }
										color = 'red'
									/>
									{
										// render a substring of all the chars to the right
										// of the searchText, up to a limit.
										// if the length exceeds limit, include an ellipsis at the end.
										body.substr(lowerCaseBody.indexOf(searchText) + searchText.length, searchCharLimit) + (body.substr(lowerCaseBody.indexOf(searchText)).length > searchCharLimit ? ' ...' : '')
									}
								</>
								:
								// else if the portion before the searchText is longer, render this portion
								<>
									{
										// render a substring of all the chars to the left
										// of the searchText, up to a limit,
										// starting at the searchText and going left.
										// if the length exceeds limit, include an ellipsis at the beginning.
										(body.substring(0, lowerCaseBody.indexOf(searchText)).length > searchCharLimit ? '... ' : '') + body.substring(0, lowerCaseBody.indexOf(searchText)).slice(-searchCharLimit)
									}
									<Highlight
										// highlight the searchText
										text = { body.substr(lowerCaseBody.indexOf(searchText)).slice(0, searchText.length) }
										color = 'red'
									/>
									{
										// if searchText is not at the end, place an ellipsis at the end
										lowerCaseBody.indexOf(searchText) + searchText.length >= body.length ? '' : ' ...'
									}
								</>
							}
						</p>
					) :
					(
						<p>
							{
								// else if it doesnt include the searchText and is longer than limit,
								// slice first chars up to limit, and include an ellipsis at the end.
								// else if shorter than limit, render the entirety of it
								body.length > searchCharLimit ?
								body.slice(0, searchCharLimit) + ' ...' : body
							}
						</p>
					)
				}
			</div>
			<hr />
			<p>{ votes } vote{ votes !== '1' && 's' }</p>
			<p>Posted by &nbsp;
				{
					username ?
					<span
						className = 'username-wrapper'
						onClick = { handleUsernameClick }
					>{ username }</span> :
					<Deleted />
				}
				&nbsp; {moment(new Date(Number(created_at))).fromNow()}
			</p>
			<p>In category
				<span
					onClick = { handleCategoryClick }
					className = 'category-wrapper'
				>{ category_name }</span>
			</p>
		</SearchDisResultWrapper>
	);
};

export default SearchDisResult;
