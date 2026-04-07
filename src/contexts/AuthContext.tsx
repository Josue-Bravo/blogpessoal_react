import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";


interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    // inicializar o estado usuario (armazenar dados do usuario autenticado)
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    // inicializar o estado isLoading (controlar o loader do componente login)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Implementação da função de Login
    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true)

        try {
            await login('/usuarios/logar', usuarioLogin, setUsuario)
            alert('Usuario autenticado com sucesso!')
        } catch (error) {
            alert('Os dados do usuario estão inconsistentes')
        }

        setIsLoading(false)
    }

    // Implementação da função de Logout
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        })
    }

    return(
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}