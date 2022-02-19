import React, { useState } from 'react';
import styled from 'styled-components';
import FilterDropwdown from '../components/ContractFilters/Filter';
import Template from '../components/ContractFilters/Template';

import { contractFilters } from '../components/data/contractFilters';
import { useContracts } from '../contexts/Contracts';

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 40px;
`;

export default function() {
    const [contracts] = useContracts();
    const [filteredContracts, setFilteredContracts] = useState([]);

    const getDateDiff = (date1, date2) => {
        const totalMilliSeconds1 = new Date(date1).getTime();
        const totalMilliSeconds2 = new Date(date2).getTime();

        return Math.round((totalMilliSeconds1 - totalMilliSeconds2)/(1000 * 60 * 60 * 24));
    };

    const getFilteredContracts = (rule) => {
        const matched = contracts.filter((contract) => {
            const [expDay, expMonth, expYear] = contract.expirationDate.split('/');
            const [regDay, regMonth, regYear] = contract.registerDate.split('/');

            const expirationDateFormatted = `${expYear}/${expMonth}/${expDay}`;
            const registrationDateFormatted = `${regYear}/${regMonth}/${regDay}`;

            return getDateDiff(expirationDateFormatted, registrationDateFormatted) <= rule;
        });

        return matched;
    };

    const onFilterChange = (filter) => {
        setFilteredContracts(getFilteredContracts(filter.rule));
    };

    return (
        <Wrapper className='page'>
            <FilterDropwdown text='Filters' options={contractFilters} onChange={onFilterChange}></FilterDropwdown> 
            <Template data={filteredContracts} pagination={3}></Template>
        </Wrapper>
    )
}