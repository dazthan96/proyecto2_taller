import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import api from '../../config/axios';

export default function CategoriasListaPantalla() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/obras/categoria/lista')
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => console.error("Error al cargar departamento con Axios:", err));
  }, []);

  return (
    <Grid container spacing={3}>
      {categorias.map((categoria) => (
        <Grid size={{xs:12, sm:6, md:4}} key={categoria.id}>
          <Card sx={{ boxShadow: 2 }}>
            <CardActionArea onClick={() => navigate(`/buscar/categoria/${categoria.id}`)}>

              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h6">{categoria.nombre}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
