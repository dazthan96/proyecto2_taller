import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import api from '../../config/axios';

export default function CulturaObrasPantalla() {
  const { culturaId } = useParams(); 
  const [obras, setObras] = useState([]);
  const [nombreCultura, setNombreCultura] = useState('');

  useEffect(() => {
    api.get(`/obras/cultura/${culturaId}`)
      .then((res) => {
        setObras(res.data);
        
        if (res.data.length > 0 && res.data[0].cultura) {
          setNombreCultura(res.data[0].cultura.nombre);
        }
      })
      .catch((err) => console.error("Error al cargar obras con Axios:", err));
  }, [culturaId]);

  const abrirPdf = async (obraId, rutaPdfBackend) => {
    const nombreArchivo = rutaPdfBackend.replace('src\\', '');
    await api.get(`/obras/${obraId}/descargar`)
    const urlCompleta = `http://localhost:3000/${nombreArchivo}`;
    
    window.open(urlCompleta, '_blank', 'noopener,noreferrer');
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{xs:12}}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {nombreCultura || 'No existen obras recopiladas de esta cultura'}
        </Typography>
      </Grid>

      {obras.length === 0 ? (
        <Grid size={{xs:12}}>
          <Typography variant="body1" color="text.secondary">
            Este autor aún no tiene obras registradas.
          </Typography>
        </Grid>
      ) : (
        obras.map((obra) => (
          <Grid size={{xs:12, md:4}} key={obra.id}>
            <Card sx={{ bgcolor: '#fafafa', borderLeft: '5px solid #1976d2', boxShadow: 2 }}>
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
