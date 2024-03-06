import './App.css'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Mygetaways from './views/Mygetaways';
import Landing from './views/Landing'
import Login from './views/Login';
import BookGetaway from './views/BookGetaway';
import Payment from './views/Payment';
import Paid from './views/Paid';
import Reservations from './views/Reservations';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GetawayDetail from './components/GetawayDetail';
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3C1392',
    },
    secondary: {
      main: '#C9F305',
    },
    info: {
      main: '#0288d1',
    },
    background: {
      default: '#ffffff',
      paper: '#E1F5F4',
    },
    divider: '#3C1C91',
    text: {
      secondary: '#3C1C91',
      disabled: '#808080',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  shape: {
    borderRadius: 10,
  },
});

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getaways" element={<Mygetaways />} />
          <Route path="/getawaydetail" element={<GetawayDetail />} />
          <Route path="/bookgetaway" element={<BookGetaway />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paid" element={<Paid />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}
export default App