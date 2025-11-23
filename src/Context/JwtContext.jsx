import { useState, useEffect, useContext, createContext } from "react";

const JwtContext = createContext();

export function JwtProvider({ children }) {
    const [jwtToken, setJwtToken] = useState(null);
    const [loadingJwt, setLoadingJwt] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchToken = async () => {
        setLoadingJwt(true);
        const token = await fetch('http://localhost:3000/api/me', {
            method: 'GET',
            credentials: 'include' //needed bcz http cookies will not go with fetch untill you specify
        })

        if (token.status === 200) {
            const data = await token.json();
            console.log("Fetched user data:", data.user);
            setJwtToken(data.user);
            setIsAuthenticated(true);
        } else {
            setJwtToken(null);
            setIsAuthenticated(false);
        }
        setLoadingJwt(false);
    }

    return (
        <JwtContext.Provider value={{ jwtToken, isAuthenticated, loadingJwt , fetchToken }}>
            {children}
        </JwtContext.Provider>
    )
}

export function useJwt() {
    const context = useContext(JwtContext);
    if (context === undefined) {
        throw new Error('useJwt must be used within a JwtProvider');
    }
    return context;
}
