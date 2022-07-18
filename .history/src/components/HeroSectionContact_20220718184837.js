import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSectionContact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-10.mp4' autoPlay loop muted />
      <div class="policki">
               <h4> Kontakt</h4>
               <a class="wau" href="tel:+421-940-838-058" data-tracking-element-type="3" jslog="56037; track:impression,click" itemprop="telephone" dir="ltr">Zavolať</a>
            <p style="margin-top:1.5em;margin-bottom:0;">
                0940 838 058


            </p>
            <p style="font-size:0.8rem;text-align:center;margin-top:0.2em;">
                (denne aj víkend od 9:00 do 18:00)</p>
                <a class="wau" href="mailto:pozickabezbanky@gmail.com">Napísať email</a>


                <p style="font-size:1.1rem;margin-top:2em;">pozickabezbanky@gmail.com</p>
            </div>


        <div class="policki">
            <h4>Adresa</h4>
            <a class="wau" href="https://www.google.com/maps/dir//P%C3%B4%C5%BEi%C4%8Dka+Ko%C5%A1ice/data=!4m8!4m7!1m0!1m5!1m1!1s0x473ee10e7fe9bda7:0xe9ccf61b3b3ca76e!2m2!1d21.243798299999998!2d48.7074675" target="_blank" data-tracking-element-type="6" jslog="56039; track:impression,click">Nájsť trasu</a>
            <p style=" padding-top:1em; font-size:1.2rem;">Moldavská cesta 29
            040 11 Košice
            Slovensko</p>
        </div>
        <div class="policki">
            <h4>Otváracie hodiny</h4>
        <table style="font-size:1.3rem;" itemprop="openingHours"><tbody><tr><th class="x2TOCf">PO:</th><td class="o0m3Qb"><span class="WF8WNe">9:00 – 17:00</span></td></tr><tr><th class="x2TOCf">UT:</th><td class="o0m3Qb"><span class="WF8WNe">9:00 – 17:00</span></td></tr><tr><th class="x2TOCf">ST:</th><td class="o0m3Qb"><span class="WF8WNe">9:00 – 17:00</span></td></tr><tr><th class="x2TOCf">ŠT:</th><td class="o0m3Qb"><span class="WF8WNe">9:00 – 17:00</span></td></tr><tr><th class="x2TOCf">PIA:</th><td class="o0m3Qb"><span class="WF8WNe">9:00 – 17:00</span></td></tr><tr><th class="x2TOCf">SO:</th><td class="o0m3Qb"><span class="WF8WNe">Zatvorené</span></td></tr><tr><th class="x2TOCf">NE:</th><td class="o0m3Qb"><span class="WF8WNe">Zatvorené</span></td></tr></tbody></table>
     </div>
    </div>
    </div>

    </>
  );
}

export default HeroSection;
