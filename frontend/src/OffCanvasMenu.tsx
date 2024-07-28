import { useState } from 'react';
import './offCanvasCss.css';
//import {Link} from 'react-router-dom';

const OffCanvasMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`off-canvas-menu ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMenu}>
          &times;
        </button>
        <nav>
          <ul>
            <li><a href="/">Predict</a></li>
            <li><a href="/explore">Explore</a></li>
          </ul>
        </nav>
      </div>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default OffCanvasMenu;
