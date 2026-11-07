import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import api from '../../config/axios'; // Ajusta la ruta a tu archivo config si es necesario

export default function AutoresObrasPantalla() {
  const { deptoId } = useParams(); 
  const [obras, setObras] = useState([]);
  const [nombreDepto, setNombreDepto] = useState('');

  useEffect(() => {
    api.get(`/obras/departamento/${deptoId}`)
      .then((res) => {
        // Al ser un array directo, lo guardamos tal cual
        setObras(res.data);
        
        // Sacamos el nombre del autor de la primera obra de la lista si existe
        if (res.data.length > 0 && res.data[0].autor) {
          setNombreDepto(res.data[0].autor.nombre_completo);
        }
      })
      .catch((err) => console.error("Error al cargar obras con Axios:", err));
  }, [deptoId]);

  const abrirPdf = async (obraId, rutaPdfBackend) => {
    // 1. Limpiamos las barras invertidas de Windows (\\ -> /) por si acaso
    // y quitamos el prefijo 'upload/' ya que serveRoot se encarga de mapearlo.
    const nombreArchivo = rutaPdfBackend.replace('src\\', '');
    await api.get(`/obras/${obraId}/descargar`)
    // 2. Construimos la URL pública hacia tu ServeStaticModule
    const urlCompleta = `http://localhost:3000/${nombreArchivo}`;
    
    // 3. Abrimos en pestaña nueva
    window.open(urlCompleta, '_blank', 'noopener,noreferrer');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Obras de: {nombreDepto || 'Cargando...'}
        </Typography>
      </Grid>

      {obras.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="body1" color="text.secondary">
            Este autor aún no tiene obras registradas.
          </Typography>
        </Grid>
      ) : (
        obras.map((obra) => (
          <Grid item xs={12} sm={6} md={4} key={obra.id}>
            <Card sx={{ bgcolor: '#fafafa', borderLeft: '5px solid #1976d2', boxShadow: 2 }}>
              {/* Le pasamos obra.url_pdf que es como viene en tu JSON */}
              <CardActionArea onClick={() => abrirPdf(obra.id, obra.url_pdf)}>
                <CardContent sx={{ minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="h6" component="div" gutterBottom>
                      {obra.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {obra.sinopsis}
                    </Typography>
                  </div>
                  <Typography variant="caption" color="primary" fontWeight="bold" sx={{ mt: 2, display: 'block' }}>
                    📄 VER ARCHIVO PDF ({obra.anio_publicacion})
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}
