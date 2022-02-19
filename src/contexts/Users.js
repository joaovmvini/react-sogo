import React, {  createContext, useContext, useState } from 'react';

const UserDataContext = createContext();

export default function UserDataProvider({ children }) {
    const [userData, setUserData] = useState(() => {
        if (! localStorage.getItem('users')) {
            localStorage.setItem('users', '[]');
        }

        return JSON.parse(localStorage.getItem('users'));
    });

    return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
        {children}
    </UserDataContext.Provider>
    )
}

export const useUserData = function() {
    const context = useContext(UserDataContext);
    const { userData, setUserData } = context;

    return [userData, setUserData];
}
