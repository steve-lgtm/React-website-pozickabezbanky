import React from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Home() {
  return (
    <div>
    <FontAwesomeIcon icon="fa-solid fa-check-square" />
    Your <FontAwesomeIcon icon="fa-regular fa-coffee" /> is hot!
  </div>  );
}

export default Home;