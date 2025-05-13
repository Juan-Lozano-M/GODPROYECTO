import React from 'react'
import Hero from '../componentes/Hero'
import S2 from '../componentes/Seccion2'
import Foot from '../componentes/footer'
import Sf from '../componentes/SeccionF'
import Navbar from "../componentes/navbar";

function Home() {
  return (
    <div className="min-h-screen bg-[#E8FFBE] overflow-x-hidden">
      <Navbar />
      <Hero />
      <S2 />
      <Sf></Sf>
      <Foot></Foot>
      
    </div>
  )
}

export default Home
