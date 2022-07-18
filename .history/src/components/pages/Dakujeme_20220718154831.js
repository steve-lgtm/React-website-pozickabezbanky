import React, {useState, useRef} from 'react'
import './Dakujeme.css';
import { Button } from '../Button';
import {useNavigate} from 'react-router-dom';




const Dakujeme = () => {
  const navigate = useNavigate();



  return (
    <>
        <div className="container">
        <div class="card">
          <div class="card-plan">Žiadosť bola úspešne odoslaná !</div>
          <div class="card-title2">
              Ďakujeme za podanie žiadosti. </div>
              <div class="card-title">
Žiadosť je aktuálne v schvaľovacom procese
                a čoskoro Vás budeme kontaktovať mailom alebo telefonicky.
</div>
<Link to='/' className='navbar-logo' onClick={closeMobileMenu}></Link>
<Button buttonSize={'btn--large'} buttonStyle='btn--outline'>DOMOV</Button>
</Link>
      </div>
        </div>

      </>
  )
}

export default Dakujeme
