import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

// globals
import { backendUrl } from '../globals/globals.js';

// assets
import { spinner2 } from '../assets/index.js';

// components
import { SearchCatResult, SearchDisResult, SearchPostResult } from './index.js';

// action creators
import { getCategories, displayError } from '../store/actions/index.js';

const SearchWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.searchWrapperBgColor};
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	overflow: auto;
	z-index: 9001;
	max-height: 100%;
`;

const SearchBox = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: ${props => props.theme.searchBoxBgColor};
	padding: 30px 10px 0 10px;
	border-radius: 5px;
	border: ${props => props.theme.searchBoxBorder};
	position: relative;
	height: 85%;
	width: 65%;

	.close-btn {
		border:1px solid white;
		border-radius: 10px;
		background-color: ${props => props.theme.searchBoxCloseBtnBgColor};
		padding: 5px 10px;
		position: absolute;
		top: 0;
		right: 0;
		color: white;

		&:hover {
			cursor: pointer;
		}
	}

	.search-by-wrapper {
		/* The container */
		.container {
			display: inline-block;
			position: relative;
			padding: 10px 10px 10px 35px;
			margin: 12px;
			cursor: pointer;
			font-size: 22px;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			border: 1px solid black;
			border-radius: 5px;
		}

		/* Hide the browser's default radio button */
		.container input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
		}

		/* Create a custom radio button */
		.checkmark {
			position: absolute;
			top: 0;
			left: 0;
			height: 25px;
			width: 25px;
			background-color: #eee;
			border-radius: 50%;
			margin-top: 12px;
			margin-left: 5px;
		}

		/* On mouse-over, add a grey background color */
		.container:hover input ~ .checkmark {
			background-color: #ccc;
		}

		/* When the radio button is checked, add a blue background */
		.container input:checked ~ .checkmark {
			background-color: #2196F3;
		}

		/* Create the indicator (the dot/circle - hidden when not checked) */
		.checkmark:after {
			content: "";
			position: absolute;
			display: none;
		}

		/* Show the indicator (dot/circle) when checked */
		.container input:checked ~ .checkmark:after {
			display: block;
		}

		/* Style the indicator (dot/circle) */
		.container .checkmark:after {
			top: 9px;
			left: 9px;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: white;
		}
	}

	.search-input-wrapper {
		.search-input {
			border-radius: 10px;
			padding: 5px 10px;
		}
	}

	.search-results-wrapper {
		height: 75%;
		overflow: auto;

		.results-length {
			text-align: center;
		}
	}
`;

// constants
const categories = 'categories';
const discussions = 'discussions';
const posts = 'posts';
const all = 'all';
const created_at = 'created_at';
const votes = 'votes';
const name = 'name';
const desc = 'desc';
const asc = 'asc';

class Search extends Component {
	state = {
		searchBy: categories,
		searchText: '',
		searchResults: [],
		loading: false,
		order: created_at, // created_at or (votes or name)
		orderType: desc, // asc or desc
	};
	searchCategories = () => {
		const { displayError } = this.props;
		const { searchText, order, orderType } = this.state;
		const headers = { headers: { searchText, order, orderType } };
		return this.setState({ loading: true }, () => {
			return axios.get(`${ backendUrl }/categories/search`, headers)
				.then(res => this.setState({ searchResults: res.data }))
				.then(() => this.setState({ loading: false }))
				.catch(err => {
					const errMsg = err.response ? err.response.data.error : err.toString();
					return displayError(errMsg).then(() => this.setState({ loading: false }));
				});
		});
	};
	searchDiscussions = () => {
		const { displayError } = this.props;
		const { searchText, order, orderType } = this.state;
		const headers = { headers: { searchText, order, orderType } };
		return this.setState({ loading: true }, () => {
			return axios.get(`${ backendUrl }/discussions/search`, headers)
				.then(res => this.setState({ searchResults: res.data }))
				.then(() => this.setState({ loading: false }))
				.catch(err => {
					const errMsg = err.response ? err.response.data.error : err.toString();
					return displayError(errMsg).then(() => this.setState({ loading: false }));
				});
		});
	};
	searchPosts = () => {
		const { displayError } = this.props;
		const { searchText, order, orderType } = this.state;
		const headers = { headers: { searchText, order, orderType } };
		return this.setState({ loading: true }, () => {
			return axios.get(`${ backendUrl }/posts/search`, headers)
				.then(res => this.setState({ searchResults: res.data }))
				.then(() => this.setState({ loading: false }))
				.catch(err => {
					const errMsg = err.response ? err.response.data.error : err.toString();
					return displayError(errMsg).then(() => this.setState({ loading: false }));
				});
		});
	};
	searchAll = () => {
		const { displayError } = this.props;
		const { searchText, orderType } = this.state;
		const headers = { headers: { searchText, orderType } };
		return this.setState({ loading: true }, () => {
			return axios.get(`${ backendUrl }/users/search-all`, headers)
				.then(res => this.setState({ searchResults: res.data }))
				.then(() => this.setState({ loading: false }))
				.then(() => console.log("SEARCH ALL STATE", this.state))
				.catch(err => {
					const errMsg = err.response ? err.response.data.error : err.toString();
					return displayError(errMsg).then(() => this.setState({ loading: false }));
				});
		});
	};
	handleSearch = () => {
		const { searchBy } = this.state;
		switch(searchBy) {
			case categories:
				return this.searchCategories();
			case discussions:
				return this.searchDiscussions();
			case posts:
				return this.searchPosts();
			case all:
				return this.searchAll();
			default:
				return;
		};
	};
	handleSelectChange = e => this.setState({ [e.target.name]: e.target.value }, () => {
		return this.handleSearch();
	});
	handleInputChange = e => {
		return this.setState({ [e.target.name]: e.target.value, searchResults: [] }, () => {
			const { searchBy, order } = this.state;
			if (searchBy === categories && order === votes) {
				return this.setState({ order: name }, () => this.handleSearch());
			}
			if (searchBy !== categories && order === name) {
				return this.setState({ order: votes }, () => this.handleSearch());
			}
			if (searchBy === all && order !== created_at) {
				return this.setState({ order: created_at }, () => this.handleSearch());
			}
			return this.handleSearch();
		});
	};
	render() {
		const { searchBy, searchText, searchResults, loading, order, orderType } = this.state;
		const { toggleSearch, goTo, pathname, scrollTo } = this.props;
		return(
			<SearchWrapper>
				<SearchBox>
					<span className = 'close-btn' onClick = { toggleSearch }>X</span>

					<div className = 'search-by-wrapper'>
						<label className = 'container'>Categories
							<input
								type = 'radio'
								checked = { searchBy === categories }
								name = 'searchBy'
								value = { categories }
								onChange = { this.handleInputChange }
							/>
							<span className = 'checkmark' />
						</label>

						<label className = 'container'>Discussions
							<input
								type = 'radio'
								name = 'searchBy'
								value = { discussions }
								onChange = { this.handleInputChange }
							/>
							<span className ='checkmark' />
						</label>

						<label className = 'container'>Posts
							<input
								type = 'radio'
								name = 'searchBy'
								value = { posts }
								onChange = { this.handleInputChange }
							/>
							<span className ='checkmark' />
						</label>

						<label className = 'container'>All
							<input
								type = 'radio'
								name = 'searchBy'
								value = { all }
								onChange = { this.handleInputChange }
							/>
							<span className ='checkmark' />
						</label>
					</div>

					<div className = 'order-type-wrapper'>
						<span>Sort by: </span>
						{
							searchBy === all ?
							<span>date created &nbsp;</span> :
							<>
								<select onChange = { this.handleSelectChange } name = 'order'>
									<option value = { created_at }>date created</option>
									<option value = { searchBy === categories ? name : votes }>
										{ searchBy === categories ? name : votes }
									</option>
								</select>
							</>
						}
						<select onChange = { this.handleSelectChange } name = 'orderType'>
							<option value = { desc }>
								{
									order === created_at ? 'most recent first' :
									order === name ? 'reverse alphabetical order' : 'most first'
								}
							</option>
							<option value = { asc }>
								{
									order === created_at ? 'least recent first' :
									order === name ? 'alphabetical order' : 'least first'
								}
							</option>
						</select>
					</div>

					<div className = 'search-input-wrapper'>
						<input
							type = 'text'
							name = 'searchText'
							className = 'search-input'
							value = { searchText }
							onChange = { this.handleInputChange }
						/>
					</div>

					<div className = 'search-results-wrapper'>
						{
							searchResults.length > 0 &&
							<p
								className = 'results-length'
							>{ searchResults.length } result{ searchResults.length > 1 && 's' }</p>
						}
						<div className = 'results'>
							{
								loading ?
								<img src = { spinner2 } alt = 'spinner' /> :
								searchResults.length ?
								searchResults.map((result, i) => {
									if (searchBy === categories) {
										return <SearchCatResult
											key = { i }
											category = { result }
											goTo = { goTo }
											searchText = { searchText }
										/>
									}
									if (searchBy === discussions) {
										return <SearchDisResult
											key = { i }
											discussion = { result }
											goTo = { goTo }
											searchText = { searchText }
										/>
									}
									if (searchBy === posts) {
										return <SearchPostResult
											key = { i }
											post = { result }
											goTo = { goTo }
											searchText = { searchText }
											scrollTo = { scrollTo }
											pathname = { pathname }
										/>
									}
									if (searchBy === all) {
										if (result.type === 'category') {
											return(
												<SearchCatResult
													key = { i }
													category = { result.result }
													goTo = { goTo }
													searchText = { searchText }
													type = { result.type }
												/>
											);
										}
										if (result.type === 'discussion') {
											return <SearchDisResult
												key = { i }
												discussion = { result.result }
												goTo = { goTo }
												searchText = { searchText }
												type = { result.type }
											/>
										}
										if (result.type === 'post') {
											return <SearchPostResult
												key = { i }
												post = { result.result }
												goTo = { goTo }
												searchText = { searchText }
												scrollTo = { scrollTo }
												pathname = { pathname }
												type = { result.type }
											/>
										}
									}
									return null;
								}) :
								<p>No search results</p>
							}
						</div>
					</div>
				</SearchBox>
			</SearchWrapper>
		);
	}
};

export default connect(null, { getCategories, displayError })(Search);
