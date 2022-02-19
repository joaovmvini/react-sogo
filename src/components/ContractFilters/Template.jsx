import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Row from '../layout/Row';
import Column from '../layout/Column';

const PaginationWrapper = styled.div`
    display: inline-flex;
    min-width: 40px;
    margin: 10px 0px;
`;

const PaginationItem = styled.div`
    padding: 5px 10px;
    cursor: pointer;
    background: whitesmoke;
    border-radius: 4px;
    margin-right: 8px;
`;

const TemplateItem = styled.div`
    width: 100%;

    background: rgb(66 138 209);
    color: white;
    border-radius: 4px;
    padding: 5px 5px;

    margin-bottom: 24px;
`;

const Pagination = function({ pagination, itemsLength, onChange }) {
    const pages = Math.ceil(itemsLength / pagination);

    const handlePagination = (index) => {
        onChange(index * pagination);
    };

    return (
        <PaginationWrapper>
            {Array(pages).fill(0).map((k, index) => {
                return (
                    <PaginationItem 
                        key={index} 
                        onClick={() => handlePagination(index)}
                    >
                        {index + 1}
                    </PaginationItem>
                )
            })}
        </PaginationWrapper>
    )
}

export default function Template({ data, pagination }) {
        // start -> end anterior + 1 ou 0
        // end -> numOfItemsPerPage * paginacaoAtual
        const [start, setStart] = useState(0);
        const [end, setEnd] = useState(pagination);

        const onChange = (newStart) => {
            setStart(newStart);
            setEnd(newStart + pagination);
        };

        const renderElements = () => {
            return data.length ? data.slice(start, end).map(({ number, registerDate, expirationDate, user: { name, cpf } }, key) => {
                return (
                    <TemplateItem key={key}>
                        <Row>
                            <Column flex={1} center>
                                <Row><Column center flex={1}>Contract Number</Column></Row>
                                <Row><Column center flex={1}>{number}</Column></Row>
                            </Column>
                            
                            <Column flex={1} center>
                                <Row><Column center flex={1}>Registered In</Column></Row>
                                <Row><Column center flex={1}>{registerDate}</Column></Row>
                            </Column>

                            <Column flex={1} center>
                                <Row><Column center flex={1}>Expires In</Column></Row>
                                <Row><Column center flex={1}>{expirationDate}</Column></Row>
                            </Column>

                            <Column flex={1} center>
                                <Row><Column center flex={1}>Username</Column></Row>
                                <Row><Column center flex={1}>{name}</Column></Row>
                            </Column>

                            <Column flex={1} center>
                                <Row><Column center flex={1}>CPF</Column></Row>
                                <Row><Column center flex={1}>{cpf}</Column></Row>
                            </Column>
                        </Row>

                    </TemplateItem>
                ) 
            }) : ( 
                <div style={{ marginTop: '8px' }}><span>No Contracts found...</span></div>
            )
        };

        return (
            <div style={{ width: '100%' }}>
                <Pagination pagination={pagination} itemsLength={data.length} onChange={onChange}/>
                {renderElements()}
            </div>
        );
}