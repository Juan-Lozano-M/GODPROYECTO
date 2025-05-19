import React from 'react'
import Foot from '../componentes/footer'
import Navbar from "../componentes/navbar";
import Cookies from "../componentes/CookiesBanner";
import Con from "../componentes/SeccionContactoa";
import Con2 from "../componentes/SeccionContactob";




function Contacto() {
  return (
    <div className="min-h-screen bg-[#E8FFBE]  overflow-x-hidden">

    
      <Navbar />
      <Con />
      <Con2 />
     
     
      
      <Foot></Foot>
      <Cookies></Cookies>
      
    </div>
  )
}

export default Contacto
