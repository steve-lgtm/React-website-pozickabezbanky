import React, {useState, useRef} from 'react'
import './Dakujeme.css';
import { Button } from '../Button';



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
<Button buttonSize={'btn--large'} onClick={          navigate('/dakujeme', {replace: true})
} buttonStyle='btn--outline'>DOMOV</Button>
      </div>
        </div>

      </>
  )
}

export default Dakujeme
