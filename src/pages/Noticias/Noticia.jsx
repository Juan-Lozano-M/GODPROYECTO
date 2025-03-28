import React from "react";

import Info from "../../components/noticia/info.jsx"
import Lottie from "lottie-react";
import animationData from "../../assets/Animation.json";


export default function noticia (){
    return (
      <div className="flex min-h-screen flex-col ">
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#9CE840] to-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center rounded-md bg-[#87C232] hover:bg-[#] px-2.5 py-0.5 text-xs font-semibold text-white">
                    Destacado
                  </span>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Descubre Tu Propósito Profesional
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Cómo encontrar una carrera que combine tu pasión, habilidades y propósito para crear una vida
                    laboral significativa y satisfactoria.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 h-10 px-4 py-2 text-white">
                    Leer Guía
                
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background h-10 px-4 py-2">
                    Test Vocacional
                  </button>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square">
              <Lottie animationData={animationData} loop={false} autoplay className=" min-[600px]:scale-50 max-[639px]:scale-50 sm:scale-50 md:scale-50 lg:scale-100 min-[600px]:translate-y-[-100px] max-[639px]:translate-y-[-100px] sm:translate-y-[-100px] md:translate-y-[-100px] lg:translate-0" />
              </div>
            </div>
          </div>
        </section>

      

        <section className="w-full py-12 md:py-24 lg:py-32   ">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                  Inspiración Vocacional
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Carreras Emergentes</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre carreras con futuro, oportunidades de crecimiento y el camino ideal para ti.
                </p>
              </div>
            </div>
            <Info/>
            <div className="flex justify-center">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background h-10 px-4 py-2 gap-1">
                Ver Todas las Noticias
               
              </button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Orientación Personalizada</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Suscríbete para recibir guías vocacionales adaptadas a tus intereses, habilidades y valores
                  personales.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm max-w-lg flex-1"
                    placeholder="Ingresa tu email"
                    type="email"
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 h-10 px-4 py-2 text-white"
                  >
                    Comenzar
                  </button>
                </form>
                <p className="text-xs text-muted-foreground">
                  Recibirás recursos gratuitos y consejos para tu desarrollo profesional. Puedes cancelar en cualquier
                  momento.
                </p>
              </div>
            </div>
          </div>
        </section>
       

      </main>
  
    </div>
  )
}