import axios from "../config/axiosConfig";

export const registrarVisita = async (section) => {
  try {
    await axios.post("/api/stats/register-visit", {
      section,
    }, {
      withCredentials: false  // No necesitamos credenciales para registrar visitas
    });
  } catch (err) {
    console.error("Error registrando visita:", err);
  }
};
