import { style } from "@mui/system";
import React from "react";
import "./Card.css";

export default function CardReality() {
    const handleClick = () => {
        const element = document.getElementById("box");
        element.scrollIntoView({
          behavior: 'smooth',
      });
      };
  return (
    <>
      <div className="card-home-section">
        <div className="card-home-title">
          Kúpime váš byt v hotovosti a môžete bývať ešte 4 mesiace zadarmo
        </div>
        <div className="card-container">
          <div className="card-item">
            <div className="image">
              <img src="images/form.jpg" alt="" />
            </div>
            <div className="title">
              1. Váš byt odkúpime rýchlo a v hotovosti
            </div>
            <div className="body">
              Vyplníte <span style={{color:"red",cursor:"pointer"}} onClick={handleClick}>kontaktný formulár</span> a my Vás budeme kontaktovať. Následne dohodneme obhliadku priestorov.
            </div>
          </div>
          <div className="card-item">
            <div className="image">
            <img src="images/money.jpg" alt="" />
            </div>
            <div className="title">2. Peniaze vám vyplatíme ihneď</div>
            <div className="body">
              Vaš byt oceníme a právne úkony vybavíme a uhradíme.
            </div>
          </div>
          <div className="card-item">
            <div className="image">
              <img src="images/home.jpg" alt="" />
            </div>
            <div className="title">3. Byt môžete využívať ešte 4 mesiace </div>
            <div className="body">
            Po odkúpení máte byt na 4 mesiace k dispozícii zadarmo a hradiť budete iba energie.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
