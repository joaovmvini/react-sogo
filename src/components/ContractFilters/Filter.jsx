import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
    padding: 12px 24px;
`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 4px;
`;

export default function FilterDropwdown({ options, onChange, text }) {
    const [optionValue, setOptionValue] = useState(options[0].text);

    const handleChange = (event) => {
        setOptionValue(event.target.value);
    };

    useEffect(() => {
        onChange(options.find(option => option.text === optionValue));
    }, [optionValue]);

    return (
        <div style={{ width: '100%' }}>
            <StyledLabel htmlFor='select'>{text || 'Text'}</StyledLabel>
            <StyledSelect 
                id="select"
                value={optionValue}
                onChange={(event) => handleChange(event)}
            >
                {options.map((opt, key) => {
                    return (
                        <option key={key}>{opt.text}</option>
                    )
                })}
            </StyledSelect>
        </div>
    );

};