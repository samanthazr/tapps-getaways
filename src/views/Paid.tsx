import { styled } from '@mui/material/styles';
import { Container, Divider, Stack, Box, Typography, Button } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: 'white',
  borderStyle: 'dashed',
}));

function Paid() {
  return (
    <>
      <Container
        sx={{
          display:"flex",
          flexDirection: 'column', mt:2, pt:4, pb:4,
          width: '70%',
        }}
      >
        <Box sx={{
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor:'#371984',
          mt:8, pt:10
        }}>
          <center>
            <TaskAltIcon sx={{ color:'#fff'}}  />
            <Typography component="h1" variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Thank you for your order! 🎉
            </Typography>
            <Typography
              sx={{
                color: '#fff',
                textDecoration: 'none', pb:10
              }}>
              The payment receipt will be sent to your registered email address.
            </Typography>
          </center>
          <StyledDivider />
          <Box>
            <Stack sx={{
              m:2,
              display:"flex",
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Button
                startIcon={<ArrowBackIcon />}
                type="button"
                href="/getaways"
                variant="contained"
                sx={{
                  mt: 1, mb: 3, borderRadius:'8px',
                  minWidth: '18vw',
                  maxWidth: '13vw',
                  bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'bold', textTransform: 'none',
                  ':hover': { bgcolor: 'white', color: '#3C1C91'},
                  borderColor: 'primary.main', border: 1
                }}
              >
                Search more getaways!
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Paid;