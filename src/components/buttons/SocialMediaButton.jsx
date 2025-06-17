import React from 'react';

const SocialLoginButton = ({ icon, altText, onClick, text }) => {
  return (
    <button
      className="bg-white w-full rounded-md flex items-center justify-center gap-5 p-3 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300"
      onClick={onClick}
    >
      <img src={icon} alt={altText} className="h-7" />
      <span className="text-gray-700 font-medium text-sm">{text}</span>
    </button>
  );
};

export default SocialLoginButton;