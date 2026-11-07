import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, Alert, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import api from '../../config/axios'; // Tu cliente Axios configurado

export default function SubirObraPantalla() {
  // 1. Estados para almacenar los arreglos que vienen de la Base de Datos
  const [listaAutores, setListaAutores] = useState([]);
  const [listaDepartamentos, setListaDepartamentos] = useState([]);
  const [listaRegiones, setListaRegiones] = useState([]);
  const [listaCulturas, setListaCulturas] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);

  // Estado para el formulario (Damos valores iniciales vacíos para los Selects)
  const [formData, setFormData] = useState({
    titulo: '',
    sinopsis: '',
    anio_publicacion: new Date().getFullYear(),
    departamento: '', 
    autor: '',        
    region: '',       
    cultura: '',      
    categoria: '',    
    usuario: '9114103' // ID estático según tu JSON previo
  });

  const [file, setFile] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // 2. Cargar todas las listas al montar el componente
  useEffect(() => {
    // Hacemos todas las peticiones en paralelo para que cargue rápido
    Promise.all([
      api.get('/autores'),
      api.get('/obras/departamento/lista'),
      api.get('/obras/region/lista'),
      api.get('/obras/cultura/lista'),
      api.get('/obras/categoria/lista')
    ])
    .then(([resAutores, resDeptos, resRegiones, resCulturas, resCategorias]) => {
      setListaAutores(resAutores.data);
      setListaDepartamentos(resDeptos.data);
      setListaRegiones(resRegiones.data);
      setListaCulturas(resCulturas.data);
      setListaCategorias(resCategorias.data);
    })
    .catch((err) => {
      console.error("Error cargando catálogos de selección:", err);
      setMensaje({ tipo: 'error', texto: 'No se pudieron cargar las opciones desde el servidor.' });
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        // 👈 Agregamos [0] para capturar el archivo PDF real y no la lista
        setFile(e.target.files[0]); 
    }
    };


    const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    if (!file) {
        setMensaje({ tipo: 'error', texto: 'Por favor, selecciona un archivo PDF.' });
        return;
    }

    try {
        const dataToSend = new FormData();
        
        // Agregamos los campos de texto
        Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
        });
        
        // Agregamos el archivo binario individual
        dataToSend.append('file', file);

        // 💡 LA SOLUCIÓN: Pasamos explícitamente el header multipart/form-data
        // Esto obliga a Axios a ignorar el application/json de tu archivo config
        const response = await api.post('/obras', dataToSend, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        });

        if (response.status === 201 || response.status === 200) {
        setMensaje({ tipo: 'success', texto: '¡Obra y PDF subidos correctamente!' });
        setFormData({
            titulo: '', sinopsis: '', anio_publicacion: new Date().getFullYear(),
            departamento: '', autor: '', region: '', cultura: '', categoria: '', usuario: '9114103'
        });
        setFile(null);
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        const errorMsg = error.response?.data?.message || 'Ocurrió un error al subir la obra.';
        setMensaje({ tipo: 'error', texto: Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg });
    }
    };


  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom fontWeight="bold" textAlign="center">
          📚 Registrar Nueva Obra
        </Typography>

        {mensaje.texto && (
          <Alert severity={mensaje.tipo} sx={{ mb: 3 }}>
            {mensaje.texto}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth label="Título de la Obra" name="titulo" value={formData.titulo} onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth multiline rows={3} label="Sinopsis" name="sinopsis" value={formData.sinopsis} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField required fullWidth type="number" label="Año de Publicación" name="anio_publicacion" value={formData.anio_publicacion} onChange={handleChange} />
            </Grid>

            {/* SELECT DE AUTORES */}
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
                <InputLabel id="select-autor-label">Autor</InputLabel>
                <Select labelId="select-autor-label" name="autor" value={formData.autor} label="Autor" onChange={handleChange}>
                {listaAutores.map((aut) => (
                    /* Guardamos el nombre_completo en el valor */
                    <MenuItem key={aut.id} value={aut.nombre_completo}>
                    {aut.nombre_completo}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>

            {/* SELECT DE DEPARTAMENTOS */}
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
                <InputLabel id="select-depto-label">Departamento</InputLabel>
                <Select labelId="select-depto-label" name="departamento" value={formData.departamento} label="Departamento" onChange={handleChange}>
                {listaDepartamentos.map((dep) => (
                    /* Guardamos el nombre en el valor */
                    <MenuItem key={dep.id} value={dep.nombre}>
                    {dep.nombre}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>

            {/* SELECT DE REGIONES */}
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
                <InputLabel id="select-region-label">Región</InputLabel>
                <Select labelId="select-region-label" name="region" value={formData.region} label="Región" onChange={handleChange}>
                {listaRegiones.map((reg) => (
                    <MenuItem key={reg.id} value={reg.nombre}>
                    {reg.nombre}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>

            {/* SELECT DE CULTURAS */}
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
                <InputLabel id="select-cultura-label">Cultura</InputLabel>
                <Select labelId="select-cultura-label" name="cultura" value={formData.cultura} label="Cultura" onChange={handleChange}>
                {listaCulturas.map((cul) => (
                    <MenuItem key={cul.id} value={cul.nombre}>
                    {cul.nombre}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>

            {/* SELECT DE CATEGORÍAS */}
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
                <InputLabel id="select-categoria-label">Categoría</InputLabel>
                <Select labelId="select-categoria-label" name="categoria" value={formData.categoria} label="Categoría" onChange={handleChange}>
                {listaCategorias.map((cat) => (
                    <MenuItem key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>

            {/* ADJUNTAR ARCHIVO */}
            <Grid item xs={12} sx={{ mt: 1 }}>
            <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} fullWidth color={file ? "success" : "primary"} sx={{ py: 1.5 }}>
                {/* 👈 Cambiamos file.name por file.name directamente */}
                {file ? `📄 PDF Seleccionado: ${file.name}` : "Seleccionar Archivo PDF"}
                <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
            </Button>
            </Grid>


            {/* BOTÓN ENVIAR */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.5, fontWeight: 'bold' }}>
                Guardar Obra en el Sistema
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
