import React from "react";
import "./Card.css";

export default function Card() {
  return (
    <>
      <div className="card-home-section">
        <div className="card-home-title">Aký je postup ?</div>
        <div className="card-container">
          <div className="card-item">
            <div className="image">
              <img src="images/form.jpg" alt="" />
            </div>
            <div className="title">VYPÍSANIE ŽIADOSTI ONLINE</div>
            <div className="body">
              Vyplníte žiadosť o pôžičku, pripojíte potrebné podklady a
              kompletnú žiadosť odošlete na posúdenie.
            </div>
          </div>
          <div className="card-item">
            <div className="image">
              <img src="images/form.jpg" alt="" />
            </div>
            <div className="title">Vyhodnotenie žiadosti</div>
            <div className="body">
              Vašu žiadosť posúdime a o výsledku Vás budeme informovať. Po
              schválení pôžičky Vám zašleme zmluvu na podpis splátkový kalendár.
            </div>
          </div>
          <div className="card-item">
            <div className="image">
              <img src="images/form.jpg" alt="" />
            </div>
            <div className="title">Zaslanie peňazí</div>
            <div className="body">
              Po obdržaní podpísanej zmluvy Vám budú zaslané finančné
              prostriedky na Vami uvedený bankový účet.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}