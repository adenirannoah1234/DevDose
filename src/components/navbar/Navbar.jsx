import { useEffect, useState } from 'react';
// import Logo from '../../assets/images/diamond logo.png';
import {
  FaUser,
  FaInfoCircle,
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userDropDown, setUserDropDown] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };
  return (
    <nav>
      <Link to="/" className="link">
        <h1>DevDose</h1>
      </Link>
      <div className="menu-icon" onClick={toggleNav}>
        {openNav ? <FaTimes /> : <FaBars />}
      </div>
      <div></div>
      <div id="main-id" className={openNav ? 'visible' : ''}>
        {user ? (
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
              <FaUser /> {/* User icon */}
            </button>
            {isOpen && (
              <div className="dropdown-content">
                <a href="/">
                  <FaHome /> Home
                </a>
                <a href="/Dashboard">
                  {' '}
                  <FaTachometerAlt /> Dashboard
                </a>
                <a href="/About">
                  <FaInfoCircle /> About
                </a>
                <a
                  href="#"
                  onClick={() => {
                    localStorage.clear();
                    navigate('/');
                  }}
                >
                  <FaSignOutAlt /> Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="navlink">
            <Link className="link2" to="/">
              Home
            </Link>
            <Link className="link2" to="/About">
              About us
            </Link>
            <div>
              <button onClick={() => navigate('/SignIn')}>LOGIN</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
