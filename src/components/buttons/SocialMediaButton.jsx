import React from 'react';

const SocialLoginButton = ({ icon, altText, onClick }) => {
  return (
    <button
      className="bg-white w-37 rounded-md flex justify-center p-2 shadow-md hover:shadow-2xl transition-shadow duration-300"
      onClick={onClick}
    >
      <img src={icon} alt={altText} className="h-9" />
    </button>
  );
};

export default SocialLoginButton;