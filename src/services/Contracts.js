const key = 'contracts';

export const saveContract = (contract) => {
    const contracts = JSON.parse(localStorage.getItem(key));

    contracts.push(contract);
    localStorage.setItem(key, JSON.stringify(contracts));
};

export const getContracts = () => {
    return JSON.parse(localStorage.getItem(key));
};