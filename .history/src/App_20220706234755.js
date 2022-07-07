import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kontakt from './components/pages/Kontakt';
import Products from './components/pages/Products';
import Ziadost from './components/pages/Ziadost';
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


library.add(fas)


function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/kontakt' element={<Kontakt/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/ziadost' element={<Ziadost/>} />
        </Routes>
      </Router>
  );
}

export default App;