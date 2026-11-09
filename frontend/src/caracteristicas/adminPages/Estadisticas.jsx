import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Tabs, Tab, LinearProgress } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import api from '../../config/axios';

export default function EstadisticasPantalla() {
  const [tabIndex, setTabIndex] = useState(0);
  const [datos, setDatos] = useState([]);
  const [totalDescargas, setTotalDescargas] = useState(0);

  const criterios = ['autor', 'departamento', 'region', 'categoria', 'cultura'];

  useEffect(() => {
    const criterioActual = criterios[tabIndex];
    
    api.get(`/obras/estadisticas/${criterioActual}`)
      .then((res) => {
        const datosFormateados = res.data.map(item => ({
          name: item.name || item.nombre_completo || 'Anónimo',
          value: Number(item.value) || 0
        })).sort((a, b) => b.value - a.value);

        setDatos(datosFormateados);

        const total = datosFormateados.reduce((sum, item) => sum + item.value, 0);
        setTotalDescargas(total);
      })
      .catch((err) => console.error("Error al cargar estadísticas:", err));
  }, [tabIndex]);

  const topElemento = datos.length > 0 ? datos[0] : { name: 'Ninguno', value: 0 };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EqualizerIcon fontSize="large" color="primary" /> Panel de Estadísticas de Lectura
      </Typography>

      {/* SECCIÓN DE TARJETAS KPI */}
      <Grid container spacing={3} sx={{ mb: 4, mt: 1 }}>
        <Grid size={{xs:12, sm:6}}>
          <Card sx={{ bgcolor: '#e3f2fd', borderLeft: '6px solid #1976d2' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AutoStoriesIcon color="primary" sx={{ fontSize: 40 }} />
              <div>
                <Typography variant="body2" color="text.secondary" fontWeight="bold">TOTAL LECTURAS ACUMULADAS</Typography>
                <Typography variant="h4" fontWeight="bold">{totalDescargas}</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, sm:6}} >
          <Card sx={{ bgcolor: '#f1f8e9', borderLeft: '6px solid #7cb342' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EqualizerIcon color="success" sx={{ fontSize: 40 }} />
              <div>
                <Typography variant="body2" color="text.secondary" fontWeight="bold">LÍDER DE LECTURAS ({criterios[tabIndex].toUpperCase()})</Typography>
                <Typography variant="h5" fontWeight="bold" noWrap sx={{ maxWidth: 250 }}>{topElemento.name}</Typography>
                <Typography variant="caption" color="text.secondary">{topElemento.value} descargas</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* NAVEGACIÓN POR SUBCATEGORÍAS */}
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabIndex} 
          onChange={(e, newIdx) => setTabIndex(newIdx)} 
          indicatorColor="primary" 
          textColor="primary" 
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Por Autores" />
          <Tab label="Por Departamentos" />
          <Tab label="Por Regiones" />
          <Tab label="Por Categorías" />
          <Tab label="Por Culturas" />
        </Tabs>
      </Paper>

      {/* LISTADO DINÁMICO DE BARRAS DE PROGRESO */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, textTransform: 'capitalize' }}>
          Distribución de lecturas: {criterios[tabIndex]}s
        </Typography>

        {datos.length === 0 ? (
          <Typography color="text.secondary">No se registran descargas en esta subcategoría aún.</Typography>
        ) : (
          <Grid container spacing={3}>
            {datos.map((item, idx) => {
              const porcentaje = totalDescargas > 0 ? (item.value / totalDescargas) * 100 : 0;

              return (
                <Grid size={{xs:12}} key={idx}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body1" fontWeight="medium">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                      {item.value} {item.value === 1 ? 'lectura' : 'lecturas'} ({porcentaje.toFixed(1)}%)
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={porcentaje} 
                    color={idx === 0 ? "success" : "primary"}
                    sx={{ height: 10, borderRadius: 5, bgcolor: '#eaeaea' }}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
