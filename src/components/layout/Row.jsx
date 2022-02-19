import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 16px 0px 8px;
    width: 100%;
`;

export default function Row({ children }) {
    return (
        <StyledRow className='row'>{children}</StyledRow>
    )
}