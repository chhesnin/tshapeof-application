import '../style/Navbar.scss';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareInstagram, faLine } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/tshapeof-logo-s.png';
import logoPottery from '../assets/tshapeof-logo-pottery-s.png';
import Context from '../Context';
import useResizeEventListener from '../hooks/useResizeEventListener';

function Navbar() {
  const { user, isSignOpen, isNavbarOpen, toggleSignOpen, handleSignOut, toggleNavbarOpen } =
    useContext(Context);
  const links = [
    { name: 'pottery', render: '認識陶器' },
    { name: 'products', render: '選購陶器' },
    { name: 'contact', render: '聯絡我們' }
  ];
  const [mounted, setMounted] = useState('');
  const { isShorterThan576 } = useResizeEventListener();
  function handleTogglePage(name) {
    setMounted(name);
    toggleNavbarOpen();
    toggleSignOpen(false);
  }
  function handleToggleSign() {
    toggleSignOpen();
    toggleNavbarOpen();
  }
  useEffect(() => {
    if (window.innerWidth < 576) {
      toggleNavbarOpen(false);
    }
  }, []);
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
    <>
      <div className={isNavbarOpen ? 'hamburger-container' : `hamburger-container close`}>
        <input
          className={isNavbarOpen ? 'hamburger' : `hamburger close`}
          type="checkbox"
          onClick={toggleNavbarOpen}
        />
      </div>
      <nav className={isNavbarOpen ? 'navbar' : `navbar close`}>
        <div className="logo-container">
          <Link to="/" onClick={toggleNavbarOpen}>
            <img
              src={window.innerWidth < 576 || isShorterThan576 ? logoPottery : logo}
              alt=""
              className="logo"
            />
          </Link>
        </div>
        <div className="nav-container">
          {linkElements}
          {user ? (
            <div className="link" onClick={handleSignOut} role="presentation">
              登出
            </div>
          ) : (
            <div
              className={isSignOpen ? 'link mounted' : 'link'}
              onClick={handleToggleSign}
              role="presentation">
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
    </>
  );
}

export default Navbar;
