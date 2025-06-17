import axios from "axios";

export const registrarVisita = async (section) => {
  try {
    await axios.post("http://localhost:5000/api/stats/register-visit", {
      section,
    });
  } catch (err) {
    console.error("Error registrando visita:", err);
  }
};
