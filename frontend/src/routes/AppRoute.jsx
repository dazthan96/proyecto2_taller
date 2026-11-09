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
import AutoresListaPantalla from "../pages/autores/AutoresLista";
import AutoresObrasPantalla from "../pages/autores/AutoresObras";
import CategoriasListaPantalla from "../pages/categorias/CategoriasLista";
import CategoriaObrasPantalla from "../pages/categorias/CategoriaObras";
import RegionListaPantalla from "../pages/region/RegionLista";
import RegionObrasPantalla from "../pages/region/RegionObras";
import CulturaListaPantalla from "../pages/culturas/CulturaLista";
import CulturaObrasPantalla from "../pages/culturas/CulturaObras";
import AdminAutoresPantalla from "../caracteristicas/adminPages/crudAutores";
import AdminUsuariosPantalla from "../caracteristicas/adminPages/crudUsuarios";
import EstadisticasPantalla from "../caracteristicas/adminPages/Estadisticas";

export function AppRoutes() {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={!token ? <Login /> : <Navigate to="/buscar" replace />}
                />
                <Route element={<ProtectedRoute rolesPermitidos={['admin','editor','visitante']}/>}>
                    <Route element={<MainLayout />}>
                        <Route path="/estadisticas" element={<EstadisticasPantalla/>} />
                        <Route path="/buscar" element={<OpcionesBusquedaPantalla/>} />
                        <Route path="/buscar/departamento" element={<DepartamentoListaPantalla />} />
                        <Route path="/buscar/departamento/:deptoId" element={<DepartamentoObrasPantalla />} />
                        <Route path="/buscar/autor" element={<AutoresListaPantalla  />}  />
                        <Route path="/buscar/autor/:autorId" element={<AutoresObrasPantalla  />}  />
                        <Route path="/buscar/categoria" element={<CategoriasListaPantalla  />}  />
                        <Route path="/buscar/categoria/:catId" element={<CategoriaObrasPantalla  />}  />
                        <Route path="/buscar/region" element={<RegionListaPantalla  />}  />
                        <Route path="/buscar/region/:regId" element={<RegionObrasPantalla  />}  />
                        <Route path="/buscar/cultura" element={<CulturaListaPantalla  />}  />
                        <Route path="/buscar/cultura/:culturaId" element={<CulturaObrasPantalla  />}  />
                    </Route>
                </Route>
                <Route element={<ProtectedRoute rolesPermitidos={['admin','editor']}/>}>
                    <Route element={<MainLayout />}>
                        <Route path="/nuevaobra" element={<SubirObraPantalla  />} />
                        <Route path="/crudAutores" element={<AdminAutoresPantalla />} />

                    </Route>
                </Route>
                <Route element={<ProtectedRoute rolesPermitidos={['admin']}/>}>
                    <Route element={<MainLayout />}>
                        <Route path="/usuarios" element={<AdminUsuariosPantalla/>} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
