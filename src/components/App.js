import '../App.css';
import React, { useState,useEffect } from "react";
import AppRouter from './Router';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const[isLoggedIn, setIsloggedIn] = useState(false);
  const[init, setInit] = useState(false);
  const[userObj, setUserObj] = useState(null);
  const auth = getAuth();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsloggedIn(true);        
        setUserObj(user.uid);
      } else {
        // User is signed out
        setIsloggedIn(false);
      }
      setInit(true);
    });
  },[])

  return (
    <>
    {init ?
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
      :"Intializing..."
    }
    </>
  )
  

}

export default App;
