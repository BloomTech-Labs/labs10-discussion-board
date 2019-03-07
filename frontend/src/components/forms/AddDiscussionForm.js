import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addDiscussion, displayError } from '../../store/actions/index.js';

// globals
import {
	tabletP,
	// phoneP,
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

	.body-input, .categories-select {
		border-radius: 5px;
		padding: 5px 10px;
	}

	.body-input {
		@media ${ tabletP} {
			width: 20em;
		}
	}

	.buttons-wrapper {
		display: flex;
		justify-content: space-around;
		width: 80%;
		margin-top: 10px;

		button {
			border: 1px solid white;
			border-radius: 5px;
			padding: 10px 15px;
			width: 30%;
			color: white;

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

		.cancel-btn {
			background-color: #4a4a4a;

			&:hover {
				color: #4a4a4a;
				border: 1px solid #4a4a4a;
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
  getCategoryNames = () => this.setState({ categoryNames: this.props.categoriesFollowed, category_id: this.props.category_id });
  componentDidMount = () => this.getCategoryNames();
  render() {
    const { body, categoryNames, category_id } = this.state;
    const { toggleAddDiscussionForm } = this.props;
    return (
      <AddDiscussionFormWrapper onSubmit={this.handleSubmit}>
        <AddDiscussionFormBox>
          <textarea
            rows='10'
            cols='50'
            className='body-input'
            type='text'
            placeholder='Add a post...'
            name='body'
            onChange={this.handleInputChange}
            value={body}
          />

          <span>in</span>

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

          <div className='buttons-wrapper'>
            <button className='submit-btn' type='submit'>Post</button>

            <button
              className='cancel-btn'
              onClick={toggleAddDiscussionForm}
              type='button' // prevents form submission
            >Cancel</button>
          </div>
        </AddDiscussionFormBox>
      </AddDiscussionFormWrapper>
    );
  }
};

const mapStateToProps = state => ({
  categoriesFollowed: state.categories.categoriesFollowed,
});

export default connect(mapStateToProps, { addDiscussion, displayError })(AddDiscussionForm);
