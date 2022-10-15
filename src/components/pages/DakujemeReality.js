import React, { useState, useRef } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";

const DakujemeReality = () => {
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-plan">Kontaktný formulár bol úspešne odoslaný!</div>
          <div className="card-title2">Ďakujeme! </div>
          <div className="card-title">
            Obdržali sme kontaktný formulár a čoskoro Vás budeme
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

export default DakujemeReality;