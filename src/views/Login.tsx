import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';
import '../index.css';
import '../App.css';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const defaultTheme = createTheme();

// Define validation schema using yup
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Invalid email address'
    ),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Define interface for form input
interface LoginInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: LoginInput) => {
    console.log(data);
    navigate('/getaways');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="background-container"></div>
      <Container component="main" maxWidth="xs" style={{ position: 'relative' }}>
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            mb: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: '#C9F305', fontWeight: 'bold' }}>
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ m: 1 }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email | Use your Racquets!™ account"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />
            <Button
              className="greenBtn"
              variant="contained" fullWidth
              type="submit"
              sx={{
                mt: 3, mb: 5, borderRadius: '8px', padding: '5px 15px', margin: '5 5px',
                bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'bold',
                textTransform: 'none',
                ':hover': { bgcolor: 'white', color: '#3C1C91' }
               }}
            >
              Log In
            </Button>
            <Grid container
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Grid>
                <Typography
                  sx={{
                    // color: '#fff',
                    textDecoration: 'none' }}>
                  Don't have a Racquets! AppSuite™ account?
                </Typography>
              </Grid>
              <Grid
                container direction="row" justifyContent="center" alignItems="center" spacing={10}
                sx={{ flexGrow: 1, height: '30px' }}
              >
                <Grid>
                  <Button
                    startIcon={<ShopIcon />}
                    variant="contained"
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.terracomsortium.tapps&hl=es_CO"
                    sx={{
                      mt: 3, mb: 5, borderRadius: '8px', padding: '5px 15px', margin: '5 5px',
                      bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'bold',
                      textTransform: 'none',
                      ':hover': { bgcolor: 'white', color: '#3C1C91' }
                     }}
                  >
                    Google store
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    startIcon={<AppleIcon />}
                    variant="contained" target="_blank"
                    href="https://apps.apple.com/co/app/racquetsappsuite/id1592585843"
                    sx={{
                      mt: 3, mb: 5, borderRadius: '8px', padding: '5px 15px', margin: '5 5px',
                      bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'bold',
                      textTransform: 'none',
                      ':hover': { bgcolor: 'white', color: '#3C1C91' }
                    }}
                  >
                    Apple Store
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;