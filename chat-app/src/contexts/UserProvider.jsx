import { useState, createContext } from 'react'
const userContext = createContext(null)

const UserProvider = ({ children }) => {
    const [person, setPerson] = useState()
    return (
        <userContext.Provider value={{ person, setPerson }}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider