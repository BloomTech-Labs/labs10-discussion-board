import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// action creators
import { addDiscussion, displayError } from '../../store/actions/index.js';

// globals
import {
	tabletP,
	phoneP,
} from '../../globals/globals.js';

const AddDiscussionFormWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: absolute;
	padding: 10px;
	padding-top: 40px;
	border-radius: 5px;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
`;

const AddDiscussionFormBox = styled.form`
	border-radius: 5px;
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 80%;
	background-color: white;

	@media ${phoneP} {
		flex-direction: initial;
	}

	.body-input, .categories-select {
		border-radius: 5px;
		padding: 5px 10px;
	}

	.body-input {
		@media ${ tabletP} {
			width: 20em;
		}
	}

	.above-input {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 15px;

		i{
			font-size: 30px;

			&:hover {
					cursor: pointer;
					color: steelblue;
				}
		}			
	}

	.below-input {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 599px;
		margin-top: 10px;

		@media ${tabletP} {
			width: 380px;
		}

		@media ${phoneP} {
			flex-direction: column;
			align-items: center;
		}

		.user {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			font-size: 1.0rem;

			@media ${phoneP} {
				font-size: 1.4rem;
				margin-bottom: 10px;
			}

			.username {
				color: black;
				text-decoration: none;

				&:hover {
					color: steelblue;
					text-decoration: underline;
				}
			}

			img {
				width: 23px;
				margin-right: 10px;
			}
		}

		button {
			border: 1px solid white;
			border-radius: 5px;
			padding: 10px 15px;
			width: 100px;
			color: white;

			@media ${phoneP} {
				margin-top: 10px;
				width: 156px;
			}

			&:hover {
				cursor: pointer;
				background-color: white;
			}
		}

		.submit-btn {
			background-color: #418DCF;

			&:hover {
				color: #418DCF;
				border: 1px solid #418DCF;
			}
		}
	}
`;

class AddDiscussionForm extends Component {
  state = { body: '', categoryNames: [{ id: 0, name: '' }], category_id: 1 };
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    const { body, category_id } = this.state;
    const { toggleAddDiscussionForm, getDiscussions } = this.props;
    return this.props.addDiscussion(body, category_id)
      .then(() => toggleAddDiscussionForm())
      .then(() => getDiscussions());
  };
  getCategoryNames = () => this.setState({ categoryNames: this.props.categoriesFollowed, category_id: this.props.category_id || this.props.categoriesFollowed[0].id });
  componentDidMount = () => this.getCategoryNames();
  render() {
    const { body, categoryNames, category_id } = this.state;
		const { toggleAddDiscussionForm, username, avatar, user_id } = this.props;

    return (
      <AddDiscussionFormWrapper onSubmit={this.handleSubmit}>
        <AddDiscussionFormBox>
					<div className='above-input'>
						<span
							className='back'
							onClick={toggleAddDiscussionForm}		
						><i className="far fa-arrow-alt-circle-left"></i></span>
						<span></span>
					</div>
          <textarea
            rows='10'
            cols='80'
            className='body-input'
            type='text'
            placeholder='Add a post...'
            name='body'
            onChange={this.handleInputChange}
            value={body}
          />
          <div className='below-input'>
						<div className='user'>
							<Link className='username' to={`/profile/${user_id}`}>
								<img alt='pic' src = { avatar } />
							</Link>
							<Link className='username' to={`/profile/${user_id}`}>
								{username}
							</Link>
						</div>
						<select
							className='categories-select'
							onChange={this.handleInputChange}
							name='category_id'
							value = {category_id}
						>
							{
								categoryNames.map((cat, i) =>
									<option key={i} value={cat.id}>{cat.name}</option>
								)
							}
						</select>
            <button className='submit-btn' type='submit'>Post</button>  
          </div>
        </AddDiscussionFormBox>
      </AddDiscussionFormWrapper>
    );
  }
};

const mapStateToProps = state => ({
	categoriesFollowed: state.categories.categoriesFollowed,
	username: state.users.username,
	user_id: state.users.user_id,
	avatar: state.users.avatar,
});

export default connect(mapStateToProps, { addDiscussion, displayError })(AddDiscussionForm);
