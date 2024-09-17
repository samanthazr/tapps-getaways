import React from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2';

import GetawaysLogo from '../components/GetawaysLogo/GetawaysLogo.png';
import background1 from '../assets/backgrounds/lp.png';
// import background1 from '../assets/backgrounds/tenis.jpg';
import mapSample from '../assets/backgrounds/mapSample.png';
import clubView1 from '../assets/backgrounds/clubView1.png';
import '../App.css';
import '../index.css';

const LandingPage = () => {
  return (
    <>
      <Box>
        <img src={background1}
          alt="tennis player"
          style={{
            marginTop:'4em',
            width:'100%',
            position: 'relative'
          }}
        />
      </Box>
      <section className='section'>
        <h2 className='title'> Destinos más populares en Los Angeles </h2>
        <div className='cards'>
          <div className='card1'>
            <Card sx={{ width: 250, margin: '0 20px' }}>
              <CardMedia
                sx={{ height: 150 }}
                image={clubView1}
                title="getaway 1"
              />
              <CardContent className='purpBtn2'>
                <Typography gutterBottom variant="body2" component="div">
                  Club Campestre Cañaveral
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='card1'>
            <Card sx={{ width: 250, margin: '0 20px' }}>
              <CardMedia
                sx={{ height: 150 }}
                image={clubView1}
                title="getaway 2"
              />
              <CardContent className='purpBtn2'>
                <Typography gutterBottom variant="body2" component="div">
                  Club Campestre Cañaveral
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='card1'>
            <Card sx={{ width: 250, margin: '0 20px' }}>
              <CardMedia
                sx={{ height: 150 }}
                image={clubView1}
                title="getaway 2"
              />
              <CardContent className='purpBtn2'>
                <Typography gutterBottom variant="body2" className='purpBtn2' component="div">
                  Hato Grande Club
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <center className='blueBg rcnets'>
        <section className='section '>
          <h2 className='title'>RCnets ofreciendo Getaways Tours&trade;</h2>
          <p> ¡Únete y disfruta de beneficios exclusivos! </p>
        </section>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Grid size={{ xs:2 }}>
            <img src={GetawaysLogo} style={{height:'36px'}} className="logo" alt="Club Logo" />
          </Grid>
          <Grid size={{ xs:2 }}>
            <img src={GetawaysLogo} style={{height:'36px'}} className="logo" alt="Club Logo" />
          </Grid>
          <Grid size={{ xs:2 }}>
            <img src={GetawaysLogo} style={{height:'36px'}} className="logo" alt="Club Logo" />
          </Grid>
          <Grid size={{ xs:2 }}>
            <img src={GetawaysLogo} style={{height:'36px'}} className="logo" alt="Club Logo" />
          </Grid>
        </Grid>
      </center>
      <section className='section blueBg' >
        <h2 className='title'>
          Destinos cercanos en tu zona
        </h2>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid>
            <section className='section'>
              <ul>
                <li>Encuentra los mejores destinos de racquets en tu zona</li>
                <li>Accede a clubes de alta calidad</li>
                <li>Participa en eventos exclusivos </li>
                <li>Disfruta de beneficios únicos</li>
                <br/>
                <p className='label'>¡Regístrate y explora paquetes increíbles!</p>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 5, bgcolor: '#C9F305', color: '#1A2660', fontWeight: 'bold', borderRadius:'30px'
                  }}
                  disableElevation
                >
                  Acceder
                </Button>
              </ul>
            </section>
          </Grid>
          <Grid size={{ xs:6 }}>
            <section>
              <img src={mapSample} style={{maxHeight:'400px'}} className="logo" alt="locations sample" />
            </section>
          </Grid>
        </Grid>
      </section>
      <Box className='benefitsSection'>
        <h2 className='title2'>Descubre todos los beneficios que puedes tener</h2>
        <section className='benefits'>
          <Box sx={{ minWidth: 450 }}>
            <Card variant="outlined"
              className='benefitsCards2'
              sx={{ border: 'solid 0.25em #00E392',
                borderRadius: '15px',
              }}>
              <CardContent sx={{ bgcolor: '#fff' }}>
                <Typography variant="h5">
                  Beneficios para jugadores y turistas
                </Typography>
                <Typography variant="body2">
                  <ul>
                    <li>Accede a la d/TC turística de tu preferencia para disfrutar tu estadía</li>
                    <li>Explora diversas ofertas en cualquier parte del mundo</li>
                    <li>Selecciona el Getaway que mejor se adapte a tu presupuesto</li>
                    <li>Mejora tu experiencia de viaje usando nuestras aplicaciones Racquets! AppSuite&trade;</li>
                  </ul>
                </Typography>
                <center>
                  <Button
                    sx={{ mb: 1, padding: '5px 15px', bgcolor: '#C9F305', color: '#1A2660', fontWeight: 'bold', borderRadius:'30px', textTransform: 'none', justifyContent: "center" }}
                    > Ver paquetes
                  </Button>
                </center>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <Card variant="outlined"
              className='benefitsCards2'
              sx={{ border: 'solid 0.25em #C9F305', borderRadius: '15px',
              }}>
              <CardContent sx={{ bgcolor: '#fff' }}>
                <Typography variant="h5">
                  Beneficios para RCnets
                </Typography>
                <Typography variant="body2" component="div">
                  <ul>
                    <li>Oferta tus mejores planes para conectar con jugadores en su geografía local</li>
                    <li>Logra un incremento exponencial en la participación de jugadores/turistas en tu d/TC</li>
                    <li>Personaliza tus ofertas dentro de la plataforma Racquets! Getaways&trade;</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </section>
      </Box>
    </>
  );
};
export default LandingPage;