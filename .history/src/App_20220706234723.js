import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Onas from './components/pages/Onas.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
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
          <Route path='/' exact element={<Onas />} />
          <Route path='/kontakt' element={<Services/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/ziadost' element={<Ziadost/>} />
        </Routes>
      </Router>
  );
}

export default App;