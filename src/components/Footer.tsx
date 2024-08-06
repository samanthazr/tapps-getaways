import { Box, Container, Link, Button, Typography, TypographyProps } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import RacquetsLogo from '../components/RacquetsLogo/RacquetS 25 LogoHorizontal_FondoMorado.png'
import ig from '../assets/instagram.svg'
import fb from '../assets/facebook.svg'
import lkdn from '../assets/linkedin.svg'
import '../App.css'

function Copyright(props: TypographyProps) {
  return (
    <Typography
      // variant="body2"
      className='ItemCenter'
      color="text.secondary" align="center" {...props}>
      <Link color="inherit" sx={{textDecoration: 'none'}} href="https://racquetsappsuite.com/">
        Racquets! AppSuite&trade;
      </Link>{' '}
      {'All rights reserved © '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const FooterWrapper = styled(Box)(
  ({ theme }) => `
    width: 100%;
    margin: ${theme.spacing(0)} 0;
  `
);

function Footer() {
  return (
    <FooterWrapper sx={{ backgroundColor: "#3C1C91", paddingTop:'25px'}}>
      <Container maxWidth="lg">
        <Box>
          <Typography className='ItemCenter'>Follow us on our social networks to keep up with all our updates!</Typography>
        </Box>
        <Grid
          container direction="row" justifyContent="center" alignItems="center" spacing={10}
          sx={{ flexGrow: 1, height: '30px' }}
        >
          <Grid component="div">
            <Link href="https://www.instagram.com/racquetsappsuitetm/" target="_blank">
              <img src={ig} style={{
                height:'40px',
                marginTop:'15px'}} className="logo ItemCenter" alt="Instagram link" />
            </Link>
          </Grid>
          <Grid component="div">
            <Link href="https://www.facebook.com/Raquetsapp" target="_blank">
              <img src={fb}  style={{height:'45px'}} className="logo ItemCenter" alt="Facebook link" />
            </Link>
          </Grid>
          <Grid component="div">
            <Link href="https://www.linkedin.com/company/racquetsappsuite/" target="_blank">
              <img src={lkdn} style={{height:'45px'}} className="logo ItemCenter" alt="LinkedIn link" />
            </Link>
          </Grid>
        </Grid>
        <Box
          py={3}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="space-between"
        >
          <Typography sx={{ pt: { xs: 2, mt: 1, color: "#ffff" } }} variant="subtitle1">
            <Link href="https://racquetsappsuite" target="_blank" rel="noopener noreferrer">
              <img src={RacquetsLogo} style={{height:'70px'}} alt="RacquetsApp Suite logo" />
            </Link>
          </Typography>
          <Copyright sx={{ mt: 5, mb: 4,  color: "#FFF"}}/>
          <Button
            startIcon={<ArrowUpIcon />}
            sx={{
              height:'40px', margin: 2, p:'1em',
              border: 'solid 0.07em #FFFFFF',
              color: 'white',
              fontWeight: 'bold', borderRadius: '6px', textTransform: 'none',
            }}
            disableElevation
          >
            🇪🇸 SP
          </Button>
        </Box>
      </Container>
    </FooterWrapper>
  );
}
export default Footer;