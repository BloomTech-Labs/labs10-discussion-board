import React from 'react';
import styled from 'styled-components';
import { Discussions } from '../components/index.js';

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
    margin-bottom: 20px;
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

const DiscussionsView = props => {
  return (
    <DiscussionsViewWrapper>
      <DiscussionsHeader>
        <DiscussionsTitle>
          <h1>Category Name Goes Here</h1>
        </DiscussionsTitle>
      </DiscussionsHeader>
      <hr />
      <Discussions id={props.match.params.id} />
    </DiscussionsViewWrapper>
  );
};

export default DiscussionsView;
