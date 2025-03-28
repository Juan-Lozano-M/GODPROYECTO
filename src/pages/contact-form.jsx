"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import InputCom from "../components/input.jsx"


export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    institution: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

  }

  const educationalInstitutions = [
    "Selecciona tu institución",
    "Universidad",
    "Colegio",
    "Instituto Técnico",
    "Centro de Formación",
    "Otro",
  ]

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-screen overflow-x-hidden">

      <div className="w-full lg:w-1/3 bg-gray-800 text-white p-8 lg:p-12 flex flex-col justify-between order-2 lg:order-1">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Informacion de contacto</h1>
            <p className="text-gray-300">No dude en comunicarse con nosotros. Le responderemos lo antes posible.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                <img 
                src="./assets/carta.png" 
                alt="EMail Icon " 
                className="h-6 w-6"
                />
              </div>
              <span>GOD@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                <img 
                src="./assets/llamar.png" 
                alt="Telefono icon" 
                className="h-7 w-7"
                />
              </div>
              <span>3164297936</span>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-8">
          <a
            href="#"
            className="w-10 h-10 rounded-full  flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <img 
              src="./assets/facebook.png" 
              alt="Facebook png" 
              className="h-10 w-10"
              />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full  flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
              <img 
              src="./assets/instagram.png"  
              alt="Instagram icon"
              className="h-10 w-10" 
              />
          </a>
          <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <img
                src="/assets/whatsapp.png"
                alt="WhatsApp Icon"
                className="h-9.5 w-9.5"
              />
            </a>
        </div>
      </div>

      {/* Form Section - Second on desktop, first on mobile */}
      <div className="w-full lg:w-2/3 bg-green-300  p-8 lg:p-12 flex items-center justify-center relative order-1 lg:order-2">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
          <h2 className="text-xl  font-semibold mb-6 text-black">Ingresa tus datos</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-black mb-1">
                Nombre completo
              </label>
              <InputCom value={formData.fullName} onChange={handleChange} />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Numero de contacto
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-black"
                  placeholder="31652632837"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-black"
                  placeholder="Michael18@email.com"
                  required
                />
              </div>
            </div>

            <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
              Institucion educativa a la que pertenece
            </label>
            <select
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-500 text-black"
              required
            >
              {educationalInstitutions.map((institution, index) => (
                <option key={index} value={institution === "Selecciona tu institucion" ? "" : institution}>
                  {institution}
                </option>
              ))}
            </select>
          </div>
            <div>
            <label htmlFor="instiName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Institucion
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-500 text-black"
              id="instiName"
              name="instiName"
              value={formData.instiName}
              onChange={handleChange}
              placeholder="Universidad de Antioquia"
              required
            />
          </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto
              </label>
              <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-500 text-black"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Solicitud de informacion"
              required
            />
            </div>

            <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-500 text-black"
              placeholder="Escribe tu mensaje"
              required
            />
          </div>


            <button
              type="submit"
              className="w-full bg-lime-500 text-white py-3 px-4 rounded-md hover:bg-lime-600 transition-colors flex items-center justify-center"
            >
              <span>Enviar</span>
              <Send className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="hidden lg:block absolute bottom-0 right-0 w-64 h-64">
          <img
            src="./assets/emoji.png"
            alt="Contact illustration"
            className="w-full h-full object-contain"
          />
          
        </div>
      </div>
    </div>
  )
}

