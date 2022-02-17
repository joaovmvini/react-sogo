import React, { Component } from 'react';
import styled from 'styled-components';

import Row from '../components/layout/Row';
import Column from '../components/layout/Column';
import Input from '../components/layout/Input';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledH1 = styled.h1`
    margin: 0px;
    font-weight: 400;
    font-size: 3rem;
    line-height: 1.167;
    letter-spacing: 0em;
    text-align: center;
`;

export default function() {
    return (
        <Wrapper className='page'>
            <form>
                <StyledH1>Registro de Pessoa</StyledH1>

                <Row>
                    <Column flex={1}>
                        <Input fullWidth type="text" placeholder="Email" />
                    </Column>
                </Row>

                <Row>
                    <Column Column flex={1}>
                        <Input type="text" placeholder='Nome'/>
                    </Column>

                    <Column Column flex={1}>
                        <Input type="text" placeholder='Sobrenome'/>
                    </Column>
                </Row>

                <Row>
                    <Column Column flex={1}>
                        <Input type="text" placeholder='CEP'/>
                    </Column>

                    <Column Column flex={1}>
                        <Input type="text" placeholder='Estado'/>
                    </Column>
                </Row>

                <Row>
                    <Column Column flex={1}>
                        <Input fullWidth type="text" placeholder='Endereço'/>
                    </Column>
                </Row>

                <Row>
                    <Column Column flex={1}>
                        <Input fullWidth type="text" placeholder='CPF'/>
                    </Column>
                </Row>
            </form>
        </Wrapper>
    )
}