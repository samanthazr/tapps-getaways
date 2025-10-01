import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import prevPhoto from '../assets/backgrounds/hotel.jpg';
import '../App.css';

interface GetawayItemProps {
  name: string;
  dates: string;
  description: string;
}

function GetawayItem({ name, dates, description }: GetawayItemProps) {
  const navigate = useNavigate();

  const toGetaway = () => {
    navigate('/getawaydetail');
  };

  const editGetaway = () => {
    navigate('/creategetaway');
  };

  const bookGetaway = () => {
    navigate('/bookgetaway');
  };

  const bookings = () => {
    navigate('/reservations');
  };

  return (
    <>
      <Card elevation={0} sx={{ display: "flex", mb:2, borderRadius: "10px", backgroundColor: '#fff', boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9"}}>
        <CardContent sx={{ ml: 1 }}>
          <Box>
            <Typography
              gutterBottom
              variant="h6"
              onClick={toGetaway}
              style={{ cursor: 'pointer' }}
              sx={{ fontSize: '18px', mb:'1px'}}
            >
              {name}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 'bold'}}>
              Fechas: {dates}
            </Typography>
          </Box>
          <Box component="p" sx={{ fontSize: 14, color: "black", m: '0.5rem 0'}}>
            {description}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                width: 120,
                padding:'0 5', borderRadius: '30px',
                bgcolor: '#00E392', color: '#1A2660',
                fontWeight: 'bold', fontVariantCaps: 'normal'
              }}
              disableElevation
              onClick={bookGetaway}
            >
              Book now
            </Button>
            <Button
              sx={{
                width: 136,  m: '0 0.5rem',
                borderRadius: '30px',
                bgcolor: '#00E392', color: '#1A2660',
                fontWeight: 'bold', fontVariantCaps: 'normal'
              }}
              disableElevation
              onClick={ bookings }
            >
              Reservations
            </Button>
          </Box>
        </CardContent>
        <CardMedia
          image={prevPhoto}
          sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            minWidth: "35%", maxWidth: "38%",
            borderRadius: '0 10px 10px 0'
          }}
        >
          <Button onClick={editGetaway} disableElevation
            sx={{
              minWidth: 160,
              mt: 18, borderRadius: '30px',
              color: '#1A2660', bgcolor: '#00E392',
              fontWeight: 'bold', fontVariantCaps: 'normal'
            }}
          >
            Edit getaway
          </Button>
        </CardMedia>
      </Card>
    </>
  );
}
export default GetawayItem;