import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Homescreen from './screens/Homescreen.js';
import Bookingscreen from './screens/Bookingscreen.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
       <Routes>
          <Route path="/home" exact element={<Homescreen />} />
          <Route path="/book/:roomid" exact element={<Bookingscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
