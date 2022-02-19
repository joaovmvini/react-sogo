import { useEffect, useState } from 'react';

const useErrors = function(validations) {
    const [errors, setErrors] = useState(createInitialState(validations));
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (event && event.target) {
            if (! event.error.valid) {
                event.target.setAttribute('error', true);
            } else if (event.target.hasAttribute('error')) {
                event.target.removeAttribute('error');
            }
        }
    }, [event]);

    const validateData = function(e) {
        const { name, value } = e.target;

        const newState = { ...errors };
        const result = validations[name](value)
        newState[name] = result;

        setErrors(newState);
        setEvent({ target: e.target, error: result });
    }

    const isAllValid = function() {
        for (let attr in errors) {
            if (! errors[attr].valid) {
                return false;
            }
        }
        return true;
    }

    return [errors, validateData, isAllValid];
}

const createInitialState = function(validations) {
    const initialState = {};

    for (let attr in validations) {
        initialState[attr] = { valid: true, text: ''};
    }

    return initialState;
}

export default useErrors;