import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';

const StyledWrapper = styled.div`
    display: flex;
    height: 80px;
    justify-content: start;
    align-items: center;
    background: #000;
`;

const StyledUl = styled.ul`
    width: 100%;
`;

const StyledLi = styled.li`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 0px;
    list-style: none;
    height: 60px;

    .nav-link {
        border-radius: 4px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        width: 95%;
        height: 100%;
        font-size: 18px;
        color: #f5f5f5;
        text-decoration: none;
    }

    .nav-link:hover {
        background-color: #1a83ff;
    }
`;

const StyledNav = styled.nav`
    width: 150px;
    height: 100vh;
    display: flex;
    justify-content: center;
    top: 0;
    transition: 750ms;
    background: #060b26;
    ${props => props.sidebar ? css`
        left: 0;
        transition: 300ms;
    ` : ''}
`;

const StyledText = styled.span`
    margin-left: 16px;
`;


export default function Menu({ options }) {
    const [sidebar, setSidebar] = useState(false);

    const renderList = () => {
        return options.map((item, key) => {
            return (
                <StyledLi key={key}>
                    <Link to={item.path} className='nav-link'>
                        <StyledText>{item.title}</StyledText>
                    </Link>
                </StyledLi>
            )
        });
    };

    return (
        <>
            <StyledNav sidebar={sidebar}>
                <StyledUl>
                    {renderList()}
                </StyledUl>
            </StyledNav>
        </>
    )
}