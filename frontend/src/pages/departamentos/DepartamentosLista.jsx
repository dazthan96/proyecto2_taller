import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import api from '../../config/axios';

export default function DepartamentoListaPantalla() {
  const [departamentos, setDepartamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/obras/departamento/lista')
      .then((res) => {
        setDepartamentos(res.data);
      })
      .catch((err) => console.error("Error al cargar departamento con Axios:", err));
  }, []);

  return (
    <Grid container spacing={3}>
      {departamentos.map((departamento) => (
        <Grid item xs={12} sm={6} md={4} key={departamento.id}>
          <Card sx={{ boxShadow: 2 }}>
            <CardActionArea onClick={() => navigate(`/buscar/departamento/${departamento.id}`)}>

              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h6">{departamento.nombre}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
