import React from 'react';
import '../../App.css';
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

function Home() {
  return (
    library.add(fas, faTwitter, faFontAwesome) );
}

export default Home;