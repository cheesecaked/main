import axios from "axios"
import { useContext, useEffect, useState, createContext } from "react"


export const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(window.localStorage.getItem('auth-token'))
    useEffect(() => {
        if(token) {
            setToken(window.localStorage.getItem("auth-token"))
            axios.get('http://localhost:7070/users/')
        }
    }, [token])


    const value ={
        token,
        setToken
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}