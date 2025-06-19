import React from 'react';

const ReauthModal = ({ isOpen, onClose, onReauthenticate, currentPassword, setCurrentPassword }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Reautenticación</h2>
        <p className="mb-4">Por favor ingresa tu contraseña actual para continuar.</p>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Contraseña actual"
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancelar</button>
          <button onClick={onReauthenticate} className="bg-[#87C232] text-white px-4 py-2 rounded-md">Reautenticar</button>
        </div>
      </div>
    </div>
  );
};

export default ReauthModal;