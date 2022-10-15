import React, { useState, useRef } from "react";
import "./Dakujeme.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";

const Dakujeme = () => {
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-plan">Žiadosť bola úspešne odoslaná !</div>
          <div className="card-title2">Ďakujeme za podanie žiadosti. </div>
          <div className="card-title">
            Žiadosť je aktuálne v schvaľovacom procese a čoskoro Vás budeme
            kontaktovať mailom alebo telefonicky.
          </div>
          <Button buttonSize={"btn--large"} to={"/"} buttonStyle="btn--outline">
            DOMOV
          </Button>
        </div>
      </div>
    </>
  );
};

export default Dakujeme;
