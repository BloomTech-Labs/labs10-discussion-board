import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

//Components
import { DiscussionsByCat } from './index.js';

//Action Creators
import { getDiscussionsByCat } from '../store/actions/index.js'

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const DiscussionsViewWrapper = styled.div`

`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/

class DiscussionsByCatList extends Component {
    componentDidMount = () => {
        this.props.getDiscussionsByCat(this.props.category_id)
    };
        render() {
            const { discussionsByCat } = this.props;

            return (    
                <DiscussionsViewWrapper>
                    {console.log('map', this.props)}
                    {
                        discussionsByCat.map((discussion, index) => 
                            <DiscussionsByCat
                                key = { index }
                                discussion = {discussion}
                            />
                        )
                    }
                </DiscussionsViewWrapper>
            );
        };
};

const mapStateToProps = state => ({
    discussionsByCat: state.discussions.discussionsByCat
});

export default connect(mapStateToProps, { getDiscussionsByCat })(DiscussionsByCatList);