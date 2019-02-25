import React, { Component } from 'react';
import styled from 'styled-components';
import Discuss from '../assets/img/Discuss.png';
import TextLoop from "react-text-loop";
import { connect } from 'react-redux';
import moment from 'moment';

// components
import { DiscussionsByCats, FollowCat, AddDiscussionForm } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const DiscussionsByCatViewWrapper = styled.div`
	border: 0px solid black;
	padding: 5px;
	box-shadow: gray 0px 0px;
	hr {
		border-color: gray;
		margin-top: -10px;
		margin-bottom: 20px;
	}
	@media (max-width: 450px){
		width: 95%;
	}
`;

const DiscussionsByCatImage = styled.img`
	src: url(${props => props.src});
	display: flex;
	height: 120px;
	width: 120px;
`;

const DiscussionsByCatHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 5px;

	.logotopd {
		display: flex;
	}

	.x0 {
		width: 400px;
		display: flex;
		justify-content: flex-end;
		font-size: 40px;
		padding-right: 10px;
	}
`;

const DiscussionsByCatTitle = styled.div`
	display: flex;
	align-self: center;
	font-size: 18px;
	margin-left: 25px;
	color: white;
	flex-wrap: wrap;
	flex-direction: column;
`;

const TextLooper = styled.div`
	display: flex;
	align-self: center;
	font-size: 28px;
	margin-left: 30px;
	color: white;
	@media (max-width: 768px){
		display: none;
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class DiscussionsByCatView extends Component {
	state = { showAddForm: false };
	toggleShowAddForm = () => this.setState({ showAddForm: !this.state.showAddForm });
	render() {
		const { showAddForm } = this.state;
		const { history, match, category } = this.props;
		const { created_at, name, username } = category;
		const id  = match.params.category_id;
		const historyPush = history.push;
		return (
			<DiscussionsByCatViewWrapper>
				<DiscussionsByCatHeader>
					<div className = 'logotopd'>
						<DiscussionsByCatImage src={Discuss} alt='Top discussions' />
						<FollowCat category_id = {id} historyPush = { historyPush }/>
							<DiscussionsByCatTitle>
								<h1>/d/{ name }</h1>
								<h2>Super-Mod: { username }</h2>
								<h3>A community for {moment(new Date(Number(created_at))).fromNow()}</h3>
							</DiscussionsByCatTitle>
					</div>
					<TextLooper>
					<TextLoop>
						<span>See what's being discussed</span>
						<span>Find your interests</span>
						<span>Start talking!</span>
					</TextLoop>{" "}
					</TextLooper>
				</DiscussionsByCatHeader>
				<hr />
				{
					showAddForm ?
					<AddDiscussionForm
						toggleShowAddForm = { this.toggleShowAddForm }
						category_id = { id }
						historyPush = { historyPush }
					/>
					:
					<button onClick = { this.toggleShowAddForm }>Add a discussion</button>
				}
				<DiscussionsByCats category_id = {match.params.category_id}/>
			</DiscussionsByCatViewWrapper>
		);
	}
};

const mapStateToProps = state => ({
	category: state.discussions.category,
});

export default connect(mapStateToProps, {})(DiscussionsByCatView);
