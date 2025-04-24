import React from "react";
import { Dialog } from "@headlessui/react";
import iconCerrarTestimonial from "../../assets/icons/iconCerrarTestimonial.png";

function TestimonialModal({ isOpen, onClose, testimonio }) {
  if (!isOpen || !testimonio) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">

        <div className="mx-auto max-w-md rounded-2xl bg-white p-10 shadow-lg">
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
            <p className="text-lg font-adlam text-gray-500">{testimonio.position}</p>
            <p className="mt-4 text-gray-700 italic">“{testimonio.comment}”</p>
            <span
              className={`mt-4 inline-block px-4 py-1 rounded-full text-white ${
                testimonio.statusColor === "Green"
                  ? "bg-green-500"
                  : testimonio.statusColor === "Yellow"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {testimonio.status}
            </span>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default TestimonialModal;
