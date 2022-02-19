import React, {  createContext, useContext, useState } from 'react';

const ContractsContext = createContext();

export default function ContractsProvider({ children }) {
    const [contracts, setContracts] = useState(() => {
        if (! localStorage.getItem('contracts')) {
            localStorage.setItem('contracts', '[]');
        }

        return JSON.parse(localStorage.getItem('contracts'));
    });

    return (
    <ContractsContext.Provider value={{ contracts, setContracts }}>
        {children}
    </ContractsContext.Provider>
    )
}

export const useContracts = function() {
    const context = useContext(ContractsContext);
    const { contracts, setContracts } = context;

    return [contracts, setContracts];
}
