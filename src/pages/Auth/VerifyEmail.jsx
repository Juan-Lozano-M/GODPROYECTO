import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from '../../firebaseConfig';
import { checkActionCode, applyActionCode } from 'firebase/auth';
import axios from 'axios';
import { Check, X, Mail, ArrowRight, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verificando email...");
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!oobCode) {
        setMessage("Enlace de verificación inválido.");
        setLoading(false);
        return;
      }

      try {
        const info = await checkActionCode(auth, oobCode);
        const newEmail = info.data.email;
        await applyActionCode(auth, oobCode);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        let currentUser = auth.currentUser;
        if (!currentUser) {
          await auth.authStateReady();
          currentUser = auth.currentUser;
        }
        
        if (!currentUser) {
          setMessage("Email verificado exitosamente");
          setIsSuccess(true);
          setLoading(false);
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        try {
          const response = await axios.post('http://localhost:5000/auth/update-email', {
            firebase_uid: currentUser.uid,
            new_email: newEmail
          });

          if (response.data.status === 'success') {
            setMessage("Email verificado exitosamente");
            setIsSuccess(true);
          } else {
            setMessage("Verificación completada con advertencias");
          }
        } catch (dbError) {
          console.error('Error updating database:', dbError);
          setMessage("Email verificado exitosamente");
          setIsSuccess(true);
        }

      } catch (error) {
        console.error('Error verifying email:', error);
        if (error.code === 'auth/expired-action-code') {
          setMessage("El enlace ha expirado");
        } else if (error.code === 'auth/invalid-action-code') {
          setMessage("Enlace inválido");
        } else if (error.code === 'auth/user-disabled') {
          setMessage("Cuenta deshabilitada");
        } else {
          setMessage("Error en la verificación");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [oobCode, navigate]);

  return (
    <div className="min-h-screen bg-[#9CE840] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          
          {/* Icon */}
          <div className="flex justify-center mb-8">
            {loading ? (
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
              </div>
            ) : isSuccess || message.includes('exitosamente') ? (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-red-500" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-xl font-semibold text-gray-900">
              {loading ? "Verificando..." : message}
            </h1>
            
            {!loading && (isSuccess || message.includes('exitosamente')) && (
              <p className="text-sm text-gray-500">
                Tu cuenta ha sido verificada correctamente
              </p>
            )}
            
            {loading && (
              <p className="text-sm text-gray-500">
                Por favor espera un momento
              </p>
            )}
          </div>

          {/* Actions */}
          {!loading && (
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-black text-white py-3.5 px-4 rounded-2xl text-sm font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Continuar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate('/login')}
                className="w-full bg-transparent text-gray-700 py-3.5 px-4 rounded-2xl text-sm font-medium hover:bg-gray-50 transition-all duration-200 border border-gray-200"
              >
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && (
          <div className="text-center mt-6">
            <button className="text-sm text-black/70 hover:text-black transition-colors font-medium">
              ¿Necesitas ayuda?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;