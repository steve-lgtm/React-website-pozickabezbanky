import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/video-10.mp4" autoPlay loop muted />
      <h1>Neschválili Vám pôžičku v banke?</h1>
      <p>Nezúfajte vyskúšajte to u nás!</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          to={"kontakt"}
        >
          KONTAKT
        </Button>
        <Button
          className="btns"
          to={"/ziadost"}
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={console.log("hey")}
        >
          ŽIADOSŤ O PÔŽIČKU
          <FontAwesomeIcon icon="fa-solid fa-pen-clip" className="write-icon" />
        </Button>
      </div>
      <div className="viac-info">
        Požičiame Vám bez akýchkoľvek poplatkov za vybavenie. Peniaze sú na
        vašom účte už do 24h od schválenia pôžičky.
      </div>
      <div className="viac-info-scroll">
        Viac informácií
        <div class="container">
  <div class="content">
    <p>Hover me !</p>
    <svg id="more-arrows">
      <polygon class="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "/>
      <polygon class="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "/>
      <polygon class="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "/>
    </svg>
  </div>
</div>
      </div>
    </div>
  );
}

export default HeroSection;
