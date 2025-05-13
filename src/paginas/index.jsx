import React from 'react'
import Hero from '../componentes/Hero'
import S2 from '../componentes/Seccion2'
import Foot from '../componentes/footer'
import Sf from '../componentes/SeccionF'
import Navbar from "../componentes/navbar";
import Cookies from "../componentes/CookiesBanner";

function Home() {
  return (
    <div className="min-h-screen bg-[#E1e1e1] overflow-x-hidden">
      <Navbar />
      <Hero />
      <S2 />
      <Sf></Sf>
      <Foot></Foot>
      <Cookies></Cookies>
      
    </div>
  )
}

export default Home
