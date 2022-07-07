import React from 'react';
import '../../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee as fasFaCoffee } from '@fortawesome/pro-solid-svg-icons'
import { faCoffee as farFaCoffee } from '@fortawesome/pro-regular-svg-icons'

function Home() {
  return (
    library.add(fasFaCoffee, farFaCoffee)
  );
}

export default Home;