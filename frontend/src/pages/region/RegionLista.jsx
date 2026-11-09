import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import api from '../../config/axios';

export default function RegionListaPantalla() {
  const [regiones, setRegion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/obras/region/lista')
      .then((res) => {
        setRegion(res.data);
      })
      .catch((err) => console.error("Error al cargar departamento con Axios:", err));
  }, []);

  return (
    <Grid container spacing={3}>
      {regiones.map((region) => (
        <Grid size={{xs:12, sm:6, md:4}} key={region.id}>
          <Card sx={{ boxShadow: 2 }}>
            <CardActionArea onClick={() => navigate(`/buscar/region/${region.id}`)}>

              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h6">{region.nombre}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
