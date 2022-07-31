import React from "react";
import "./Onas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Onas() {
  return (
    <>
    <div></div>
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
      <div className="onas-container-info">
        <div className="onas-text">
          Spolupracujeme s top 4 najlepšími nebankovkami na Slovensku a
          súkromným investorom. Hľadáme pre klienta to najvýhodnejšie a
          najlepšie riešenie v jeho aktuálnej finančej situácií.
        </div>
        <div className="who-can">
          Kto si môže požiadať o pôžičku:
          <ul>
            <li>
              <a>Zamestnanec SR</a>
            </li>
            <li>
              <a>Zamestanenec v zahraničí</a>{" "}
            </li>
            <li>
              <a>Živnostník, podnikateľ</a>{" "}
            </li>
            <li>
              <a>Starobný dôchodca do 75 rokov</a>{" "}
            </li>
            <li>
              <a>Invalidný dôchodca nad 35 rokov</a>{" "}
            </li>
            <li>
              <a>Výsluhový dôchodca</a>{" "}
            </li>

            <li>
              <a>Opatrovateľky v zahraničí (Rakúsko, Nemecko)</a>{" "}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
