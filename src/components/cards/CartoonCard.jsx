import React from 'react';

const CartoonCard = ({ title, children, className }) => {
  return (
    <div className={`card w-full border-6  border-black bg-white p-5 shadow-[12px_12px_0_#000] transition-all duration-300 hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[17px_17px_0_#000] ${className}`}>
      {title && (
        <span className="block text-3xl font-black text-black uppercase mb-4 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[90%] after:h-[3px] after:bg-black after:transform after:-translate-x-full hover:after:translate-x-0 after:transition-transform after:duration-300">
          {title}
        </span>
      )}
      {children}
    </div>
  );
}

export default CartoonCard;
