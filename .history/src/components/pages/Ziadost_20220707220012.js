import React from 'react';
import '../../App.css';
import './Ziadost.css'
import { useState } from 'react';


export default function Ziadost() {
  const [values, setValues] = useState({
    amount: 5000.
    period: 3
  });
  const handleChange = event => {
    setAmount(event.target.value);
  };
  return (
    <>
      <h1 className='header-form'>
          Vyplňte formulár pre nezáväznu žiadosť o pôžičku.
        </h1>
      <form>
      <div className='container-form'>
        <div className='section-name'>Požadovaná suma</div>

          <h2>{amount}</h2>
            <div className="containerslider">
                <div className="pullleft" style={{fontSize:"1.2rem"}}>
                    500€
                </div>
                <div className="pullright" style={{fontSize:"1.2rem"}}>
                    15 000€
                </div>
            <input type="range" name="Výška_pôžičky" step="100" min="500" max="15000" onChange={handleChange} value={amount} className="slider" id="suma"/>
            <div className="pullleft" style={{fontSize: "1rem"}}>
                min.
            </div>
            <div className="pullright" style={{fontSize: "1rem"}}>
                max.
            </div>
            </div>

       <div className='section-name'>Doba splácania</div>

          <h2>{amount}</h2>
            <div className="containerslider">
                <div className="pullleft" style={{fontSize:"1.2rem"}}>
                    1 rok
                </div>
                <div className="pullright" style={{fontSize:"1.2rem"}}>
                    8 rokov
                </div>
            <input type="range" name="Výška_pôžičky" step="1" min="1" max="8" onChange={handleChange} value={period} className="slider" id="doba"/>
            <div className="pullleft" style={{fontSize: "1rem"}}>
                min.
            </div>
            <div className="pullright" style={{fontSize: "1rem"}}>
                max.
            </div>
            </div>
            </div>

      </form>

    </>
  );
}
