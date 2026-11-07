import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../caracteristicas/auth/login";
import { ProtectedRoute } from "./ProtectedRoute"; 
import { MainLayout } from "../layouts/mainLayout";
import OpcionesBusquedaPantalla from "../layouts/OpcionesBusquedaPantalla";
import DepartamentoListaPantalla from "../pages/departamentos/DepartamentosLista";
import DepartamentoObrasPantalla from "../pages/departamentos/DepartamentoObras";
import SubirObraPantalla from "../caracteristicas/adminPages/UploadArchive";

export function AppRoutes() {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={!token ? <Login /> : <Navigate to="/buscar" replace />}
                />
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/buscar" element={<OpcionesBusquedaPantalla/>} />
                        <Route path="/buscar/departamento" element={<DepartamentoListaPantalla />} />
                        <Route path="/buscar/departamento/:deptoId" element={<DepartamentoObrasPantalla />} />
                        <Route path="/nuevaobra" element={<SubirObraPantalla  />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
