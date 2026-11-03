import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config/axios";
import { Alert, Box, Container, TextField, Typography, Button } from "@mui/material";
import { AuthLayoutComponent } from "../../layouts/AuthLayout";

export function Login(){
    const [username, setUsername] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [cargando, setCargando] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState('');
    const {loginState} = useContext(AuthContext);
    
    async function alEnviarFormulario(evento){
        evento.preventDefault();
        setErrorMensaje(null)
        setCargando(true);
        try{
            const respuesta = await api.post('/auth/login',{
                id:username,
                contrasena:contrasenia,
            });
            const {access_token, ...datosUsuario} = respuesta.data;
            loginState(datosUsuario, access_token);
            alert('!Bienvenido al sistema')
        }catch (error){
            const mensaje = error.response?.data?.message||'Error al conectar con el servidor';
            setErrorMensaje(mensaje);
        }finally{
            setCargando(false)
        }
    }

    return (
        <AuthLayoutComponent>
            <Container maxWidth='xs'>
                <Box 
                    sx={{
                        marginTop:8,
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        boxShadow:3,
                        padding:3,
                        borderRadius:2,
                        backgroundColor:'background.paper'
                    }}>
                        <Typography component='h4' variant="h5" sx={{marginBottom:2, fontWeight:'bold'}}>
                            Ingresar
                        </Typography>
                        
                        <Box component='form' onSubmit={alEnviarFormulario} sx={{width:'100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Carnet de id"
                                autoFocus
                                value={username}
                                onChange={function(e) {setUsername(e.target.value)}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Contraseña"
                                type="password"
                                value={contrasenia}
                                onChange={function (e) {setContrasenia(e.target.value)}}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={cargando}
                                sx={{ paddingY:1.5}}
                                >
                                {cargando ? 'verificando':'Ingresar al sistema'}

                            </Button>
                        </Box>

                </Box>

            </Container>
        </AuthLayoutComponent>
    )
    
}