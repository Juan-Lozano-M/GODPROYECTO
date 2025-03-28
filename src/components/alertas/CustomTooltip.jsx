// components/CustomTooltip.jsx
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import ErrorIcon from "@mui/icons-material/Error"; // Ícono de información
import { styled } from "@mui/system"; // Para personalizar estilos

// Estilos personalizados para el Tooltip
const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  // Puedes agregar estilos personalizados aquí si lo necesitas

  
}));

const CustomTooltip = ({ message, placement = "right" }) => {
  return (
    <StyledTooltip title={message} placement={placement} arrow>
      <ErrorIcon className="text-orange-600 cursor-pointer" />
    </StyledTooltip>
  );
};



export default CustomTooltip;