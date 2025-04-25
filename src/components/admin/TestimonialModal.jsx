import React from "react";
import { Dialog } from "@headlessui/react";
import iconCerrarTestimonial from "../../assets/icons/iconCerrarTestimonial.png";

function TestimonialModal({ isOpen, onClose, testimonio }) {
  if (!isOpen || !testimonio) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">

        <div className="rounded-2xl bg-white px-10 pt-10 shadow-lg">
          <div className="text-end">
            <button onClick={onClose}>
              <img src={iconCerrarTestimonial} clasName="" alt="Imagen de cerrar modal testimonio" />
            </button>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src={testimonio.imageUrl}
              alt={testimonio.name}
              className="w-30 h-30 rounded-full mb-4"
            />
            <h3 className="text-4xl font-adlam">{testimonio.name}</h3>
            <p className="text-lg font-adlam text-[#3E3E3E]">{testimonio.position}</p>
            
            <div className="h-auto max-w-120 ">
              <div className="flex gap-16 mt-10">
                <h1 className="text-2xl text-[#505050] font-adlam"> Titulo </h1>
                <p className="text-lg text-black font-adlam mt-auto"> Buena experiencia tecnica.</p>
              </div>

              <div className="flex gap-9 mt-3 text-start">
                <h1 className="text-2xl text-[#505050] font-adlam"> Mensaje </h1>
                <p className="text-lg text-black font-adlam mt-auto">{testimonio.comment}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-7 w-full h-12">
              <div className="flex items-center justify-center bg-black h-full w-[50%] rounded-full">
                <p className="text-white font-adlam text-xl"> Aprobar </p>
              </div>
              <div className="flex items-center justify-center bg-white border-2 h-full w-[50%] rounded-full">
                <p className="text-black font-adlam text-xl"> Rechazar </p>
              </div>
            </div>

            <div className="mt-5 pb-5">
              <p className="font-adlam text-[#7C7C7C] text-lg"> Enviado 7 de Abril de 2025 </p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default TestimonialModal;
