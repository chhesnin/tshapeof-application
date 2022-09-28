import './App.scss';
// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pottery from './pages/Pottery';
import Products from './pages/Products';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pottery" element={<Pottery />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
