import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import api from '../../config/axios';

export default function CulturaListaPantalla() {
  const [culturas, setCultura] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/obras/cultura/lista')
      .then((res) => {
        setCultura(res.data);
      })
      .catch((err) => console.error("Error al cargar departamento con Axios:", err));
  }, []);

  return (
    <Grid container spacing={3}>
      {culturas.map((cultura) => (
        <Grid size={{xs:12, sm:6, md:4}} key={cultura.id}>
          <Card sx={{ boxShadow: 2 }}>
            <CardActionArea onClick={() => navigate(`/buscar/cultura/${cultura.id}`)}>

              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h6">{cultura.nombre}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
