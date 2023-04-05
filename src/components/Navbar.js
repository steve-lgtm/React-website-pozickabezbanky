import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();

  const showButton = () => {
    if (window.innerWidth <= 1040) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            PÔŽIČKA BEZ BANKY
            {/* <FontAwesomeIcon icon="fa-solid fa-money-bill-1-wave" className='nav-icon'/> */}
            <FontAwesomeIcon
              icon="fa-solid fa-sack-dollar"
              className="nav-icon"
            />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Domov
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/onas" className="nav-links" onClick={closeMobileMenu}>
                O nás
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/kontakt"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Kontakt
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/predanieBytu"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Predať byt
              </Link>
            </li>

            <li>
              <Link
                to="/ziadost"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                ŽIADOSŤ O PÔŽIČKU
              </Link>
            </li>
          </ul>
          {button && (
            <Button to={"/ziadost"} buttonStyle="btn--outline">
              ŽIADOSŤ O PÔŽIČKU
            </Button>
          )}

        </div>

      </nav>
      <div className="novinka" >
      Upozornenie! Pôžičku nevieme schváliť, ak máte exekúciu alebo ste po osobnom bankrote.
      </div>
    </>
  );
}

export default Navbar;
