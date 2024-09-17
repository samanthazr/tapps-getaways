import AddIcon from '@mui/icons-material/Add';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';

export default function AdminSidebar() {
  return (
    <>
      <Grid size={{ xs:2 }}>
        <Box
          sx={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start',
            minWidth: 150,
            mt: 2.6,
            ml: 2.3
          }}>
          <Button
            type="link"
            disableElevation
            variant="contained"
            href="/my_getaways"
            sx={{
              mb: 2,
              borderRadius:'8px',
              padding: '5px 18px 5px 9px',
              bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'medium', textTransform: 'none'
            }}
          >
            <IconButton aria-label="add" sx={{ color:"#C9F305"}} ><SportsTennisIcon/></IconButton>
            My getaways
          </Button>
          <Button
            type="link"
            disableElevation
            variant="contained"
            href="/creategetaway"
            sx={{
              mb: 2,
              borderRadius:'8px',
              padding: '5px 18px 5px 9px',
              bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'medium', textTransform: 'none'
            }}
          >
            <IconButton aria-label="add" sx={{ color:"#C9F305"}} ><AddIcon/></IconButton>
            New getaway
          </Button>
        </Box>
      </Grid>
    </>
  );
}