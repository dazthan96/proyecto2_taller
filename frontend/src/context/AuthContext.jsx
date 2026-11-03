import React, { createContext, useEffect, useState } from "react";
import api from "../config/axios";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(function () {
        const tokenGuardado = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('usuario');

        if (tokenGuardado && usuarioGuardado) {
            setToken(tokenGuardado);
            setUsuario(JSON.parse(usuarioGuardado));
        }
        setCargando(false);
    }, []);

    function loginState(datosUsuario, tokenRecibido) {
        setToken(tokenRecibido);
        setUsuario(datosUsuario);

        localStorage.setItem('token', tokenRecibido);
        localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    }

    async function logoutState() {
        if (usuario) {
            try {
                await api.post('/auth/logout');
            } catch (error) {
                console.error('Error al registrar el log de salida en el servidor');
            }
        }
        setToken(null);
        setUsuario(null);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }

    return (
        <AuthContext.Provider value={{ usuario, token, cargando, loginState, logoutState }}>
            {children}
        </AuthContext.Provider>
    );
}
