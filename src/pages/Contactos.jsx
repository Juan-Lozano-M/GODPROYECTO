import AdminButton from "../components/admin/AdminButton";
import Chatbot from "../components/chatbot/ChatBot";
import Con2 from "../components/contacto/SeccionContactob";
import Footer from '../components/index/Footer';
import Navbar from "../components/index/Navbar";




function Contactos() {
  return (
    <div className="min-h-screen   overflow-x-hidden">

    
      <Navbar />
      <Chatbot />
      <AdminButton />
      <Con2 />
     
     
      
      <Footer></Footer>
  
      
    </div>
  )
}

export default Contactos
