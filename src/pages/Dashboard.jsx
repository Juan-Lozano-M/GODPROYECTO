import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendPasswordResetEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImagenDashboard from "../assets/images/imagenDashboard.png";
import Toast from '../components/alertas/Toast';
import Checkboxmore from "../components/checkbox/Checkboxmore";
import Navbar from "../components/index/Navbar";
import InputEditable from '../components/inputs/InputEditable';
import InstitutionSelector from "../components/inputs/InstitutionSelector";
import ProfileImageUpload from '../components/profile/ProfileImageUpload';
import ReauthModal from '../components/ReauthModal';
import axios from "../config/axiosConfig";
import { auth } from "../firebaseConfig";

const Dashboard = () => {
  // TODOS LOS HOOKS DEBEN IR AL INICIO - ANTES DE CUALQUIER RETURN CONDICIONAL
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestError, setInterestError] = useState("");
  const [isEditingProfileInterests, setIsEditingProfileInterests] = useState(false);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [googleProfileImage, setGoogleProfileImage] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', message: '' });
  const [currentPassword, setCurrentPassword] = useState("");
  const [isReauthenticating, setIsReauthenticating] = useState(false);
  const [isReauthModalOpen, setIsReauthModalOpen] = useState(false);
  const [oldEmail, setOldEmail] = useState("");
  const [userBirthdate, setUserBirthdate] = useState("");
  const [userInstitution, setUserInstitution] = useState("");
  // Nuevo estado para controlar qué acción se está reautenticando
  const [reauthAction, setReauthAction] = useState(""); // "email" o "password"
  
  const navigate = useNavigate();

  const interests = [
    "Investigación",
    "Deporte",
    "Música",
    "Arte",
    "Tecnología",
    "Medio Ambiente",
    "Lectura",
    "Fotografía",
    "Viajes",
    "Cocina"
  ];

  // Ordena intereses para que los seleccionados aparezcan primero
  const sortInterests = (interestsList) => {
    return [...interestsList].sort((a, b) => {
      const aSelected = selectedInterests.includes(a);
      const bSelected = selectedInterests.includes(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return interests.indexOf(a) - interests.indexOf(b);
    });
  };

  const visibleInterests = showAllInterests
    ? interests
    : sortInterests(interests).slice(0, 7);

    const handleInstitutionUpdate = async (institution) => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error('No authenticated user found');
          return;
        }
        
        console.log('Updating institution to:', institution); // Debug log
        
        const idToken = await currentUser.getIdToken();
        
        const response = await axios.put('/api/user/institution', {
          institution: institution
        }, {
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json'
          }
        });
    
        console.log('Server response:', response.data); // Debug log
    
        if (response.data.status === 'success') {
          setUserInstitution(institution);
          setToastMessage({
            title: '¡Éxito!',
            message: 'Institución actualizada correctamente'
          });
          setShowToast(true);
        }
      } catch (error) {
        console.error('Error updating institution:', error);
        console.error('Error response:', error.response?.data); // More detailed error logging
        setToastMessage({
          title: 'Error',
          message: error.response?.data?.message || 'No se pudo actualizar la institución'
        });
        setShowToast(true);
      }
    };

    useEffect(() => {
      const fetchUserData = async (user) => {
        if (!user) return;
        try {
          setIsLoading(true);
          const idToken = await user.getIdToken(true);
          
          const response = await axios.get('/api/user/profile', {
            headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
            },
            timeout: 5000,
            validateStatus: (status) => {
              return status >= 200 && status < 300;
            }
          });          if (response.data.status === 'success') {
            const userData = response.data.user;
            setUserName(userData.nombre_usu);
            setUserEmail(userData.correo_usu);
            
            // Establecer la imagen de perfil y guardarla en localStorage
            const profileImageUrl = userData.profile_image || user.photoURL || "";
            setProfileImage(profileImageUrl);
            
            // Guardar en localStorage para que el Navbar pueda acceder
            if (profileImageUrl) {
              localStorage.setItem('userPhoto', profileImageUrl);
              localStorage.setItem('profileImage', profileImageUrl);
            }
            
            // Agregar esta línea para cargar la fecha de nacimiento
            setUserBirthdate(userData.fecha_nacimiento || "");
            setUserInstitution(userData.institucion || "");
            
            if (userData.intereses && userData.intereses.length > 0) {
              setSelectedInterests(userData.intereses);
            }
          } else {
            throw new Error('Invalid response format');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          if (error.response) {
            console.error("Server response:", error.response.data);
          }
          setToastMessage({
            title: 'Error',
            message: 'No se pudo cargar la información del usuario'
          });
          setShowToast(true);
        } finally {
          setIsLoading(false);
        }
      };
    
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.photoURL) {
            setGoogleProfileImage(user.photoURL);
          }
          fetchUserData(user);
        } else {
          setIsLoading(false);
          navigate('/login');
        }
      });
    
      return () => unsubscribe();
    }, [navigate]);

    const formatDisplayDate = (dateString) => {
      if (!dateString) return "No especificada";
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };

  // FUNCIONES PARA MANEJAR EL CAMBIO DE EMAIL
  const handleEmailUpdate = async (email) => {
    setOldEmail(userEmail); // Guardar email actual antes del cambio
    setNewEmail(email);
    setReauthAction("email"); // Especificar que la reautenticación es para email
    setIsReauthModalOpen(true);
  };

  // NUEVA FUNCIÓN PARA MANEJAR EL CAMBIO DE CONTRASEÑA
  const handlePasswordReset = () => {
    setReauthAction("password"); // Especificar que la reautenticación es para contraseña
    setIsReauthModalOpen(true);
  };

  // Función de reautenticación modificada para manejar ambas acciones
  const handleReauthentication = async () => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error("Usuario no autenticado");
      }
  
      // Reautenticar al usuario
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      // Ejecutar la acción correspondiente después de la reautenticación
      if (reauthAction === "email") {
        // Lógica para cambio de email
        setOldEmail(currentUser.email);
        
        console.log(`Iniciando proceso de cambio de email de ${currentUser.email} a ${newEmail}`);
        
        await verifyBeforeUpdateEmail(currentUser, newEmail);
        
        setToastMessage({
          title: '¡Verificación enviada!',
          message: 'Se ha enviado un enlace de verificación al nuevo correo. Una vez que hagas clic en el enlace, tu email se actualizará automáticamente.'
        });
        setShowToast(true);

      } else if (reauthAction === "password") {
        // Lógica para cambio de contraseña
        await sendPasswordResetEmail(auth, currentUser.email);
        
        setToastMessage({
          title: '¡Correo enviado!',
          message: 'Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.'
        });
        setShowToast(true);
      }

      // Limpiar estados del modal
      setIsReauthModalOpen(false);
      setCurrentPassword("");
      setNewEmail("");
      setReauthAction("");

    } catch (error) {
      console.error('Error in reauth process:', error);
      let errorMessage = 'No se pudo procesar la solicitud';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo ya está siendo usado por otra cuenta';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Es necesario volver a iniciar sesión para realizar esta acción';
      }

      // Limpiar estados en caso de error
      setOldEmail("");
      setCurrentPassword("");
      setNewEmail("");
      setReauthAction("");

      setToastMessage({
        title: 'Error',
        message: errorMessage
      });
      setShowToast(true);
    }
  };

  // OPCIONAL: Función para escuchar cuando el email se actualiza después de la verificación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified && oldEmail) {
        // Check if the email has changed and is verified
        if (user.email !== oldEmail) {
          console.log(`Email verification detected. Updating from ${oldEmail} to ${user.email}`);
          
          try {
            const idToken = await user.getIdToken(true);
            
            const response = await axios.put('/api/user/email', {
              old_email: oldEmail, // Previous email
              new_email: user.email // New email from Firebase
            }, {
              headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.data.status === 'success') {
              // Update local state after database update
              setUserEmail(user.email);
              setOldEmail(""); // Clear to prevent multiple updates
              
              setToastMessage({
                title: '¡Éxito!',
                message: 'Correo electrónico actualizado correctamente en Firebase y base de datos'
              });
              setShowToast(true);
            } else {
              throw new Error(response.data.message || 'Error actualizando email');
            }
          } catch (error) {
            console.error('Error updating email in backend:', error);
            
            setToastMessage({
              title: 'Error',
              message: 'El email se actualizó en Firebase pero hubo un error actualizando la base de datos'
            });
            setShowToast(true);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [oldEmail]);
  

  // LOADING STATE - AHORA DESPUÉS DE TODOS LOS HOOKS
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F1F1]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87C232]"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
    setInterestError("");
  };

  const handleSaveInterests = async () => {
    if (selectedInterests.length < 2) {
      setInterestError("Por favor selecciona al menos 2 intereses");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      const idToken = await currentUser.getIdToken();
      
      const response = await axios.put('/api/user/interests', {
        interests: selectedInterests
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (response.data.status === 'success') {
        setInterestError("¡Intereses guardados exitosamente!");
        setIsEditingProfileInterests(false);
      }
    } catch (error) {
      console.error("Error saving interests:", error);
      setInterestError("Error al guardar los intereses");
    }
  };  // Función para generar mensaje personalizado basado en intereses
  const getPersonalizedMessage = () => {
    if (selectedInterests.length === 0) {
      return "Estudiante con ganas de descubrir nuevas pasiones y cambiar el mundo. ¡Selecciona tus intereses para personalizar tu experiencia!";
    }
    
    const firstInterest = selectedInterests[0];
    const secondInterest = selectedInterests[1];
    
    const messages = {
      "Investigación": {
        base: "Estudiante investigador con pasión por descubrir nuevos conocimientos",
        combinations: {
          "Deporte": "y mejorar el rendimiento atlético a través de la ciencia",
          "Música": "y explorar la ciencia detrás de la música y el sonido",
          "Arte": "y analizar las conexiones entre arte y ciencia",
          "Tecnología": "y desarrollar innovaciones tecnológicas",
          "Medio Ambiente": "y encontrar soluciones sostenibles para el planeta",
          "Lectura": "y profundizar en el conocimiento a través de la literatura académica",
          "Fotografía": "y capturar la ciencia a través de imágenes",
          "Viajes": "y explorar diferentes culturas y métodos de investigación",
          "Cocina": "y estudiar la gastronomía molecular"
        }
      },
      "Deporte": {
        base: "Estudiante atlético con pasión por el movimiento y la superación personal",
        combinations: {
          "Investigación": "y el análisis científico del rendimiento deportivo",
          "Música": "y la sincronización perfecta entre ritmo y ejercicio",
          "Arte": "y la expresión artística a través del movimiento",
          "Tecnología": "y las innovaciones en el entrenamiento deportivo",
          "Medio Ambiente": "y los deportes al aire libre sostenibles",
          "Lectura": "y el estudio de la psicología deportiva",
          "Fotografía": "y capturar la emoción del deporte",
          "Viajes": "y explorar deportes tradicionales de diferentes culturas",
          "Cocina": "y la nutrición deportiva óptima"
        }
      },
      "Música": {
        base: "Estudiante melómano con pasión por los sonidos y la armonía",
        combinations: {
          "Investigación": "y el estudio de la acústica y musicología",
          "Deporte": "y la motivación a través de ritmos energéticos",
          "Arte": "y la fusión de expresiones artísticas",
          "Tecnología": "y la producción musical digital",
          "Medio Ambiente": "y los sonidos de la naturaleza",
          "Lectura": "y la literatura musical y biografías de artistas",
          "Fotografía": "y capturar la esencia visual de la música",
          "Viajes": "y descubrir la música tradicional del mundo",
          "Cocina": "y crear mientras suena la melodía perfecta"
        }
      },
      "Arte": {
        base: "Estudiante artístico con pasión por la creatividad y la expresión",
        combinations: {
          "Investigación": "y el análisis de movimientos artísticos",
          "Deporte": "y la belleza del movimiento corporal",
          "Música": "y la sinestesia entre sonido y color",
          "Tecnología": "y el arte digital innovador",
          "Medio Ambiente": "y el arte ecológico sostenible",
          "Lectura": "y la literatura como forma de arte",
          "Fotografía": "y capturar la belleza en cada momento",
          "Viajes": "y descubrir el arte en cada cultura",
          "Cocina": "y la gastronomía como expresión artística"
        }
      },
      "Tecnología": {
        base: "Estudiante tecnológico con pasión por la innovación digital",
        combinations: {
          "Investigación": "y el desarrollo de soluciones innovadoras",
          "Deporte": "y las aplicaciones tecnológicas en el fitness",
          "Música": "y la creación de experiencias sonoras digitales",
          "Arte": "y el arte generativo por computadora",
          "Medio Ambiente": "y las tecnologías verdes del futuro",
          "Lectura": "y la literatura de ciencia ficción",
          "Fotografía": "y la fotografía computacional avanzada",
          "Viajes": "y las aplicaciones de viaje inteligentes",
          "Cocina": "y la gastronomía molecular tecnológica"
        }
      },
      "Medio Ambiente": {
        base: "Estudiante ecologista con pasión por proteger nuestro planeta",
        combinations: {
          "Investigación": "y el desarrollo de soluciones sostenibles",
          "Deporte": "y los deportes ecológicos al aire libre",
          "Música": "y los sonidos naturales del ecosistema",
          "Arte": "y el arte con materiales reciclados",
          "Tecnología": "y las innovaciones verdes del futuro",
          "Lectura": "y la literatura ambiental inspiradora",
          "Fotografía": "y documentar la belleza natural",
          "Viajes": "y el turismo sostenible responsable",
          "Cocina": "y la gastronomía orgánica local"
        }
      },
      "Lectura": {
        base: "Estudiante lector con pasión por el conocimiento y las historias",
        combinations: {
          "Investigación": "y la búsqueda de información en fuentes literarias",
          "Deporte": "y las biografías de grandes atletas",
          "Música": "y las letras que tocan el alma",
          "Arte": "y la literatura como forma de arte",
          "Tecnología": "y los libros digitales del futuro",
          "Medio Ambiente": "y las obras sobre conservación",
          "Fotografía": "y los fotolibros que cuentan historias",
          "Viajes": "y las guías de lugares extraordinarios",
          "Cocina": "y los libros de recetas tradicionales"
        }
      },
      "Fotografía": {
        base: "Estudiante visual con pasión por capturar momentos únicos",
        combinations: {
          "Investigación": "y documentar descubrimientos científicos",
          "Deporte": "y la fotografía deportiva de alta velocidad",
          "Música": "y capturar la emoción de los conciertos",
          "Arte": "y la fotografía como expresión artística",
          "Tecnología": "y las técnicas de fotografía digital",
          "Medio Ambiente": "y la fotografía de naturaleza salvaje",
          "Lectura": "y los fotolibros narrativos",
          "Viajes": "y capturar la esencia de cada destino",
          "Cocina": "y la fotografía gastronómica apetitosa"
        }
      },
      "Viajes": {
        base: "Estudiante aventurero con pasión por explorar el mundo",
        combinations: {
          "Investigación": "y estudiar culturas de diferentes países",
          "Deporte": "y practicar deportes extremos en cada destino",
          "Música": "y descubrir la música tradicional mundial",
          "Arte": "y explorar el arte en museos internacionales",
          "Tecnología": "y usar apps innovadoras de viaje",
          "Medio Ambiente": "y practicar turismo sostenible",
          "Lectura": "y leer sobre cada lugar que visita",
          "Fotografía": "y capturar la esencia de cada cultura",
          "Cocina": "y probar la gastronomía auténtica local"
        }
      },
      "Cocina": {
        base: "Estudiante gastronómico con pasión por los sabores y la cultura culinaria",
        combinations: {
          "Investigación": "y el estudio de la gastronomía molecular",
          "Deporte": "y la nutrición para el rendimiento atlético",
          "Música": "y cocinar al ritmo de buena música",
          "Arte": "y la presentación artística de platos",
          "Tecnología": "y las innovaciones en cocina moderna",
          "Medio Ambiente": "y la cocina sostenible con ingredientes locales",
          "Lectura": "y los libros de recetas tradicionales",
          "Fotografía": "y la fotografía gastronómica profesional",
          "Viajes": "y descubrir sabores auténticos del mundo"
        }
      }
    };
    
    if (messages[firstInterest]) {
      const baseMessage = messages[firstInterest].base;
      if (secondInterest && messages[firstInterest].combinations[secondInterest]) {
        return `${baseMessage} ${messages[firstInterest].combinations[secondInterest]}. ¡Futuro agente de cambio!`;
      }
      return `${baseMessage}. ¡Futuro agente de cambio!`;
    }
    
    return "Estudiante con intereses únicos y ganas de cambiar el mundo. ¡Futuro defensor de tus pasiones!";
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-black rounded-lg shadow-lg p-6 mb-6 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="z-10">
              <h2 className="text-3xl font-semibold text-[#9CE840] mb-5">
                Bienvenido {userName}
              </h2>              <p className="text-gray-300 text-sm max-w-md">
                {getPersonalizedMessage()}
              </p>
              <div className="flex gap-4 mt-4">

                <Link to="/" >
                <button className="bg-[#9CE840] text-black px-4 py-2 rounded-md">
                  ¡Descubre tu camino!
                </button>
                </Link>
              </div>
            </div>
            <div className="absolute right-10 top-[-55px] h-full w-1/3 hidden max-[810px]:hidden min-[810px]:block">
              <img
                src={ImagenDashboard}
                alt="Profile"
                className="h-80 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 lg:w-1/4">
            <div className="flex flex-col items-center">
              <div className="relative group">
                {profileImage ? (
                  <img 
                    src={profileImage}
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 bg-[#87C232] rounded-full flex items-center justify-center text-6xl text-white mb-4">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute bottom-4 right-0">
                  <ProfileImageUpload onImageUpdate={setProfileImage} />
                </div>
              </div>
              <p className="text-xl font-semibold mb-2">{userName}</p>
              <p className="text-gray-500 text-sm mb-4">{userEmail}</p>
              
              <div className="flex gap-2 mb-4">
                {selectedInterests.slice(0, 2).map((interest) => (
                  <span 
                    key={interest}
                    className="bg-[#9CE840] text-black px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>

              <div className="flex justify-start w-full gap-2 text-sm text-gray-500 mb-2">
              <div className="flex justify-start w-full gap-2 text-sm text-gray-500 mb-2">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{formatDisplayDate(userBirthdate)}</span>
              </div>
            </div>
              </div>
              <div className="flex justify-start w-full gap-2 text-sm text-gray-500">
              <div className="flex justify-start w-full gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span>{userInstitution || "Sin especificar"}</span>
              </div>
            </div>
                
              </div>

            </div>
          </div>

          <div className="lg:w-3/4 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold bg-[#9CE840] text-black p-3 rounded-t-lg -m-6 mb-6">
                Información Personal
              </h2>
              
         
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600 mb-2">Nombre:</label>
                  <InputEditable
                    value={userName}
                    onChange={setUserName}
                    field="nombre_usu"
                    placeholder="Nuevo nombre"
                    onSuccess={() => {
                      setToastMessage({
                        title: '¡Éxito!',
                        message: 'Nombre actualizado correctamente'
                      });
                      setShowToast(true);
                    }}
                    />
                    
                    {/* Add this near the end of your return statement if not already present */}

                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Correo:</label>
                  <InputEditable
                    value={userEmail}
                    onChange={setNewEmail}
                    field="correo_usu"
                    type="email"
                    placeholder="Nuevo correo electrónico"
                    onSuccess={() => handleEmailUpdate(newEmail)}
                  />
                </div>
              
                <div>
                <label className="block text-gray-600 mb-2">Contraseña:</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed">
                      ••••••
                    </div>
                    <button
                      onClick={handlePasswordReset}
                      className="ml-2 bg-white p-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_black]  hover:shadow-[1px_1px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_0px_black] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[3px_3px_0px_0px_black] disabled:hover:translate-x-0 disabled:hover:translate-y-0t"
                      title="Cambiar contraseña"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    </button>
                  </div>
                </div>
              
                <div>
                  <label className="block text-gray-600 mb-2">Fecha nacimiento:</label>
                  <InputEditable
                    value={userBirthdate}
                    onChange={setUserBirthdate}
                    field="fecha_nacimiento"
                    type="date"
                    placeholder="Selecciona tu fecha de nacimiento"
                    onSuccess={() => {
                      setToastMessage({
                        title: '¡Éxito!',
                        message: 'Fecha de nacimiento actualizada correctamente'
                      });
                      setShowToast(true);
                    }}
                  />
                </div>
              
                <div className="col-span-full">
                  <label className="block text-gray-600 mb-2">Institución:</label>
                  <InstitutionSelector
                    value={userInstitution}
                    onChange={(institutionName) => {
                      setUserInstitution(institutionName);
                      handleInstitutionUpdate(institutionName);
                    }}
                    onSuccess={() => {
                      // Ya no necesitas llamar handleInstitutionUpdate aquí
                      console.log('Institution selected successfully');
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold bg-[#9CE840] text-black p-3 rounded-t-lg -m-6 mb-6">
                Lo que te apasiona
              </h2>
              <div className="mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className={`flex flex-wrap gap-3 transition-all duration-300 ease-in-out p-1 ${
                      showAllInterests 
                        ? 'max-h-[800px] opacity-100 scale-100' 
                        : 'max-h-[45px] opacity-90 scale-95'
                    } transform origin-top overflow-hidden`}>
                      {visibleInterests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => isEditingProfileInterests && handleInterestToggle(interest)}
                          className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                            selectedInterests.includes(interest)
                              ? "bg-[#87C232] text-white font-medium shadow-[0_2px_8px_rgba(135,194,50,0.3)]"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          } ${!isEditingProfileInterests && "cursor-default"}`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 pt-2">
                    <Checkboxmore 
                      checked={showAllInterests}
                      onChange={() => setShowAllInterests(!showAllInterests)}
                      className={`scale-75 transform transition-all duration-300 ${
                        showAllInterests ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </div>
                </div>
                {interestError && (
                  <p className={`text-sm mt-2 ${
                    interestError.includes("exitosamente") 
                      ? "text-green-500" 
                      : "text-red-500"
                  }`}>
                    {interestError}
                  </p>
                )}
                <div className={`transition-all duration-300 ease-in-out ${
                  showAllInterests 
                    ? 'h-[60px] opacity-100 mt-4' 
                    : 'h-0 opacity-0 mt-0'
                } overflow-hidden`}>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditingProfileInterests(!isEditingProfileInterests)}
                      className={`${
                        isEditingProfileInterests 
                          ? "bg-gray-500" 
                          : "bg-[#87C232]"
                      } text-white px-6 py-2 rounded-md hover:opacity-90`}
                    >
                      {isEditingProfileInterests ? "Cancelar" : "Editar"}
                    </button>
                    {isEditingProfileInterests && (
                      <button
                        onClick={handleSaveInterests}
                        className="bg-[#87C232] text-white px-6 py-2 rounded-md hover:bg-[#9CE840]"
                      >
                        Guardar intereses
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    {/* Add Toast component with fixed positioning */}
    {showToast && (
      <div className="fixed top-4 right-4 z-[9999]"> {/* z-index más alto */}
        <Toast
          title={toastMessage.title}
          message={toastMessage.message}
          show={showToast}
          setShow={setShowToast}
        />
      </div>
    )}
    {/* Add the ReauthModal component */}
    <ReauthModal
      isOpen={isReauthModalOpen}
      onClose={() => {
        setIsReauthModalOpen(false);
        setCurrentPassword("");
        setNewEmail("");
        setReauthAction("");
      }}
      onReauthenticate={handleReauthentication}
      currentPassword={currentPassword}
      setCurrentPassword={setCurrentPassword}
    />
    </div>
  );
};

export default Dashboard;