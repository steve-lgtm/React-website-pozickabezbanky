import React from 'react';
import '../../App.css';
import './Ziadost.css'
import { useState } from 'react';
import { useFormik} from 'formik',
import ReactDOM from 'react-dom'
import Files from 'react-files'

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
  const DivUploadButton = asUploadButton((props) => {
    useItemStartListener((item) => {
      console.log(`item ${item.id} started uploading`);
  });

    return <div {...props} style={{ cursor: "pointer" }}>
        DIV Upload Button
    </div>
});
  const [mounthAmount, setMounthAmount] = useState(95.48);
  const formik =  useFormik({
    initialValues: {
      amount: 5000,
      period: 8,
      name: '',
      surnameMom:''
    },
    onSubmit: values => {
      console.log('Form data',values)
    },
    validate: values => {
      let errors ={}

      if(!values.name) {
        errors.name = 'Requiered'
      }

      if(!values.surnameMom) {
        errors.name = 'Requiered'
      }

      return errors
    }
  });

 const changeAmount = (e) => {
  let urk_sdz = 0.1834;
  if(e.target.name==='amount'){
    let urk_sdz = 0.1834;
    if ( formik.values.period===1) urk_sdz = 0.3910;
    if ( formik.values.period>1 && formik.values.period<6 ) urk_sdz = 0.2098; //0.22;
    if ( formik.values.period>5 && formik.values.period<9 ) urk_sdz = 0.1834;
    let finalAmount = Math.round(PMT(Math.pow((1+urk_sdz),1/12)-1,(formik.values.period*12),-1*e.target.value)*100) /100;
  setMounthAmount(finalAmount)}

  if(e.target.name==='period'){
    if ( e.target.value===1) urk_sdz = 0.3910;
    if ( e.target.value>1 && e.target.value<6 ) urk_sdz = 0.2098; //0.22;
    if ( e.target.value>5 && e.target.value<9 ) urk_sdz = 0.1834;
    let finalAmount = Math.round(PMT(Math.pow((1+urk_sdz),1/12)-1,(e.target.value*12),-1*formik.values.amount)*100) /100;
    setMounthAmount(finalAmount)}
  };
  return (
    <>
      <h1 className='header-form'>
          Vyplňte formulár pre nezáväznu žiadosť o pôžičku.
        </h1>
      <form onSubmit={formik.handleSubmit}>
      <div className='container-form'>
        <div className='section-name'>Požadovaná suma</div>
            <h2>{formik.values.amount}</h2>
            <div className="containerslider">
                <div className="pullleft" style={{fontSize:"1.2rem"}}>
                    500€
                </div>
                <div className="pullright" style={{fontSize:"1.2rem"}}>
                    15 000€
                </div>
            <input type="range" name="amount" step="100" min="500" max="15000" onChange={(e) =>{formik.handleChange(e); changeAmount(e)}} value={formik.values.amount} className="slider" id="suma"/>
            <div className="pullleft" style={{fontSize: "1rem"}}>
                min.
            </div>
            <div className="pullright" style={{fontSize: "1rem"}}>
                max.
            </div>
            </div>

       <div className='section-name'>Doba splácania</div>
       <h2>{formik.values.period}</h2>
            <div className="containerslider">
                <div className="pullleft" style={{fontSize:"1.2rem"}}>
                    1 rok
                </div>
                <div className="pullright" style={{fontSize:"1.2rem"}}>
                    8 rokov
                </div>
            <input type="range" name="period" step="1" min="1" max="8" onChange={(e) => {formik.handleChange(e); changeAmount(e)}} value={formik.values.period} className="slider" id="doba"/>
            <div className="pullleft" style={{fontSize: "1rem"}}>
                min.
            </div>
            <div className="pullright" style={{fontSize: "1rem"}}>
                max.
            </div>
            </div>
            <div className="info">
        Priemerná hodnota RPNM od 9,12%
        </div>
        <h2> Mesačná splátka: {mounthAmount}€</h2>
        <div className="info2">
            Výška splátky je len orientačná bude vypočítaná na základe Vašich individuálnych podmienok
        </div>
            </div>
          <div className='personal-data'>
          <div className='section-name'>Základné informácie</div>
            <div className='personal-data-field'>
          <label htmlFor="name">Meno a priezvisko:</label>
      <input type="text" name="name" id="name" onChange={formik.handleChange} value={formik.values.name}/>
      </div>
      <div className='personal-data-field'>
      <label htmlFor="surnameMom">Rodné priezvisko matky:</label>
      <input type="text" name="surnameMom" id="surnameMom" onChange={formik.handleChange} value={formik.values.surnameMom}/>
            </div>
            <div className='personal-data-field'>
      <label htmlFor="surnameMom">Rodné priezvisko matky:</label>
      <input type="text" name="surnameMom" id="surnameMom" onChange={formik.handleChange} value={formik.values.surnameMom}/>
            </div>
            <div className='personal-data-field'>
      <label htmlFor="surnameMom">Rodné priezvisko matky:</label>
      <input type="text" name="surnameMom" id="surnameMom" onChange={formik.handleChange} value={formik.values.surnameMom}/>
            </div>
            <Uploady>
    <DivUploadButton/>
</Uploady>
            </div>
            <button type='submit'>Submit</button>
      </form>

    </>
  );
}
