import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ rolesPermitidos }) {
    const { usuario, token, cargando } = useContext(AuthContext);

    // Muestra el spinner mientras lee el localStorage
    if (cargando) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Si no hay sesión activa, al login ("/")
    if (!token || !usuario) {
        return <Navigate to="/" replace />;
    }

    // Si no tiene el rol, lo manda a la página de inicio general segura
    if (rolesPermitidos && !rolesPermitidos.includes(usuario?.rol)) {
        return <Navigate to="/Inicio" replace />;
    }

    // Permite el paso a las rutas hijas
    return <Outlet />;
}
