import React, {Text,View} from 'react';
import '../../App.css';


function Home() {
  return (
    <View style={{height: 100,
        width: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"}}>
    <Text style={{color:'black'}}>fiber</Text>
    </View>
  );
}

export default Home;