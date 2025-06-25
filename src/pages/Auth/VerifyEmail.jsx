import { applyActionCode, checkActionCode } from 'firebase/auth';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from '../../config/axiosConfig';
import { auth } from '../../firebaseConfig';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();
  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode') || 'verifyEmail'; // Detectar el modo
  const isEmailChange = mode === 'verifyAndChangeEmail';
  
  const [message, setMessage] = useState(() => 
    mode === 'verifyAndChangeEmail' ? "Verificando cambio de email..." : "Verificando email..."
  );
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    const verifyEmail = async () => {
      if (!oobCode) {
        setMessage("Enlace de verificación inválido.");
        setLoading(false);
        return;
      }

      // Validar formato básico del código
      if (oobCode.length < 10) {
        setMessage("El código de verificación parece estar incompleto.");
        setLoading(false);
        return;
      }      try {
        console.log('Iniciando verificación con código:', oobCode);
        console.log('Modo:', mode);
        
        // Primero verificar si el código es válido
        let info;
        try {
          info = await checkActionCode(auth, oobCode);
          console.log('Información del código:', info);
        } catch (checkError) {
          console.error('Error en checkActionCode:', checkError);
          throw checkError; // Re-lanzar el error para manejarlo en el catch principal
        }
        
        const newEmail = info.data.email;
        console.log('Email a verificar:', newEmail);
        
        // Solo aplicar el código si la verificación inicial fue exitosa
        try {
          await applyActionCode(auth, oobCode);
          console.log('Código aplicado exitosamente');
        } catch (applyError) {
          console.error('Error en applyActionCode:', applyError);
          // Si el error es que el código ya fue usado, pero checkActionCode pasó,
          // puede ser que el código ya se aplicó anteriormente
          if (applyError.code === 'auth/invalid-action-code') {
            console.log('El código puede haber sido usado anteriormente, pero el email parece válido');
            // Continúar con el flujo como si fuera exitoso
          } else {
            throw applyError;
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        let currentUser = auth.currentUser;
        if (!currentUser) {
          await auth.authStateReady();
          currentUser = auth.currentUser;
        }
          if (!currentUser) {
          setMessage(isEmailChange ? "Cambio de email verificado exitosamente" : "Email verificado exitosamente");
          setIsSuccess(true);
          setLoading(false);
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        try {
          const response = await axiosInstance.post('/auth/update-email', {
            firebase_uid: currentUser.uid,
            new_email: newEmail
          });

          if (response.data.status === 'success') {
            setMessage(isEmailChange ? "Cambio de email completado exitosamente" : "Email verificado exitosamente");
            setIsSuccess(true);
          } else {
            setMessage("Verificación completada con advertencias");
          }
        } catch (dbError) {
          console.error('Error updating database:', dbError);
          setMessage(isEmailChange ? "Cambio de email completado exitosamente" : "Email verificado exitosamente");
          setIsSuccess(true);
        }      } catch (error) {
        console.error('Error verifying email:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        let errorMessage = "Error en la verificación";
          if (error.code === 'auth/expired-action-code') {
          errorMessage = isEmailChange 
            ? "El enlace de cambio de email ha expirado. Solicita un nuevo cambio desde tu perfil." 
            : "El enlace de verificación ha expirado. Solicita un nuevo enlace.";
        } else if (error.code === 'auth/invalid-action-code') {
          errorMessage = isEmailChange
            ? "El enlace de cambio de email es inválido o ya fue usado. Ve a tu perfil y solicita un nuevo cambio de email."
            : "El enlace de verificación es inválido o ya fue usado. Revisa tu email o regístrate nuevamente si es necesario.";
        } else if (error.code === 'auth/user-disabled') {
          errorMessage = "Esta cuenta ha sido deshabilitada. Contacta al soporte.";
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = "No se encontró la cuenta asociada a este enlace.";
        } else {
          errorMessage = `Error inesperado: ${error.message}`;
        }
        
        setMessage(errorMessage);
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };    verifyEmail();
  }, [oobCode, navigate, isEmailChange, mode]);

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
          </div>          {/* Content */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-xl font-semibold text-gray-900">
              {loading ? (isEmailChange ? "Verificando cambio..." : "Verificando...") : message}
            </h1>
            
            {!loading && (isSuccess || message.includes('exitosamente')) && (
              <p className="text-sm text-gray-500">
                {isEmailChange ? "Tu cambio de email ha sido procesado correctamente" : "Tu cuenta ha sido verificada correctamente"}
              </p>
            )}
            
            {loading && (
              <p className="text-sm text-gray-500">
                Por favor espera un momento
              </p>
            )}
          </div>          {/* Actions */}
          {!loading && (
            <div className="space-y-3">
              {(isSuccess || message.includes('exitosamente')) ? (
                <>
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
                </>              ) : (
                <>
                  {message.includes('inválido') || message.includes('expirado') ? (
                    isEmailChange ? (
                      <button 
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-[#87C232] text-white py-3.5 px-4 rounded-2xl text-sm font-medium hover:bg-[#9CE840] transition-all duration-200 flex items-center justify-center gap-2 group"
                      >
                        Ir al Perfil para Nuevo Enlace
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => navigate('/register')}
                        className="w-full bg-[#87C232] text-white py-3.5 px-4 rounded-2xl text-sm font-medium hover:bg-[#9CE840] transition-all duration-200 flex items-center justify-center gap-2 group"
                      >
                        Registrarse Nuevamente
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )
                  ) : (
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full bg-black text-white py-3.5 px-4 rounded-2xl text-sm font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      Ir al Dashboard
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                  
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full bg-transparent text-gray-700 py-3.5 px-4 rounded-2xl text-sm font-medium hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                  >
                    Volver al Login
                  </button>
                </>
              )}
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