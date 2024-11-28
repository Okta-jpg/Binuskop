import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MovieNavbar from './components/pages/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Detailpage from './components/pages/Detailpage';
import History from './components/pages/History';
import Bookingpage from './components/pages/Bookingpage';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <MovieNavbar/>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/detail/:id' element={<Detailpage/>}/>
          <Route path="/booking/:id" element={<Bookingpage />} />
          <Route path='/history' element={<History/>}/>
        </Routes>
      </main>
    </div>
  </BrowserRouter>
  );
}

export default App;