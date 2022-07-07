import React from 'react';
import '../../App.css';
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

function Home() {
  return (
    library.add(fas) );
}

export default Home;