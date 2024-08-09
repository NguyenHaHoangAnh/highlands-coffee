import { createContext, useState } from "react";

const AuthUserContext = createContext();

function AuthUserProvider({ children }) {
    const [user, setUser] = useState();

    const handleChangeUser = (newUser) => {
        setUser(newUser);
    }

    const value = {
        user,
        handleChangeUser,
    }
    
    return (
        <AuthUserContext.Provider value={value}>
            {children}
        </AuthUserContext.Provider>
    );
}

export { AuthUserContext, AuthUserProvider };