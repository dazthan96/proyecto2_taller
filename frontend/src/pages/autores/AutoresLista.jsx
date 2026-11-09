import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import api from '../../config/axios';

export default function AutoresListaPantalla() {
  const [autores, setAutores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/autores')
      .then((res) => {
        setAutores(res.data);
      })
      .catch((err) => console.error("Error al cargar departamento con Axios:", err));
  }, []);

  return (
    <Grid container spacing={3}>
      {autores.map((autor) => (
        <Grid size={{xs:12, sm:6, md:4}} key={autor.id}>
          <Card sx={{ boxShadow: 2 }}>
            <CardActionArea onClick={() => navigate(`/buscar/autor/${autor.id}`)}>
            {console.log(autor.id)}
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h6">{autor.nombre_completo}</Typography>
                <Typography variant='body2' sx={{color:'text.secondary'}}>{autor.biografia}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
