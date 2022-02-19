import axios from 'axios';

const searchByCep = async function(cep) {
    cep = cep.replace('-', '');

    if (cep.length === 8 && ! isNaN(cep)) {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        
        if (response.data.erro) {
            return false;
        }

        return response.data;
    }
}

export { searchByCep };