import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';


function Home() {
  return (
    <><View style={{display:'flex',width:130}}>
    <Text style={{color:'white',fontSize:15,marginRight:20,marginBottom:10}}>{t("Fiber")}</Text>
    </View>
    </>
  );
}

export default Home;