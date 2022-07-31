import React from "react";
import "./Onas.css";

export default function Onas() {
return(
    <>
    <div className="onas-container">
    <div className="onas-item-title">
    Sme dlhoročná a overená spoločnosť pôsobiaca v oblasti sprostredkovania pôžičiek.
    </div>
    <div className="onas-item-body">
        <div className="center">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            PÔŽIČKA BEZ BANKY
            {/* <FontAwesomeIcon icon="fa-solid fa-money-bill-1-wave" className='nav-icon'/> */}
            <FontAwesomeIcon
              icon="fa-solid fa-sack-dollar"
              className="nav-icon"
            />
    </div>
<img src="images/office.jpg"/>
</div>
    </div>
    <div className="onas-container-info">
</div>
    </>
)
}