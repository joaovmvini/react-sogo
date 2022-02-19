import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    border: 0px;
    outline: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    font-weight: 500;
    font-size: 0.875rem;
    text-align: center;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    min-width: 64px;
    padding: 6px 16px;
    border-radius: 4px;
    color: white;
    background-color: rgb(66 138 209);
`;

export default function Input(props) {
    return (
        <StyledButton {...props}>{props.children}</StyledButton>
    )
}