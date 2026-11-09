import { useState, useEffect } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, IconButton, TextField, Dialog, DialogActions, 
  DialogContent, DialogTitle, Alert, MenuItem, 
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../../config/axios';

export default function AdminAutoresPantalla() {
  const [autores, setAutores] = useState([]);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    nombre_completo: '',
    biografia: '',
    tipo: 'autor'
  });

  const cargarAutores = () => {
    api.get('/autores')
      .then((res) => setAutores(res.data))
      .catch((err) => console.error("Error al cargar autores:", err));
  };

  useEffect(() => {
    cargarAutores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ nombre_completo: '', biografia: '', tipo: 'autor' });
    setOpen(true);
  };

  const handleOpenEdit = (autor) => {
    setEditingId(autor.id);
    setFormData({
      nombre_completo: autor.nombre_completo,
      biografia: autor.biografia,
      tipo: autor.tipo
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMensaje({ tipo: '', texto: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    try {
      if (editingId) {
        await api.patch(`/autores/${editingId}`, formData);
        setMensaje({ tipo: 'success', texto: 'Autor actualizado con éxito.' });
      } else {
        await api.post('/autores', formData);
        setMensaje({ tipo: 'success', texto: 'Autor registrado con éxito.' });
      }
      cargarAutores();
      setTimeout(handleClose, 1500);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Error en la operación.';
      setMensaje({ tipo: 'error', texto: Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este autor?')) {
      try {
        await api.delete(`/autores/${id}`);
        cargarAutores();
      } catch (error) {
        console.error("Error al eliminar autor:", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">Gestión de Autores</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
          Nuevo Autor
        </Button>
      </Box>

      {/* TABLA DE AUTORES */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre Completo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Biografía</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {autores.map((autor) => (
              <TableRow key={autor.id} hover>
                <TableCell>{autor.nombre_completo}</TableCell>
                <TableCell sx={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {autor.biografia}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{autor.tipo}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton color="primary" onClick={() => handleOpenEdit(autor)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(autor.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* DIÁLOGO MODAL ÚNICO (CREAR / EDITAR) */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold">
          {editingId ? ' Editar Autor' : ' Registrar Nuevo Autor'}
        </DialogTitle>
        <Box component="form" onSubmit={handleSave}>
          <DialogContent dividers>
            {mensaje.texto && (
              <Alert severity={mensaje.tipo} sx={{ mb: 2 }}>{mensaje.texto}</Alert>
            )}

            <TextField
              required
              fullWidth
              margin="normal"
              label="Nombre Completo"
              name="nombre_completo"
              slotProps={{htmlInput:{ maxLength: 100 }}}
              value={formData.nombre_completo}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              multiline
              rows={3}
              margin="normal"
              label="Biografía"
              name="biografia"
              slotProps={{htmlInput:{ maxLength: 255 }}}
              value={formData.biografia}
              onChange={handleChange}
            />

            <TextField
              select
              required
              fullWidth
              margin="normal"
              label="Tipo de Autor"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              {/* Opciones restringidas estrictamente al @IsIn del DTO */}
              <MenuItem value="autor">Autor</MenuItem>
              <MenuItem value="recopilador">Recopilador</MenuItem>
            </TextField>
          </DialogContent>
          
          <DialogActions sx={{ p: 2.1 }}>
            <Button onClick={handleClose} color="inherit">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              Guardar Cambios
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
