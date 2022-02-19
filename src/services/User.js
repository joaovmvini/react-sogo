const key = 'users';

export const saveUser = (user) => {
    const users = JSON.parse(localStorage.getItem(key));

    users.push(user);
    localStorage.setItem(key, JSON.stringify(users));
};

export const getUsers = () => {
    return JSON.parse(localStorage.getItem(key));
};