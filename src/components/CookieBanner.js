import React, { useEffect } from 'react'
import "./CookieBanner.css"
import Button from '@mui/material/Button';


export default function CookieBanner() {
    useEffect(()=>{
        if (document.cookie.indexOf("AcceptCookie") != -1){
        let modal = document.getElementsByClassName('cookiebanner-container')
        modal[0].style.display = 'none'}

    })
    const onAccept = () =>{
        let expiresDate = new Date();
expiresDate.setMonth(expiresDate.getMonth() + 1);
        document.cookie = "AcceptCookie=true; expires=" + expiresDate.toUTCString() + ";";
        let modal = document.getElementsByClassName('cookiebanner-container')
        modal[0].style.display = 'none'
    }
  return (
    <>
    <div className='cookiebanner-container'>
        <div className='cookiebanner-container-title'>
    Na našich stránkach používame analytické a personalizačné súbory cookie s cieľom zlepšiť vašu užívateľskú skúsenosť.
    </div>
    <Button onClick={onAccept} variant="outlined" className='cookiebanner-container-button Buttoncookie'>
        Akceptujem
    </Button>
    </div>
    </>
  )
}
