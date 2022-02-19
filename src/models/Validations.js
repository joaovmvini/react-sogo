const cpfValidator = function(cpf) {
    const pattern = /\d{3}\.\d{3}\.\d{3}\-\d{2}/;

    if (cpf.match(pattern)) {
        return {
            valid: true,
            text: ''
        }
    }
    return {
        valid: false,
        text: 'CPF must contains 11 digits.'
    }
}

const passwordValidator = function(password) {
    if (password.length < 6 || password.length > 60) {
        return {
            valid: false,
            text: 'Password is not valid'
        }
    }
    return {
        valid: true,
        text: ''
    }
}

const nameValidator = function(username) {
    if (username.length < 4) {
        return {
            valid: false,
            text: 'Invalid input'
        }
    }
    return {
        valid: true,
        text: ''
    }
}

const cepValidator = function(cep) {
    const pattern = /[0-9]{5}-[0-9]{3}/;

    if (cep.match(pattern)) {
        return {
            valid: true,
            text: ''
        }
    }

    return {
        valid: false,
        text: 'Invalid Cep'
    }
}

const dateValidator = function(date) {
    const pattern = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

    if (date.match(pattern)) {
        return {
                valid: true,
                text: ''
        }
    }
    return {
        valid: false,
        text: 'Invalid Date'
    }
}

const contractNumberValidator = function(number) {
    if (isNaN(number)) {
        return {
            valid: false,
            text: 'Invalid Contract Number'
        }
    }

    return {
        valid: true,
        text: ''
    }
}


const validations = { 
    cpf: cpfValidator, 
    password: passwordValidator, 
    username: nameValidator ,
    cep: cepValidator,
    date: dateValidator,
    contractNumber: contractNumberValidator
};

export default validations;