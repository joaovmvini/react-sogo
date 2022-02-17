import React from 'react';
import styled, { css } from 'styled-components';

const StyledInput = styled.input`
    ${(props) => props.fullWidth ? css`
        width: 100%;
    ` : ''}

    padding: 16.5px 14px;
    font: inherit;
    border: 1px solid #EEE;
`;

export default function Input(props) {
    return (
        <StyledInput {...props}></StyledInput>
    )
}