import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pottery from './pages/Pottery';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Sign from './pages/Sign';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pottery" element={<Pottery />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Sign />
      <Navbar />
    </div>
  );
}

export default App;
