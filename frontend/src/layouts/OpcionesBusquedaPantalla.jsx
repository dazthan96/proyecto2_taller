import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';

export default function OpcionesBusquedaPantalla() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} sx={{justifyContent:'center'}} >
      {/* Tarjeta de Autores */}
      <Grid size={{xs:12, sm:6, md:4}}>
        <Card sx={{ boxShadow: 3 }}>
          <CardActionArea onClick={() => navigate('/buscar/autor')}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5">Autores</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      {/* Tarjeta de Departamentos (Molde para cuando la crees) */}
      <Grid size={{xs:12, sm:6, md:4}}>
        <Card sx={{ boxShadow: 3 }}>
          <CardActionArea onClick={() => navigate('/buscar/departamento')}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5">Departamentos</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {/* Tarjeta de Departamentos (Molde para cuando la crees) */}
      <Grid size={{xs:12, sm:6, md:4}}>
        <Card sx={{ boxShadow: 3 }}>
          <CardActionArea onClick={() => navigate('/buscar/categoria')}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5">Categorias</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {/* Tarjeta de Departamentos (Molde para cuando la crees) */}
      <Grid size={{xs:12, sm:6, md:4}}>
        <Card sx={{ boxShadow: 3 }}>
          <CardActionArea onClick={() => navigate('/buscar/region')}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5">Regiones</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {/* Tarjeta de Departamentos (Molde para cuando la crees) */}
      <Grid size={{xs:12, sm:6, md:4}}>
        <Card sx={{ boxShadow: 3 }}>
          <CardActionArea onClick={() => navigate('/buscar/cultura')}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5">Culturas</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      {/* Aquí colocarás las tarjetas de Región, Cultura y Categoría de la misma forma */}
    </Grid>
  );
}
