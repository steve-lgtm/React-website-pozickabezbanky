import React,{useRef} from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeroSection() {
  const handleClick = () => {
    window.scrollTo({
      top: 700,
      behavior: 'smooth',
  });
  };
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
      <div className="vedla" onClick={handleClick}>
      <div className="viac-info-scroll" >
        Viac informácií
    </div>
    <div class="arrow bounce">
  <a  class="fa fa-arrow-down fa-sm" href="#"></a>
</div>
</div>

      </div>

  );
}

export default HeroSection;
