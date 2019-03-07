import React from 'react';
import styled from 'styled-components';

import { Reply } from '../components/index.js';

const RepliesViewWrapper = styled.div``;

const RepliesView = ({
    replies,
    historyPush
}) => {
    return(
        <RepliesViewWrapper>
            {replies.map((reply, index) =>
                <Reply
                    key = {index}
                    reply = {reply}
                    history = { historyPush }
                />)
            }
            {console.log('replies', replies)}
        </RepliesViewWrapper>
    )
};

export default RepliesView;