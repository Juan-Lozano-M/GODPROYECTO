import React, { useState, useEffect } from "react";
import Pescado from '../assets/Pescado.png';
import { Phone, Mail, User, School, ArrowLeft, Send, Check } from "lucide-react";

function Contacto() {
  const [step, setStep] = useState(1); // 1: selección rol, 2: formulario, 3: éxito
  const [rol, setRol] = useState(null);
  const [formData, setFormData] = useState({});

  const baseButtonClasses = `
    relative
    font-bold
    border
    rounded-md text-lg
    transition-all duration-150 ease-in-out
    w-full h-16
    text-black border-black
    2xl:text-3xl xl:text-xl lg:text-base
  `;

  const hoverAndClickEffects = `
    hover:scale-95
    hover:translate-y-1
    active:translate-y-2
  `;

  // Configuración de campos por rol
  const formFields = {
    Estudiante: [
      { name: 'nombre', label: 'Nombre completo', type: 'text', icon: User, required: true },
      { name: 'institucion', label: 'Institución educativa', type: 'text', icon: School, required: true },
      { name: 'grado', label: 'Grado/Nivel académico', type: 'text', icon: School, required: true },
      { name: 'telefono', label: 'Teléfono', type: 'tel', icon: Phone, required: true },
      { name: 'email', label: 'Correo electrónico', type: 'email', icon: Mail, required: true }
    ],
    Maestro: [
      { name: 'nombre', label: 'Nombre completo', type: 'text', icon: User, required: true },
      { name: 'institucion', label: 'Institución donde enseña', type: 'text', icon: School, required: true },
      { name: 'materia', label: 'Materia que enseña', type: 'text', icon: School, required: true },
      { name: 'telefono', label: 'Teléfono', type: 'tel', icon: Phone, required: true },
      { name: 'email', label: 'Correo electrónico', type: 'email', icon: Mail, required: true }
    ],
    Padre: [
      { name: 'nombrePadre', label: 'Nombre del padre/madre', type: 'text', icon: User, required: true },
      { name: 'nombreEstudiante', label: 'Nombre del estudiante', type: 'text', icon: User, required: true },
      { name: 'institucion', label: 'Dónde estudia el hijo/a', type: 'text', icon: School, required: true },
      { name: 'telefono', label: 'Teléfono de contacto', type: 'tel', icon: Phone, required: true },
      { name: 'email', label: 'Correo electrónico', type: 'email', icon: Mail, required: true }
    ]
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const fields = formFields[rol];
    const isValid = fields.every(field => 
      field.required ? formData[field.name]?.trim() : true
    );

    if (isValid) {
      setStep(3);
    } else {
      alert('Por favor completa todos los campos requeridos');
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setRol(null);
      setFormData({});
    } else if (step === 3) {
      setStep(1);
      setRol(null);
      setFormData({});
    }
  };

  const selectRole = (selectedRole) => {
    setRol(selectedRole);
    setStep(2);
    setFormData({});
  };

  // Barra de progreso
  const ProgressBar = () => {
    const steps = [
      { active: step >= 1, completed: step > 1 },
      { active: step >= 2, completed: step > 2 },
      { active: step >= 3, completed: false }
    ];

    return (
      <div className="flex space-x-4 items-center justify-center mb-6 w-full max-w-md mx-auto">
        {steps.map((stepItem, index) => (
          <div
            key={index}
            className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
              stepItem.completed
                ? 'bg-[#A4FF00]'
                : stepItem.active
                ? 'bg-[#A4FF00]'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex bg-white flex-col items-center justify-center p-6 min-h-[45rem] font-nunito relative mb-16">
      
      {/* Paso 1: Selección de rol */}
      <div className={`transition-all duration-500 ease-in-out w-full flex flex-col items-center ${step === 1 ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-full opacity-0 absolute'}`}>
        {step === 1 && (
          <>
            {/* Título */}
            <div className="text-center bg-white w-full max-w-2xl mx-auto p-6 mb-6">
              <div className="flex justify-center mb-4">
                <img
                  src={Pescado}
                  alt="Personaje Principal"
                  className="w-[50px] h-auto"
                />
              </div>
              <h3 className="text-xl font-bold uppercase text-center">
                Llena el formulario interactivo con tu información
              </h3>
            </div>

            <ProgressBar />

            {/* Instrucción */}
            <p className="text-xs mb-4 text-gray-600 tracking-widest text-center">
              POR FAVOR SELECCIONA UNA DE LAS OPCIONES
            </p>

            {/* Botones */}
            <div className="w-full max-w-2xl flex flex-col space-y-4 items-center mb-6">
              {["Estudiante", "Maestro", "Padre"].map((option) => (
                <button
                  key={option}
                  onClick={() => selectRole(option)}
                  className={`${baseButtonClasses} ${hoverAndClickEffects} bg-white hover:bg-gray-50`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Paso 2: Formulario */}
      <div className={`transition-all duration-500 ease-in-out w-full flex flex-col items-center ${step === 2 ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0 absolute'}`}>
        {step === 2 && (
          <>
            <div className="text-center bg-white w-full max-w-2xl mx-auto p-6 mb-6">
              <div className="flex justify-center mb-4">
                <img
                  src={Pescado}
                  alt="Personaje Principal"
                  className="w-[50px] h-auto"
                />
              </div>
              <h3 className="text-xl font-bold uppercase text-center">
                Información de {rol}
              </h3>
            </div>

            <ProgressBar />

            <p className="text-xs mb-6 text-gray-600 tracking-widest text-center">
              COMPLETA TU INFORMACIÓN
            </p>

            <div className="w-full max-w-2xl space-y-4">
              {formFields[rol].map((field) => {
                const IconComponent = field.icon;
                return (
                  <div key={field.name} className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <IconComponent size={20} />
                    </div>
                    <input
                      type={field.type}
                      placeholder={field.label}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full h-16 pl-12 pr-4 border border-black rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#A4FF00] focus:border-transparent"
                    />
                  </div>
                );
              })}

              <div className="flex space-x-4 mt-8">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex-1 h-16 bg-gray-100 border border-gray-300 rounded-md text-lg font-bold flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Atrás</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 h-16 bg-[#A4FF00] border border-[#A4FF00] rounded-md text-lg font-bold flex items-center justify-center space-x-2 hover:bg-[#93E600] transition-colors"
                >
                  <Send size={20} />
                  <span>Enviar</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Paso 3: Éxito */}
      <div className={`transition-all duration-500 ease-in-out w-full flex flex-col items-center ${step === 3 ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0 absolute'}`}>
        {step === 3 && (
          <>
            <div className="text-center bg-white w-full max-w-2xl mx-auto p-6 mb-6">
              <div className="flex justify-center mb-4">
                <img
                  src={Pescado}
                  alt="Personaje Principal"
                  className="w-[50px] h-auto"
                />
              </div>
              <h3 className="text-2xl font-bold uppercase text-[#A4FF00] text-center">
                ¡Información Enviada con Éxito!
              </h3>
              <p className="text-gray-600 mt-2 text-center">
                Gracias por completar el formulario. Nos pondremos en contacto contigo pronto.
              </p>
            </div>

            <ProgressBar />

            <div className="border border-black rounded-lg p-6 w-full max-w-2xl mb-6">
              <h4 className="font-bold text-black mb-3 text-center">Resumen de tu información:</h4>
              <div className="space-y-2 text-sm text-black">
                <p className="text-center"><strong>Rol:</strong> {rol}</p>
                {Object.entries(formData).map(([key, value]) => {
                  const field = formFields[rol].find(f => f.name === key);
                  return (
                    <p key={key} className="text-center">
                      <strong>{field?.label}:</strong> {value}
                    </p>
                  );
                })}
              </div>
            </div>

            <button
              onClick={goBack}
              className="w-full text-white max-w-2xl h-16 bg-[#A4FF00]  rounded-md text-lg font-bold "
            >
              Volver a la Pestaña Principal
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Contacto;