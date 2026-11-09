import { Logout, Menu } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Drawer, Divider, Card, CardContent } from "@mui/material";
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
    function irNuevaObra(){
        navegar("/nuevaobra")
        setMenuLateral(false)
    }
    function irObras(){
        navegar("/buscar")
        setMenuLateral(false)
    }
    function irCrudAutores(){
        navegar("/crudAutores")
        setMenuLateral(false)
    }
    

    function irUsuarios(){
        navegar("/usuarios")
        setMenuLateral(false)
    }

    function irStats(){
        navegar("/estadisticas")
        setMenuLateral(false)
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
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    <IconButton size="large" edge="start" aria-label="Menu" color="inherit" sx={{mr:2}} onClick={manejarMenu} >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow:1,  fontWeight: "bold", textAlign:'right'}}>
                        Biblioteca Virtual
                    </Typography>
                    
                    
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={menuLateral} onClose={function () {setMenuLateral(false);}}>
                <Box role="presentation" 
                    sx={{height:'100%', display:'flex', flexDirection:'column',p:0, width:"250px", textAlign:"center", backgroundColor:"#8A6B7D", color:"primary.contrastText", minHeight:"100%"}}>
                    <Box sx={{flexGrow:1}}>
                        <Card sx={{backgroundColor:"#a58999"}}>
                            <CardContent>
                                {usuario?.rol==='visitante' ?(
                                    <>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", color:"white" }} >
                                        Usuario
                                    </Typography>
                                    <Typography variant="body2" sx={{  color:"white" }}>
                                        {usuario?.nombre}
                                    </Typography></>
                                ):(
                                    <>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", color:"white" }} >
                                        Usuario
                                    </Typography>
                                    <Typography variant="body2" sx={{  color:"white" }}>
                                        {usuario?.nombre}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", color:"white" }}>
                                        Rol
                                    </Typography>
                                    <Typography variant="body2" sx={{  color:"white" }}>
                                        {usuario?.rol}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", color:"white" }}>
                                        Correo
                                    </Typography>
                                    <Typography variant="body2" sx={{ color:"white" }}>
                                        {usuario?.correo}
                                    </Typography>
                                    </>
                                )}
                                
                            </CardContent>

                        </Card>
                        <Divider sx={{backgroundColor:"rgba(255,255,255,0.12)", mb:2}}/>

                        
                        
                        <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irObras} >
                            Ver Obras
                        </Button>
                        <Button fullWidth color="inherit" sx={{paddingY:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}} onClick={irStats}>
                            Estadisticas
                        </Button>
                        
                        
                        {usuario?.rol ==="admin" &&(
                            <>
                                
                                
                                <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irNuevaObra} >
                                    Añadir Obra
                                </Button>
                                <Button fullWidth color="inherit" sx={{paddingY:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}} onClick={irStats}>
                                    Estadisticas
                                </Button>
                                <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irCrudAutores} >
                                    Gestionar Autores
                                </Button>
                                <Button fullWidth color="inherit" sx={{paddingY:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}} onClick={irUsuarios}>
                                    Gestion de Usuarios
                                </Button>
                            </>
                        )}
                        {usuario?.rol ==="editor" &&(
                            <>
                                <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irNuevaObra} >
                                    Añadir Obra
                                </Button>
                                <Button fullWidth color="inherit"sx={{padding:1.5, textTransform:"none", justifyContent:"center", '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}onClick={irCrudAutores} >
                                    Gestionar Autores
                                </Button>
                            </>
                        )}
                    </Box>
                    <Box sx={{p:2}}>
                        <Button fullWidth variant="contained" color="warning"  startIcon={<Logout/>} onClick={ejecutarCerrarSesion}>
                            Salir
                        </Button>
                    </Box>
                </Box>
            </Drawer>
            <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                <Outlet />
            </Box>            
        </Box>
    )
}