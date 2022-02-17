import React from 'react';
import styled, { css } from 'styled-components';

const StyledColumn = styled.div`
   ${(props) => props.flex ? css`
        flex: ${props.flex};
   ` : ''}
   
   ${(props) => props.center ? css`
        text-align: center;
   ` : ''}

   padding-left: 8px;
   padding-right: 8px;
`;

export default function Column(props) {
    return (
        <StyledColumn {...props} >{props.children}</StyledColumn>
    )
}