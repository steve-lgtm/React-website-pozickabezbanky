import React from 'react';
import '../../App.css';
import './Ziadost.css'

export default function Ziadost() {
  return (
    <>
    <div className='container-form'>
      <form>
        <h1 className='header-form'>
          Vyplňte formulár pre nezáväznu žiadosť o pôžičku.
        </h1>
        <p>Požadovaná suma</p>
            <div className="containerform">
                <div className="containersuma">

          <h2> <span id="vystupsuma"></span>€</h2>
            </div>
            <div className="containerslider">
                <div class="pullleft" style="font-size:1.2rem;">
                    500€
                </div>
                <div className="pullright" style="font-size:1.2rem;">
                    10 000€
                </div>
            <input type="range" name="Výška_pôžičky" step="100" min="500" max="10000" value="5000" class="slider" id="suma"/>
            <div class="pullleft" style={{fontSize: "1rem"}}>
                min.
            </div>
            <div class="pullright" style="font-size:1rem;">
                max.
            </div>
            </div>
        </div>

        <p>Doba splácania</p>

        <div class="containerform">
            <div class="containersuma">
           <h2> <span id="vystupdoba"></span></h2>
            </div>
            <div class="containerslider">
                <div class="pullleft" style="font-size:1.2rem;">
                    1 rok
                </div>
                <div class="pullright" style="font-size:1.2rem;">
                    8 rokov
                </div>
            <input type="range" name="Doba_splácania" step="1" min="1" max="8" value="8" class="slider" id="doba"/>
            <div class="pullright" style="font-size:1rem;">
                max.
            </div>
            <div class="pullleft" style="font-size:1rem;">
                min.
            </div>
            </div>
        </div>

      </form>
    </div>
    </>
  );
}
