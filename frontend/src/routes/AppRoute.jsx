import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../caracteristicas/auth/login";
import { ProtectedRoute } from "./ProtectedRoute"; 
import { MainLayout } from "../layouts/mainLayout";
; // ✅ Importado correctamente con M mayúscula

function ObrasPrueba() {
    return <h2>📚 Sección de Obras Universitarias</h2>;
}

export function AppRoutes() {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={!token ? <Login /> : <Navigate to="/Inicio" replace />}
                />
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/Inicio" element={<h2>🎯 ¡Bienvenido a BiblioVirtual!</h2>} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
