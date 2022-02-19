import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import Row from '../components/layout/Row';
import Column from '../components/layout/Column';
import Input from '../components/layout/Input';
import Button from '../components/layout/Button';

import { useUserData } from '../contexts/Users';
import { useContracts } from '../contexts/Contracts';
import { saveContract } from '../services/Contracts';

import useErrors from '../hooks/useErrors';
import Validations from '../contexts/Validations';

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

const StyledUserData = styled.textarea`
    border: 1px solid #EEE;
    width: 100%;
    padding-left: 10px;
    padding-top: 10px;
`;

export default function RegisterContract() {
    // Contract
    const [number, setNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [userName, setUserName] = useState('');

    const [userData] = useUserData();
    const [user, setUser] = useState({});
    
    const [contracts, setContracts] = useContracts();

    const validations = useContext(Validations);
    const [, validateData, isAllValid] = useErrors(validations);

    const autocompleteUser = () => {
        const lowerCaseUserName = userName.toLowerCase();
        const user = userData.filter((data) => data.name.toLowerCase().indexOf(lowerCaseUserName) >= 0).shift();
        
        // O componente não é controlado, já que é apenas um componente de visualização de dados
        // Sem alteraçõas externas
        const input = document.getElementById('user-data');

        let userDataOutput = '';
        
        if (user) {
            setUser(user);

            Object.entries(user).forEach(([key, value]) => {
                userDataOutput += (key + ': ' + value + '\n');
            });

        }

        input.value = userDataOutput;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (isAllValid()) {
            // Note que a data de registro é setada automaticamente
            const date = (new Date()).toLocaleDateString();

            const contract = { 
                number,
                registerDate: date,
                expirationDate,
                user 
            };

            saveContract(contract);
            setContracts([...contracts, contract]);

            window.alert('Contrato com sucesso, obrigado!');
            window.location.reload();
        }
    };

    useEffect(() => {
        if (userName) {
            autocompleteUser();
        }
    }, [userName]);

    return (
        <Wrapper className='page'>
            <form onSubmit={(event) => handleSubmit(event)}>
                <StyledH1>Registro de Contrato</StyledH1>

                <Row>
                    <Column flex={1}>
                        <Input 
                            fullWidth
                            type="text" 
                            placeholder="User name"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            required
                        />
                    </Column>
                </Row>


                <Row>
                    <Column flex={1}>
                        <Input 
                            type="text" 
                            placeholder="Contract Number"
                            value={number}
                            onChange={(event) => setNumber(event.target.value)}
                            name="contractNumber"
                            onBlur={(event) => {
                                validateData(event);
                            }}
                            required
                        />
                    </Column>

                    <Column flex={1}>
                        <Input 
                        type="text" 
                        placeholder='Expiration Date'
                        name="date"
                        value={expirationDate}
                        onChange={(event) => setExpirationDate(event.target.value)}
                        onBlur={(event) => {
                            validateData(event);
                        }}
                        required
                        />
                    </Column>
                </Row>

                <Row>
                    <Column flex={1}>
                        <StyledUserData 
                        id='user-data'
                        readOnly
                        type="text" 
                        placeholder='User data will appear here'
                        rows={8}
                        ></StyledUserData>
                    </Column>
                </Row>

                <Row>
                    <Column flex={1} center>
                        <Button>Realizar Cadastro</Button>
                    </Column>
                </Row>
            </form>
        </Wrapper>
    )
}