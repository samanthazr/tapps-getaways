import './App.css'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './views/Login';
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}
export default App