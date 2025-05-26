import React from 'react'
import Hero from '../componentes/Hero'
import S2 from '../componentes/Seccion2'
import Foot from '../componentes/footer'
import Sf from '../componentes/SeccionF'
import Navbar from "../componentes/navbar";
import Cookies from "../componentes/CookiesBanner";
import Test from "../componentes/Testimonios";



function Home() {
  return (
    <div className="min-h-screen bg-white  overflow-x-hidden">
      
      <Hero />
      <S2 />
      <Test></Test>
     
      <Sf></Sf>
      <Foot></Foot>
      <Cookies></Cookies>
      
    </div>
  )
}

export default Home
