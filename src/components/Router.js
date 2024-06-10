import React, { useState } from "react";
import { Routes,Route } from "react-router-dom";
import Auth from './Auth'
import Home from '../routes/Home'
import Nav from "./Nav";

const AppRouter = ({isLoggedIn}) => {
  
  return(
    <Routes>
      {isLoggedIn ? 
        <>  
          <Route path='/' element={<Nav/>}></Route> 
          <Route path='/' element={<Home/>}></Route> 
        </>
        :<Route path='/' element={<Auth/>}></Route>
      }
    </Routes>
  )
}
export default AppRouter;