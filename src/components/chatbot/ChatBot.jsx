import React, { useState } from 'react';
import iconChat from "../../assets/icons/iconChat.png"
import iconCerrar from "../../assets/icons/iconCerrar.png"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola soñador! Soy Zumi, tu ayudante virtual. ¡Estoy aquí para ayudarte a encontrar tu camino!", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { text: inputText, isBot: false }]);
    
  
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300 w-[52px] h-[52px] flex items-center justify-center"
      >
        {isOpen ? <img src={iconCerrar} alt="Cerrar"  /> : <img src={iconChat} alt="chat"  />}
      </button>

      <div className={`absolute bottom-16 right-0 w-80 bg-white rounded-xl border-5 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,10)] transition-all duration-300 transform 
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        
        <div className="flex flex-col items-center p-4">
          <div className="relative mb-4">
            

          </div>
          
          <p className="text-center text-sm mb-4">
            ¡Hola soñador! Soy Zumi, tu ayudante virtual. 
            ¡Estoy aquí para ayudarte a encontrar tu camino!
          </p>
          

          
          <form onSubmit={handleSend} className="w-full">
            <div className="relative bg-[#9CE840] rounded-b-xl -mx-4 -mb-4 p-3 pt-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe aquí..."
                className="w-full p-2 bg-transparent outline-none placeholder-black/50"
              />

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;