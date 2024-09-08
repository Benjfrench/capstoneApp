import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [age, setAge] = useState(null);

    useEffect(() => {
        if (dateOfBirth) {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                calculatedAge--;
            }
            setAge(calculatedAge);
        }
    }, [dateOfBirth]);

    return (
        <UserContext.Provider value={{ dateOfBirth, setDateOfBirth, age }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
