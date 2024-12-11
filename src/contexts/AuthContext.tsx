import { createContext, ReactNode, useState } from 'react'
import { UserDto } from '../dto/UserDto'


export interface AuthContextProps {
    user: UserDto
    setUser: (state: UserDto) => void
}

export const AuthContext = createContext({} as AuthContextProps)


interface Props {
    children: ReactNode
}

export function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<UserDto>({
        avatar: '',
        email: '',
        id: '',
        name: ''
    })

    return (
        <AuthContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}