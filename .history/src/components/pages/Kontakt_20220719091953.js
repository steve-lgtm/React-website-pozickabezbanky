import React from "react";
import "../../App.css";
import "./Kontakt.css";

const Kontakt = () => {
  return (
    <div className="hero-container-contact">
      <video src="/videos/video-10.mp4" autoPlay loop muted />
      <div className="contact-number">
        <h1>Telefonné číslo:</h1>
        <p>0940 838 058</p>
        <h1>E-mail:</h1>
        <p>pozickabezbanky@gmail.com</p>
      </div>
      <div className="contact-number">
        <h1>Adresa:</h1>

        <p>Moldavská cesta 29</p>
        <p>040 11 Košice</p>
        <p>Slovensko</p>
      </div>
      <div className="contact-number">
        <h1>Otváracie hodiny:</h1>
        <div className="table-open">
          <table>
            <tr>
              <td>PO</td>
              <td>9:00 - 17:00</td>
            </tr>
            <tr>
              <td>UT</td>
              <td>9:00 - 17:00</td>
            </tr>
            <tr>
              <td>ST</td>
              <td>9:00 - 17:00</td>
            </tr>
            <tr>
              <td>ŠT</td>
              <td>9:00 - 17:00</td>
            </tr>
            <tr>
              <td>PIA</td>
              <td>9:00 - 17:00</td>
            </tr>
            <tr>
              <td>SO</td>
              <td>Zatvorené</td>
            </tr>
            <tr>
              <td>NE</td>
              <td>Zatvorené</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;
