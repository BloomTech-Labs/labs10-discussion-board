import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DiscussionsByCatList } from '../components/index.js';

//Category Name on top, Created By: Username

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const DiscussionsViewWrapper = styled.div`
	border: 0px solid black;
	padding: 5px;
	box-shadow: gray 0px 0px;
	hr {
		border-color: gray;
		margin-top: -10px;
		margin-bottom 20px;
	}
`;

const DiscussionsHeader = styled.div`
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

const DiscussionsTitle = styled.div`
	display: flex;
	align-self: center;
	font-size: 18px;
	margin-left: 25px;
	color: white;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/

const DiscussionsByCatView = (props) => {
    return (
        <DiscussionsViewWrapper>
            <DiscussionsHeader>
                <DiscussionsTitle>
                    <h1>Category name here</h1>
                </DiscussionsTitle>       
            </DiscussionsHeader>
            <hr />
			<DiscussionsByCatList 
				category_id = {props.match.params.category_id}/>
        </DiscussionsViewWrapper>
    );
}

export default DiscussionsByCatView;

// import React from 'react';
// import styled from 'styled-components';
// import Discuss from '../assets/img/Discuss.png';
// import TextLoop from "react-text-loop";


// // components
// import { TopDiscussions } from '../components/index.js';

// /***************************************************************************************************
//  ********************************************** Styles **********************************************
//  **************************************************************************************************/
// const TopDiscussionsViewWrapper = styled.div`
// 	border: 0px solid black;
// 	padding: 5px;
// 	box-shadow: gray 0px 0px;
// 	hr {
// 		border-color: gray;
// 		margin-top: -10px;
// 		margin-bottom 20px;
// 	}
// `;

// const TopDiscussionsImage = styled.img`
// 	src: url(${props => props.src});
// 	display: flex;
// 	height: 120px;
// 	width: 120px;
// `;

// const TopDiscussionsHeader = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	margin: 5px;

// 	.logotopd {
// 		display: flex;
// 	}

// 	.x0 {
// 		width: 400px;
// 		display: flex;
// 		justify-content: flex-end;
// 		font-size: 40px;
// 		padding-right: 10px;
// 	}
// `;

// const TopDiscussionsTitle = styled.div`
// 	display: flex;
// 	align-self: center;
// 	font-size: 18px;
// 	margin-left: 25px;
// 	color: white;
// `;

// const TextLooper = styled.div`
// 	display: flex;
// 	align-self: center;
// 	font-size: 28px;
// 	margin-left: 30px;
// 	color: white;
// `;

// /***************************************************************************************************
//  ********************************************* Component *******************************************
//  **************************************************************************************************/
// const DiscussionsByCatView = () => {
// 	return (
// 		<TopDiscussionsViewWrapper>
// 			<TopDiscussionsHeader>
// 				<div className = 'logotopd'>
// 					<TopDiscussionsImage src={Discuss} alt='Top discussions' />
// 						<TopDiscussionsTitle>
// 							<h1>Discussions</h1>
// 						</TopDiscussionsTitle>
// 				</div>
// 				<TextLooper>
//                 <TextLoop>
//                     <span>See what's being discussed</span>
//                     <span>Find your interests</span>
//                     <span>Start talking!</span>
// 				</TextLoop>{" "}
// 				</TextLooper>
// 			</TopDiscussionsHeader>
// 			<hr />
// 			<TopDiscussions />
// 		</TopDiscussionsViewWrapper>
// 	);
// };

// export default DiscussionsByCatView;
