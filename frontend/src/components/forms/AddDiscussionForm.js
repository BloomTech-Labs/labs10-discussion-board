import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addDiscussion, displayError } from '../../store/actions/index.js';

// globals
import { backendUrl } from '../../globals/globals.js';

const AddDiscussionFormWrapper = styled.div`
	position: absolute;
	padding: 10px;
	border-radius: 5px;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
`;

const AddDiscussionFormBox = styled.form`
	border-radius: 5px;
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 80%;
	background-color: white;
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
  getCategoryNames = () => {
    const user_id = localStorage.getItem('symposium_user_id');
    const token = localStorage.getItem('symposium_token');
    const headers = { headers: { Authorization: token } };
    return axios
      .get(`${backendUrl}/categories/followed/${user_id}`, headers)
      .then(res => this.setState({ categoryNames: res.data }))
      .catch(err => {
        const errMsg = err.response ? err.response.data.error : err.toString();
        return displayError(errMsg);
      });
  };
  componentDidMount = () => this.getCategoryNames();
  render() {
    const { body, categoryNames } = this.state;
    const { toggleAddDiscussionForm } = this.props;
    return (
      <AddDiscussionFormWrapper onSubmit={this.handleSubmit}>
        <AddDiscussionFormBox>
          <h1>Add Discussion form</h1>

          <input
            placeholder='Add discussion body...'
            name='body'
            onChange={this.handleInputChange}
            value={body}
          />

          <select
            className='categories-select'
            onChange={this.handleInputChange}
            name='category_id'
          >
            {
              categoryNames.map((cat, i) =>
                <option key={i} value={cat.id}>{cat.name}</option>
              )
            }
          </select>

          <button type='submit'>Submit</button>

          <button
            onClick={toggleAddDiscussionForm}
            type='button' // prevents form submission
          >Cancel</button>
        </AddDiscussionFormBox>
      </AddDiscussionFormWrapper>
    );
  }
};

export default connect(null, { addDiscussion, displayError })(AddDiscussionForm);
