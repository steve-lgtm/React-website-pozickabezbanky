import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kontakt from "./components/pages/Kontakt";
import Ziadost from "./components/pages/Ziadost";
import Onas from "./components/pages/Onas";
import Dakujeme from "./components/pages/Dakujeme";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Reality from './components/pages/Reality';
import DakujemeReality from './components/pages/DakujemeReality'


library.add(fas);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/onas" element={<Onas />} />
        <Route path="/ziadost" element={<Ziadost />} />
        <Route path="/dakujeme" element={<Dakujeme />} />
        <Route path="/dakujemeReality" element={<DakujemeReality />} />
        <Route path="/predanieBytu" element={<Reality />} />
      </Routes>
    </Router>
  )
}

export default App;
