import React from 'react';
import '../../App.css';
import './Ziadost.css'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Ziadost() {
  return (
    <>
    <div className='container-form'>
      <form>
        <h1 className='header-form'>
          Vyplňte formulár pre nezáväznu žiadosť o pôžičku.
        </h1>
        <p>Požadovaná suma</p>

                <div className="containersuma">

          <h2> <span id="vystupsuma"></span>15 000€</h2>
            </div>
            <div className="containerslider">
                <div class="pullleft" style={{fontSize:"1.2rem"}}>
                    500€
                </div>
                <div className="pullright" style={{fontSize:"1.2rem"}}>
                    10 000€
                </div>
            <input type="range" name="Výška_pôžičky" step="100" min="500" max="10000" value="5000" class="slider" id="suma"/>
            <div class="pullleft" style={{fontSize: "1rem"}}>
                min.
            </div>
            <div class="pullright" style={{fontSize: "1rem"}}>
                max.
            </div>
            </div>
            <Slider />
            <Range />

      </form>
    </div>
    </>
  );
}
