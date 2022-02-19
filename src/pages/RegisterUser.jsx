import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import Row from '../components/layout/Row';
import Column from '../components/layout/Column';
import Input from '../components/layout/Input';
import Button from '../components/layout/Button';

import { useUserData } from '../contexts/Users';
import { saveUser } from '../services/User';

import Validations from '../contexts/Validations';
import useErrors from '../hooks/useErrors';

import { searchByCep } from '../models/CepApi';

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


export default function RegisterUsers() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [cep, setCep] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [cpf, setCpf] = useState('');

    const [userData, setUserData] = useUserData();

    const validations = useContext(Validations);
    const [, validateData, isAllValid] = useErrors(validations);

    const updateState = (value, handler) => {
        return handler(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isAllValid()) {
            const user = { email, name, secondName, cep, state, address, cpf };

            saveUser(user);
            setUserData([...userData, user]);

            window.alert('Usuário Cadastrado com sucesso, obrigado!');
            window.location.reload();
        }
    };

    const setCepResults = async function(c) {
        const result = await searchByCep(c);

        if (result) {
            const { logradouro, bairro, complemento, localidade, uf } = result;
            setAddress(`${localidade}${(bairro && bairro+',' )}${(logradouro && logradouro+',' )}${complemento || ''}`);
            
            if (uf) {
                setState(uf)
            }
        }
        
    }

    return (
        <Wrapper className='page'>
            <form onSubmit={(event) => handleSubmit(event)}>
                <StyledH1>Registro de Pessoa</StyledH1>

                <Row>
                    <Column flex={1}>
                        <Input 
                            fullWidth 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(event) => updateState(event.target.value, setEmail)}
                            required
                            
                        />
                    </Column>
                </Row>

                <Row>
                    <Column flex={1}>
                        <Input
                        type="text" 
                        placeholder='Nome'
                        value={name}
                        onChange={(event) => updateState(event.target.value, setName)}
                        required
                        name="username"
                        onBlur={(event) => {
                            validateData(event);
                        }}
                        />
                    </Column>

                    <Column flex={1}>
                        <Input 
                        type="text" 
                        placeholder='Sobrenome'
                        value={secondName}
                        onChange={(event) => updateState(event.target.value, setSecondName)}
                        required
                        />
                    </Column>
                </Row>

                <Row>
                    <Column flex={1}>
                        <Input 
                        type="text" 
                        placeholder='CEP'
                        value={cep}
                        onChange={(event) => {
                            const temp = event.target.value;
                            updateState(temp, setCep);
                            setCepResults(temp);
                        }}
                        required
                        name="cep"
                        onBlur={(event) => {
                            validateData(event);
                        }}
                        />
                    </Column>

                    <Column flex={1}>
                        <Input 
                        type="text" 
                        placeholder='Estado'
                        value={state}
                        onChange={(event) => updateState(event.target.value, setState)}
                        required
                        />
                    </Column>
                </Row>

                <Row>
                    <Column flex={1}>
                        <Input 
                        fullWidth 
                        type="text" 
                        placeholder='Endereço'
                        value={address}
                        onChange={(event) => updateState(event.target.value, setAddress)}
                        required
                        />
                    </Column>
                </Row>

                <Row>
                    <Column flex={1}>
                        <Input 
                        fullWidth 
                        type="text" 
                        placeholder='CPF'
                        value={cpf}
                        onChange={(event) => updateState(event.target.value, setCpf)}
                        name="cpf"
                        onBlur={(event) => {
                            validateData(event);
                        }}
                        required
                        />
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