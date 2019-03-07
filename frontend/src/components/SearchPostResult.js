import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// globals
import { searchCharLimit } from '../globals/globals.js';

// components
import { Highlight, Deleted } from './index.js';

const SearchPostResultWrapper = styled.div`
	border: 1px solid green;
	border-radius: 5px;
	padding: 5px 10px;
	margin: 5px;

	.type {
		border-radius: 5px;
		margin: 0;
		background-color: ${props => props.theme.searchPostResultWrapperTypeBgColor};
		text-align: center;
		color: ${props => props.theme.searchPostResultWrapperTypeColor};
		padding: 7px;
	}

	.post-body-wrapper, .username-wrapper, .category-wrapper, .discussion-wrapper {
		border-radius: 5px;
		margin: 0;
		padding: 10px;
		font-weight: bold;

		&:hover {
			cursor: pointer;
			background-color: ${props => props.theme.searchPostResultWrapperUsernameBgColorHov};
			color: ${props => props.theme.searchPostResultWrapperUsernameColorHov};
		}
	}

	hr {
		border: 1px solid black;
	}
`;

const SearchPostResult = ({ post, goTo, searchText, scrollTo, pathname, type }) => {
	const {
		id,
		discussion_id,
		body,
		created_at,
		votes,
		user_id,
		username,
		discussion_body,
		category_id,
		category_name,
	} = post;
	const handleDiscussionClick = () => goTo(`/discussion/${ discussion_id }`);
	const handleCategoryClick = () => goTo(`/discussions/category/${ category_id }`);
	const handleUsernameClick = () => goTo(`/profile/${ user_id }`);
	const handlePostBodyClick = () => goTo(`/discussion/${ discussion_id }#${ id }`).then(() => {
		if (parseInt(pathname.slice(pathname.lastIndexOf('/') + 1)) === discussion_id) {
			return scrollTo(id);
		}
	});
	searchText = searchText.toLowerCase();
	const lowerCaseBody = body.toLowerCase();
	return(
		<SearchPostResultWrapper>
			{ type && <p className = 'type'>{ type }</p> }
			<p className = 'post-body-wrapper' onClick = { handlePostBodyClick }>
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
							color = 'green'
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
							color = 'green'
						/>
						{
							// if searchText is not at the end, place an ellipsis at the end
							lowerCaseBody.indexOf(searchText) + searchText.length >= body.length ? '' : ' ...'
						}
					</>
				}
			</p>
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
				<br />
				<br />
				{moment(new Date(Number(created_at))).fromNow()}
			</p>
			<div>In post &nbsp;
				<div onClick = { handleDiscussionClick } className = 'discussion-wrapper'>
					{
						// if discussion_body is longer than limit,
						// slice first chars up to limit, and include an ellipsis at the end.
						// else if shorter than limit, render the entirety of it
						discussion_body.length > searchCharLimit ? discussion_body.slice(0, searchCharLimit) + ' ...' : discussion_body
					}
				</div>
			</div>
			<p>In category
				<span
					onClick = { handleCategoryClick }
					className = 'category-wrapper'
				>{ category_name }</span>
			</p>
		</SearchPostResultWrapper>
	);
};

export default SearchPostResult;
