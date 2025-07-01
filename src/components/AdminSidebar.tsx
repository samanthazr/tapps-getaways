import AddIcon from '@mui/icons-material/Add';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { Box, Button,
  // Container, Link, Typography
 } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';

export default function AdminSideBar() {
  return (
    <>
      <Grid size={{ xs:2 }}>
        <Box
          sx={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start',
            minWidth: 150,
            mt: 2.6,
            ml: 2.3,
            // padding: '10px 0px 0px 0px',
          }}>
          <Button
            type="link"
            disableElevation
            variant="contained"
            href="/my_getaways"
            sx={{
              mb: 2, padding: '5px 0px',
              width: '170px',
              bgcolor: '#3C1C91', color: '#FFF', borderRadius:'8px', fontWeight: 'medium', textTransform: 'none'
            }}
          >
            <IconButton aria-label="add" sx={{ color:"#C9F305", pl: '0'}} ><SportsTennisIcon/></IconButton>
            My getaways
          </Button>
          <Button
            type="link"
            disableElevation
            variant="contained"
            href="/creategetaway"
            sx={{
              width: '170px',
              mb: 2, padding: '5px 0px',
              bgcolor: '#3C1C91', color: '#FFF', borderRadius:'8px', fontWeight: 'medium', textTransform: 'none'
            }}
          >
            <IconButton aria-label="add" sx={{ color:"#C9F305", pl: '0'}} ><AddIcon/></IconButton>
            New getaway
          </Button>
        </Box>
      </Grid>
    </>
  );
}