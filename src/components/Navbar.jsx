import '../style/Navbar.scss';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareInstagram, faLine } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/tshapeof-logo.png';
import Context from '../Context';

function Navbar() {
  const { user, toggleSignOpen, handleSignOut } = useContext(Context);
  const links = [
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
      <Link to="/">
        <img src={logo} alt="" className="logo" />
      </Link>
      <div className="nav-container">
        {linkElements}
        {user ? (
          <div className="link" onClick={handleSignOut} role="presentation">
            登出
          </div>
        ) : (
          <div className="link" onClick={toggleSignOpen} role="presentation">
            登入 | 註冊
          </div>
        )}
        <footer>
          <a href="https://www.facebook.com/T.shape.of/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faSquareFacebook} className="brand-icon" />
          </a>
          <a href="https://www.instagram.com/t_shape_of/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faSquareInstagram} className="brand-icon" />
          </a>
          <a href="https://line.me/ti/p/~@tshapeof" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLine} className="brand-icon" />
          </a>
        </footer>
      </div>
    </nav>
  );
}

export default Navbar;
