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
            <div className="title">Vypísanie žiadosti ONLINE</div>
            <div className="body">
              Vašu žiadosť posúdime a o výsledku Vás budeme informovať. Po
              schválení pôžičky Vám zašleme zmluvu na podpis splátkový kalendár.
            </div>
          </div>
          <div className="card-item">
            <div className="image">
              <img src="images/form.jpg" alt="" />
            </div>
            <div className="title">Vyhodnotenie ž</div>
            <div className="body">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>
          </div>
          <div className="card-item">
            <div className="image">
              <img src="images/form.jpg" alt="" />
            </div>
            <div className="title">Vypisanie ziadosti</div>
            <div className="body">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
