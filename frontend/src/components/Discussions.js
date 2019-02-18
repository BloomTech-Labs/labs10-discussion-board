import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

//Components
import { Discussion } from './index.js';

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

class Discussions extends Component {
    componentDidMount = () => {
        this.props.getDiscussionsByCat(this.props.id)
    };

        render() {
            const { discussionsByCat } = this.props;

            return (
                <DiscussionsViewWrapper>
                    {
                        discussionsByCat.map((discussion, index) => 
                            <Discussion
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

export default connect(mapStateToProps, { getDiscussionsByCat })(Discussions);