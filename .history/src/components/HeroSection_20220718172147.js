import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>Neschválili Vám pôžičku v banke?</h1>
      <p>Nezúfajte vyskúšajte to <u nás!</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          to={'kontakt'}
        >
          KONTAKT
        </Button>
        <Button
          className='btns'
          to={'/ziadost'}
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          ŽIADOSŤ O PÔŽIČKU
          <FontAwesomeIcon icon="fa-solid fa-pen-clip" className='write-icon'/>

        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
