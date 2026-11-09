import { useState, useEffect } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, IconButton, TextField, Dialog, DialogActions, 
  DialogContent, DialogTitle, Alert, MenuItem, Typography 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../../config/axios';

export default function AdminUsuariosPantalla() {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    correo: '',
    nombre_completo: '',
    contrasena: '',
    rol: 'visitante'
  });

  const cargarUsuarios = () => {
    api.get('/usuarios')
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (e) => {
    const value = e.target.name === 'id' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ id: '', correo: '', nombre_completo: '', contrasena: '', rol: 'visitante' });
    setOpen(true);
  };

  const handleOpenEdit = (usuario) => {
    setEditingId(usuario.id);
    setFormData({
      id: usuario.id,
      correo: usuario.correo,
      nombre_completo: usuario.nombre_completo,
      contrasena: '',
      rol: usuario.rol
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

    const dataToSend = { ...formData };

    if (editingId && !dataToSend.contrasena) {
      delete dataToSend.contrasena;
    }

    try {
      if (editingId) {
        await api.patch(`/usuarios/${editingId}`, dataToSend);
        setMensaje({ tipo: 'success', texto: 'Usuario actualizado con éxito.' });
      } else {
        await api.post('/usuarios', dataToSend);
        setMensaje({ tipo: 'success', texto: 'Usuario registrado con éxito.' });
      }
      cargarUsuarios();
      setTimeout(handleClose, 1500);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Error en la operación.';
      setMensaje({ tipo: 'error', texto: Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await api.delete(`/usuarios/${id}`);
        cargarUsuarios();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">Gestión de Usuarios</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
          Nuevo Usuario
        </Button>
      </Box>

      {/* TABLA DE USUARIOS */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Cédula / ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre Completo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Correo Electrónico</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usr) => (
              <TableRow key={usr.id} hover>
                <TableCell>{usr.id}</TableCell>
                <TableCell>{usr.nombre_completo}</TableCell>
                <TableCell>{usr.correo}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{usr.rol}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton color="primary" onClick={() => handleOpenEdit(usr)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(usr.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL PARA CREAR O EDITAR */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold">
          {editingId ? ' Editar Usuario' : ' Registrar Nuevo Usuario'}
        </DialogTitle>
        <Box component="form" onSubmit={handleSave}>
          <DialogContent dividers>
            {mensaje.texto && (
              <Alert severity={mensaje.tipo} sx={{ mb: 2 }}>{mensaje.texto}</Alert>
            )}

            <TextField
              required
              fullWidth
              type="number"
              margin="normal"
              label="Número de Identificación (ID)"
              name="id"
              disabled={editingId !== null}
              value={formData.id}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              type="email"
              margin="normal"
              label="Correo Electrónico"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              margin="normal"
              label="Nombre Completo"
              name="nombre_completo"
              slotProps={{htmlInput: {maxLength: 100} }}
              value={formData.nombre_completo}
              onChange={handleChange}
            />

            <TextField
              required={!editingId}
              fullWidth
              type="password"
              margin="normal"
              label={editingId ? "Nueva Contraseña (dejar en blanco para conservar)" : "Contraseña"}
              name="contrasena"
              slotProps={{htmlInput:{ minLength: 6, maxLength: 255 }}}
              value={formData.contrasena}
              onChange={handleChange}
            />

            <TextField
              select
              required
              fullWidth
              margin="normal"
              label="Rol del Usuario"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="visitante">Visitante</MenuItem>
            </TextField>
          </DialogContent>
          
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} color="inherit">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              Guardar Usuario
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
