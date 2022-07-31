import React from "react";
import "./Onas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Onas() {
  return (
    <>
      <div className="onas-container">
        <div className="onas-item-title">
          Sme dlhoročná a overená spoločnosť pôsobiaca v oblasti
          sprostredkovania pôžičiek.
        </div>
        <div className="onas-item-body">
          <div className="center">
            <div className="navbar-container">
              PÔŽIČKA BEZ BANKY
              <FontAwesomeIcon
                icon="fa-solid fa-sack-dollar"
                className="onas-nav-icon"
              />
            </div>
          </div>
          <img src="images/office.jpg" />
        </div>
      </div>

    </>
  );
}
