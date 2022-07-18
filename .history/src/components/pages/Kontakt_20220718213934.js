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
        <h1>Adresa:</h1>

        <p>Moldavská cesta 29</p>
        <p>040 11 Košice</p>
        <p>Slovensko</p>

        </div>
        <div className='contact-number'>
        <h1>Otváracie hodiny:</h1>

        <p><table>

  <tr>
    <td>PO</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>UT</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>ST</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>ŠT</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>PIA</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>SO</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>NE</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table></p>

        </div>
      </div>
 );
}

export default Kontakt
