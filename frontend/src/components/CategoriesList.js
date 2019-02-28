import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Categories } from '../components/index.js';

import { getCategories } from '../store/actions/index.js';

const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    .sortName {
        width: 160px;
        padding: 10px;
        margin: 5px;
    }
    .sorted {
        display:flex;
        align-content: center;
        margin-left: 50px;
        color: ${props => props.theme.discussionPostColor};
    }
`;

class CategoriesList extends Component {
	state = {
		order: 'name', // possible values: 'name', 'discussion_count', 'created_at'
		orderType: '', // possible values: 'asc', 'desc'
    };
    handleSelectChange = e => this.setState({ [e.target.name]: e.target.value }, () => {
		return this.props.getCategories(this.state.order, this.state.orderType);
	});
    componentDidMount = () => this.props.getCategories(this.state.order, this.state.orderType);
    render() {
        const { categories } = this.props;
        const { order } = this.state;
        return(
            <CategoryWrapper>
                <span className = 'sorted'>Sort</span>
				<select className = 'sortName' onChange = { this.handleSelectChange } name = 'order'>
					<option value = 'name'>name</option>
					<option value = 'discussion_count'>number of discussions</option>
					<option value = 'created_at'>date created</option>
				</select>
				<select className = 'sortName' onChange = { this.handleSelectChange } name = 'orderType'>
                    <option value = 'asc'>
                        {
                            order === 'created_at' ? 'least recent first' :
                            order === 'name' ? 'alphabetical order' : 'least first'
                        }
					</option>
                    <option value = 'desc'>
						{
                            order === 'created_at' ? 'most recent first' :
                            order === 'name' ? 'reverse alphabetical order' : 'most first'
                        }
					</option>
				</select>
                {
                    categories.map((category, index) => 
                    <Categories 
                        key = {index} 
                        category = {category}
                    />)
                }
            </CategoryWrapper>
        )
    }
}

const mapStateToProps = state => ({
	categories: state.categories.categories,
});

export default connect(mapStateToProps, { getCategories })(CategoriesList);
