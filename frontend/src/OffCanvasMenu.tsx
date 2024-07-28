import { useState } from 'react';
import './offCanvasCss.css';
import {Link} from 'react-router-dom';

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
        <nav>
            <Link to='/' className='ul' onClick={toggleMenu}>Predict</Link>
            <Link className='ul' to='/explore' onClick={toggleMenu}>Explore</Link>
        </nav>
      </div>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default OffCanvasMenu;
