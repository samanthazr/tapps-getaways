import './App.css'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}
export default App