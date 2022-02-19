import React from 'react';
import styled from 'styled-components';

import { useContracts } from '../contexts/Contracts';

/*
: 1) número de contratos
cadastrados, 2) número de contratos a vencer,
3) número de tempo médio de prestação de
serviços
*/

import Row from '../components/layout/Row';
import Column from '../components/layout/Column';
import { useUserData } from '../contexts/Users';

const Item = styled.div`
    width: 100%;

    background: rgb(66 138 209);
    color: white;
    border-radius: 4px;
    padding: 5px 5px;

    margin-bottom: 24px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 40px;
`;


const StyledH1 = styled.h1`
    margin: 0px;
    font-weight: 400;
    font-size: 3rem;
    line-height: 1.167;
    letter-spacing: 0em;
    text-align: center;
    margin-bottom: 14px;
`;

export default function Dashboard() {
    const [contracts] = useContracts();
    const [userData] = useUserData();

    const getDateDiff = (date1, date2) => {
        const totalMilliSeconds1 = new Date(date1).getTime();
        const totalMilliSeconds2 = new Date(date2).getTime();

        return Math.round((totalMilliSeconds1 - totalMilliSeconds2)/(1000 * 60 * 60 * 24));
    };

    const formatDate = (contract) => {
        const [expDay, expMonth, expYear] = contract.expirationDate.split('/');
        const [regDay, regMonth, regYear] = contract.registerDate.split('/');

        const expirationDateFormatted = `${expYear}/${expMonth}/${expDay}`;
        const registrationDateFormatted = `${regYear}/${regMonth}/${regDay}`;

        return getDateDiff(expirationDateFormatted, registrationDateFormatted);
    };

    const willExpireSoon = () => {
        let sum = 0;

        contracts.forEach((contract) => {
            if (formatDate(contract) < 1) {
                sum ++;
            }
        });

        return sum;
    };

    const getAverageTime = () => {
        let sum = 0;

        contracts.forEach((contract) => {
            sum += formatDate(contract);
        });

        return Math.round(sum / userData.length); 
    };

    const data = [
        {
            title: 'Num of Registered contracts',
            value: contracts.length
        },
        {
            title: 'Will expire soon',
            value: willExpireSoon()
        },
        {
            title: 'Average service delivery time in days',
            value: getAverageTime()
        }
    ];

    const renderStatistics = () => {
        return ! (contracts.length) ? 
            <div><span>Sem contratos cadastrados até o momento...</span></div>
        : data.map((item, key) => {
            return (
                <>
                    <Column flex={1} center>
                        <Row><Column center flex={1}>{item.title}</Column></Row>
                        <Row><Column center flex={1}>{item.value}</Column></Row>
                    </Column>
                </>

                
            );
        });
    };

    return (
        <Wrapper className='page'>
            <div style={{
                width: '100%'
            }}>
                <StyledH1>Dashboard</StyledH1>
                <Item>
                    <Row>
                        {renderStatistics()}
                    </Row>
                </Item>
                
            </div>
        </Wrapper>
    )
}