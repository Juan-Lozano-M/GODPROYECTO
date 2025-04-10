import linkIcon from "../../assets/icons/link.png";

function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Mira esta noticia interesante:",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Enlace copiado al portapapeles ✅");
      } catch (error) {
        console.error("Error al copiar:", error);
      }
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
  