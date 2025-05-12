import React from 'react'
import Hero from '../componentes/Hero'
import S2 from '../componentes/Seccion2'
import Foot from '../componentes/footer'
import Sf from '../componentes/SeccionF'

function Home() {
  return (
    <div className="min-h-screen bg-[#e1e1e1] overflow-x-hidden">
      <Hero />
      <S2 />
      <Sf></Sf>
      <Foot></Foot>
      
    </div>
  )
}

export default Home
