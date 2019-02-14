import React from 'react';
import styled from 'styled-components';
import meeting from '../assets/img/meeting.png';
import { Nav } from '../components/index.js';

const StyledHeader = styled.div`
display: flex;
justify-content: space-between;
margin-top: 30px;
margin-bottom 30px;
width: 90%;
`;

const TitleAndLogo = styled.div`
display: flex;
margin-right: 20px;
align-self: center;
`;

const Title = styled.div`
align-self: flex-end;
margin-left: 50px;
font-size: 40px;
`;



const Header = ({ history }) => {
    return (
        <StyledHeader>
            <TitleAndLogo>
                <img src={meeting} alt='discussion' />
                <Title><h1>Symposium</h1></Title>
                </TitleAndLogo>
            <Nav />
        </StyledHeader>
    );
};

export default Header;