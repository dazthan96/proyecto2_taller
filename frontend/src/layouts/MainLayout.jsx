import { Logout, Menu } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Drawer, Divider } from "@mui/material";
import {useState, useContext} from "react";
import { useNavigate, Outlet} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export function MainLayout(){
    const [menuLateral, setMenuLateral] = useState(false);
    const {usuario, logoutState} = useContext(AuthContext);
    const navegar = useNavigate();

    function manejarMenu(){
        setMenuLateral(true)
    }

    function irAutores(){
        navegar("/buscar")
        setMenuLateral(false)
    }

    function irObras(){
        navegar("/nuevaobra")
        setMenuLateral(false)
    }

    function irUsuarios(){
        navegar("/Usuarios")
        setMenuLateral(false)
    }

    function irStats(){
        navegar("/Estadisticas")
        setMenuLateral(false)
    }

    function irDeptos(){
        navegar("/Departamentos")
        setMenuLateral(false)
    }

    function irRegion(){
        navegar("/Regiones")
    }

    function irCulturas(){
        navegar("/Culturas")
    }
    
    function irCategorias(){
        navegar("/Categorias")
    }

    async function ejecutarCerrarSesion(){
        if (confirm("¿Desea cerrarsu sesion?")){
            await logoutState();
            navegar("/login")
        }
    }
    return(
        <Box  sx={{flexGrow:1, minHeight:"100vh", backgroundColor:"background.default"}}>
            <AppBar position="static" sx={{backgroundColor:"#8A6B7D"}} >
                <Toolbar>
                    <IconButton size="large" edge="start" aria-label="Menu" color="inherit" sx={{mr:2}} onClick={manejarMenu} >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        BiblioVirtual
                    </Typography>
                    <Box sx={{ marginRight: 3 }}>
                        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                        Usuario: {usuario?.nombre_completo} ({usuario?.rol?.toUpperCase()})
                        </Typography>
                    </Box>
                    <Button color="error" variant="contained" size="small" startIcon={<Logout/>} onClick={ejecutarCerrarSesion}>
                        Salir
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={menuLateral} onClose={function () {setMenuLateral(false);}}>
                <Box role="presentation" sx={{p:0, width:"250px", textAlign:"center", backgroundColor:"#8A6B7D", color:"primary.contrastText", minHeight:"100%"}}>
                    <Typography variant="h6" component="div" sx={{mb:1, fontWeight:"bold"}}>
                        Menu de Opciones
                    </Typography>
                    <Divider sx={{backgroundColor:"rgba(255,255,255,0.12)", mb:2}}/>

                    <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irObras} >
                        Obras
                    </Button>
                    <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irAutores} >
                        Autores
                    </Button>
                    <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irDeptos} >
                        Departamentos
                    </Button>
                    <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irRegion} >
                        Regiones
                    </Button>
                    
                    <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irCulturas} >
                        Culturas
                    </Button>
                    <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irCategorias} >
                        Categorias
                    </Button>
                    {usuario?.rol ==="admin" &&(
                        <>
                            <Button fullWidth color="inherit" sx={{paddingY:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}} onClick={irUsuarios}>
                                Gestion de Usuarios
                            </Button>
                            <Button fullWidth color="inherit" sx={{paddingY:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}} onClick={irStats}>
                                Estadisticas
                            </Button>
                        </>
                    )}
                    {usuario?.rol ==="editor" &&(
                        <>
                            <Button fullWidth color="inherit" sx={{paddingY:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}} onClick={irStats}>
                                Estadisticas
                            </Button>
                        </>
                    )}
                </Box>
            </Drawer>
            <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                <Outlet />
            </Box>            
        </Box>
    )
}