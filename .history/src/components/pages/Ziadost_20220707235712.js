import React from 'react';
import '../../App.css';
import './Ziadost.css'
import { useState } from 'react';

function PMT(ir, np, pv, fv, type) {

  //  * ir   - interest rate per month
  //  * np   - number of periods (months)
   // * pv   - present value
   // * fv   - future value
  //  * type - when the payments are due:
 //   *        0: end of the period, e.g. end of month (default)
  //  *        1: beginning of period

   var pmt, pvif;

   fv || (fv = 0);
   type || (type = 0);

   if (ir === 0)
       return -(pv + fv)/np;

   pvif = Math.pow(1 + ir, np);
   pmt = - ir * pv * (pvif + fv) / (pvif - 1);

   if (type === 1)
       pmt /= (1 + ir);


   return pmt;}

export default function Ziadost() {
  const [values, setValues] = useState({
    amount: 5000,
    period: 1
  });
  const [mounthAmount, setMounthAmount] = useState();
  const handleChange = e => {
    console.log(e)
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    let urk_sdz = 0.1834;
    if ( values.period==1) urk_sdz = 0.3910;
    if ( values.period>1 && values.period<6 ) urk_sdz = 0.2098; //0.22;
    if ( values.period>5 && values.period<9 ) urk_sdz = 0.1834;
    let finalAmount = Math.round(PMT(Math.pow((1+urk_sdz),1/12)-1,(values.period*12),-1*values.amount)*100) /100;
    setMounthAmount(finalAmount)
  };
  return (
    <>
      <h1 className='header-form'>
          Vyplňte formulár pre nezáväznu žiadosť o pôžičku.
        </h1>
      <form>
      <div className='container-form'>
        <div className='section-name'>Požadovaná suma</div>
            <h2>{values.amount}</h2>
            <div className="containerslider">
                <div className="pullleft" style={{fontSize:"1.2rem"}}>
                    500€
                </div>
                <div className="pullright" style={{fontSize:"1.2rem"}}>
                    15 000€
                </div>
            <input type="range" name="amount" step="100" min="500" max="15000" onChange={handleChange} value={values.amount} className="slider" id="suma"/>
            <div className="pullleft" style={{fontSize: "1rem"}}>
                min.
            </div>
            <div className="pullright" style={{fontSize: "1rem"}}>
                max.
            </div>
            </div>

       <div className='section-name'>Doba splácania</div>
       <h2>{values.period}</h2>
            <div className="containerslider">
                <div className="pullleft" style={{fontSize:"1.2rem"}}>
                    1 rok
                </div>
                <div className="pullright" style={{fontSize:"1.2rem"}}>
                    8 rokov
                </div>
            <input type="range" name="period" step="1" min="1" max="8" onChange={handleChange} value={values.period} className="slider" id="doba"/>
            <div className="pullleft" style={{fontSize: "1rem"}}>
                min.
            </div>
            <div className="pullright" style={{fontSize: "1rem"}}>
                max.
            </div>
            </div>
            <div className="vasurok">
        Priemerná hodnota RPNM od 9,12%
        </div>
        <h1> Mesačná splátka: {mounthAmount}€</h1>
            </div>

      </form>

    </>
  );
}
