import '../style/Navbar.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareInstagram, faLine } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/tshapeof-logo.png';

function Navbar() {
  const links = [
    { name: '', render: '關於謝工作室' },
    { name: 'pottery', render: '認識陶器' },
    { name: 'products', render: '選購陶器' },
    { name: 'contact', render: '聯絡我們' }
  ];
  const [mounted, setMounted] = useState('');
  function handleTogglePage(name) {
    setMounted(name);
  }
  const linkElements = links.map((link) => (
    <Link
      key={link.name}
      to={`/${link.name}`}
      className={mounted === link.name ? 'link mounted' : 'link'}
      onClick={() => handleTogglePage(link.name)}>
      {link.render}
    </Link>
  ));
  return (
    <nav className="navbar">
      <img src={logo} alt="" className="logo" />
      <div className="container">
        {linkElements}
        <footer>
          <a href="https://www.facebook.com/T.shape.of/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faSquareFacebook} className="brand-icon" />
          </a>
          <a href="https://www.instagram.com/t_shape_of/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faSquareInstagram} className="brand-icon" />
          </a>
          <a href="" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLine} className="brand-icon" />
          </a>
        </footer>
      </div>
    </nav>
  );
}

export default Navbar;
