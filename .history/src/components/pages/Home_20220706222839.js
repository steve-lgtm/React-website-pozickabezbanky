import React from 'react';
import '../../App.css';
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


library.add(fas, faTwitter, faFontAwesome)

function Home() {
  return (
    <FontAwesomeIcon icon="fa-solid fa-check-square" />
  );
  }

export default Home;