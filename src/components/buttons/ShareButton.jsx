import linkIcon from "../../assets/icons/link.png";
import axios from "../../config/axiosConfig";

function ShareButton({ newsId }) {
  const handleShare = async () => {
    const shareUrl = window.location.href;

    // Primero, intenta compartir
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "Mira esta noticia interesante:",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Enlace copiado al portapapeles ✅");
      }

      // Segundo, notificar al backend que se compartió
      if (newsId) {
        await axios.patch(`/api/news/${newsId}/share`, {}, {
          withCredentials: false  // No necesitamos credenciales para incrementar contador
        });
      }
    } catch (error) {
      console.error("Error al compartir o actualizar contador:", error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-10 h-10 rounded-full bg-[#9CE840] hover:bg-[#8bd438] flex items-center justify-center transition-colors"
    >
      <img src={linkIcon} alt="Share" className="w-5 h-5" />
    </button>
  );
}

export default ShareButton;
