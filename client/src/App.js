import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/Homescreen.js";
import Bookingscreen from "./screens/Bookingscreen.js";
import Registerscreen from "./screens/Registerscreen.js";
import Loginscreen from "./screens/Loginscreen.js";
import Landingscreen from "./screens/Landingscreen.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" exact element={<Homescreen />} />
          <Route path="/book/:roomid/:fromdate/:todate" exact element={<Bookingscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/" exact element={<Landingscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
