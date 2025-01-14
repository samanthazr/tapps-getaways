// import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Container,
  Divider,
  Stack,
  Typography,
  Button,
  Box,
} from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
// import RappsCourtsCOLLAGEdarker from '../assets/backgrounds/RappsCourtsCOLLAGEdarker.png';

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: 'white',
  borderStyle: 'dashed',
}));

function Payment() {
  const formData = JSON.parse(localStorage.getItem('selectedData') || '{}'); // Recuperar datos
  const { total, taxes, lodgingOption, amenities } = formData;

  // const location = useLocation();
  // const { formData } = location.state as any;
  // const { total, taxes } = formData;

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 7, pt: 4, pb: 4,
          width: '75%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            mt: 2,
            pt: 4,
            padding: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#371984', borderRadius: '8px',
          }}
        >
          <center>
            <Typography component="h1" variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Order summary
            </Typography>
          </center>
          <Box sx={{ height: '70%'}}>
            <Stack sx={{ fontSize: 15, ml: 2, color: '#fff', p: 3, pb: 3 }}>
              <h3 className='title3'>Padel Weekend Getaway!</h3>
              <span className=''>at The Ritz-Carlton Key Biscayne Miami, Florida</span>
              <span> October 11-13, 2024</span>

              <div className=''>
                <h4>Taxes: ${taxes.toFixed(2)} USD</h4>
                <h4>Total: ${total.toFixed(2)} USD</h4>
                <h3>Total amount: ${total.toFixed(2)} USD</h3>

                <Typography>Lodging Option: {lodgingOption}</Typography>
                <Typography>
                  Add Ons:
                  {amenities?.specialDinner && ' Special Dinner,'}
                  {amenities?.meetGreet && ' Meet & Greet,'}
                  {amenities?.tennisClass && ' Tennis Class'}
                </Typography>
                <Typography>Taxes: ${taxes?.toFixed(2) || 0} USD</Typography>
                <Typography>Total: ${total?.toFixed(2) || 0} USD</Typography>
              </div>

            </Stack>
          </Box>
          <StyledDivider />
          <Box>
            <Stack sx={{ fontSize: 15, ml: 2, color: '#fff', p: 3, pb: 3 }}>
              <Typography
                sx={{
                  color: '#fff', textDecoration: 'none',
                }}
              >
                The payment will be submitted from your Racquets!™ account:
              </Typography>
            </Stack>

            <Card
              sx={{
                ml: 29, p: 2,
                width: '50%', bgcolor: '#fff',
              }}
            >
              <CardContent>
                <div>
                  <Typography sx={{ fontWeight: 'lg' }}>
                    playerName 💳
                  </Typography>
                  <Typography sx={{ fontWeight: 'lg' }}>**** **** **** 0000</Typography>
                </div>
              </CardContent>
            </Card>

            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                startIcon={<ArrowBackIcon />}
                type="button"
                href="/MyGetaways"
                variant="contained"
                sx={{
                  mt: 1, mb: 3,
                  minWidth: '13vw',
                  padding: '5px 15px',
                  margin: '5 15px',
                  borderRadius: '8px',
                  bgcolor: '#FFF', color: '#3C1C91',
                  fontWeight: 'medium', textTransform: 'none',
                  ':hover': { bgcolor: '#3C1C91', color: 'white' },
                }}
                disableElevation
              >
                Retry
              </Button>
              <Box sx={{ color: '#3C1C91' }}>..........</Box>
              <Button
                startIcon={<CreditCardIcon />}
                type="submit"
                href="/paid"
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 3,
                  borderRadius: '8px',
                  minWidth: '15vw',
                  maxWidth: '13vw',
                  bgcolor: '#3C1C91', color: '#FFF',
                  fontWeight: 'bold', textTransform: 'none',
                  ':hover': { bgcolor: 'white', color: '#3C1C91' },
                  borderColor: 'primary.main',
                  border: 1,
                }}
              >
                Confirm payment
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Payment;