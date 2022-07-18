import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import '../../App.css';
import { useFormik} from 'formik';
import './Kontakt.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../Button';




const Kontakt = () => {
    return (
        <div className='hero-container-contact'>
        <video src='/videos/video-10.mp4' autoPlay loop muted />
        <div className='contact-number'>
        <h1>Telefonné číslo:</h1>
        <p>0940 838 058</p>
        <h1>E-mail:</h1>
        <p>pozickabezbanky@gmail.com</p>

        </div>
        <div className='contact-number'>
        <h1>Telefonné číslo:</h1>

        <p>0940 838 058</p>

        </div>
        <div className='contact-number'>
        <h1>Telefonné číslo:</h1>

        <p>0940 838 058</p>

        </div>
      </div>
 );
}

export default Kontakt
