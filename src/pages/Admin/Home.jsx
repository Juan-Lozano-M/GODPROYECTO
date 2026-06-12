// Importaciones
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

// Componentes
import AdminProfile from "../../components/admin/AdminProfile";
import Sidebar from "../../components/admin/Sidebar";
import TestimonialModal from "../../components/admin/TestimonialModal";
import TestimonialStaticHome from "../../components/admin/TestimonialStaticsHome";
import useTestimonialStats from "../../components/admin/useTestimonialStats";
import CartoonButton from "../../components/buttons/CartoonButton";
import StatCard from "../../components/cards/StatCard";
import TestimonialCard from "../../components/cards/TestimonialCard";

// Imágenes
import imagenBienvenida from "../../assets/images/imagenBienvenida.png";

const Home = () => {
  const [activeTab, setActiveTab] = useState("nuevos");
  const [tabRefs, setTabRefs] = useState({ nuevos: null, pendientes: null });
  const [testimonios, setTestimonios] = useState([]);
  const [selectedTestimonio, setSelectedTestimonio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminName, setAdminName] = useState("Administrador");

  const { stats, loading: statsLoading, refreshStats } = useTestimonialStats();

  useEffect(() => {
    fetchTestimonios();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axiosInstance.get("/api/user/profile/admin", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === "success") {
        const fullName = res.data.name || "Administrador";
        const firstName = fullName.trim().split(" ")[0]; // Mostrar solo el primer nombre
        setAdminName(firstName);
      }
    })
    .catch(() => {
      setAdminName("Administrador");
    });
  }, []);

  const mapearEstado = (estado) => {
    if (!estado) return "En espera";
    const estadoLower = estado.toLowerCase();
    switch (estadoLower) {
      case "aprobado": case "approved": return "Aprobado";
      case "anulado": case "rechazado": case "rejected": return "Anulado";
      case "pendiente": case "en espera": case "pending": return "En espera";
      default: return "En espera";
    }
  };
  const construirUrlImagen = (testimonio) => {
    const valorImagen = testimonio.profile_image;
    if (!valorImagen?.trim()) return "";
    if (valorImagen.startsWith("http")) return valorImagen;
    return `https://godbackend.onrender.com/uploads/${valorImagen}`;
  };

  const fetchTestimonios = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/testimonials", {
        withCredentials: false  // No necesitamos credenciales para obtener testimonios
      });
      const data = res.data || [];
      const adaptados = data.filter(t => t).map(t => ({
        id: t.id_tes || Math.random().toString(36),
        name: t.nombre_usuario || "Usuario sin nombre",
        position: t.cargo_tes || "Sin cargo",
        status: mapearEstado(t.estado_tes),
        imageUrl: construirUrlImagen(t),
        titulo: t.titulo_tes || "",
        comment: t.contenido_tes || "",
        fecha: t.fecha_publicacion_tes || new Date().toISOString()
      }));
      setTestimonios(adaptados);
      refreshStats();
    } catch (e) {
      console.error("Error al obtener testimonios:", e);
      setTestimonios([]);
    } finally {
      setLoading(false);
    }
  };

  const ordenarPorFecha = (a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return fechaB - fechaA;
  };

  const testimoniosRecientes = useMemo(() => {
    return testimonios.filter(t => ["Aprobado", "Anulado"].includes(t.status)).sort(ordenarPorFecha).slice(0, 3);
  }, [testimonios]);

  const testimoniosPendientes = useMemo(() => {
    return testimonios.filter(t => t.status === "En espera").sort(ordenarPorFecha).slice(0, 3);
  }, [testimonios]);

  const testimoniosMostrados = activeTab === "nuevos" ? testimoniosRecientes : testimoniosPendientes;

  const setTabRef = (tab, element) => {
    if (element && tabRefs[tab] !== element) {
      setTabRefs(prev => ({ ...prev, [tab]: element }));
    }
  };

  const getIndicatorStyles = useMemo(() => {
    if (!tabRefs[activeTab]) return {};
    const el = tabRefs[activeTab];
    return { width: el.offsetWidth, left: el.offsetLeft };
  }, [activeTab, tabRefs]);

  const handleTestimonialStatusChange = async () => {
    await fetchTestimonios();
    refreshStats();
    setSelectedTestimonio(null);
  };

  return (
    <div className="relative h-full m-7 sm:mt-10 md:ml-55 md:mr-15 cursor-guante">
      <div className="xl:hidden flex justify-end mb-4">
        <AdminProfile />
      </div>

      {/* Mobile Saludo */}
      <div className="xl:hidden">
        <div className="flex items-center justify-center rounded-lg w-full h-40 sm:h-51 bg-black/7">
          <div className="ml-8 sm:ml-0">
            <h1 className="font-bold basis-[10px] sm:text-3xl shrink-0">Hola {adminName}!</h1>
            <p className="font-medium text-[15px]">Es bueno verte de nuevo.</p>
          </div>
          <img src={imagenBienvenida} className="max-w-[212px] sm:max-w-[257px] mb-8" alt="Bienvenida" />
        </div>
        <div className="flex flex-row gap-4 mt-5">
          <StatCard value={statsLoading ? "..." : stats.testimonios_aprobados.toString()} label="Testimonios aprobados" />
          <StatCard value={statsLoading ? "..." : stats.testimonios_rechazados.toString()} label="Testimonios anulados" />
          <StatCard value={statsLoading ? "..." : stats.noticias_publicadas.toString()} label="Noticias publicadas" />
        </div>
      </div>

      <div className="xl:flex xl:gap-17">
        {/* Columna izquierda */}
        <div className="xl:w-1/2">
          <div className="hidden xl:flex items-center justify-center rounded-lg w-full h-51 bg-black/7">
            <div className="ml-15">
              <h1 className="font-bold xl:text-[23px] 2xl:text-[25px]">Hola {adminName}!</h1>
              <p className="font-medium xl:text-[17px] 2xl:text-[20px]">Es bueno verte de nuevo.</p>
            </div>
            <img src={imagenBienvenida} className="max-w-[212px] mb-8" alt="Bienvenida" />
          </div>

          <div className="mt-10 xl:mt-17 w-full">
            <Link to="/home/newscreate">
              <CartoonButton />
            </Link>
          </div>

          <div className="mt-10 xl:mt-17">
            <h1 className="font-bold text-xl sm:text-2xl">Testimonios</h1>
            <div className="relative flex gap-7 mt-4 font-bold">
              <button ref={el => setTabRef("nuevos", el)} onClick={() => setActiveTab("nuevos")} className={activeTab === "pendientes" ? "text-[#0000004D]" : "text-black"}>Recientes</button>
              <button ref={el => setTabRef("pendientes", el)} onClick={() => setActiveTab("pendientes")} className={activeTab === "nuevos" ? "text-[#0000004D]" : "text-black"}>Pendientes</button>
              <motion.div className="absolute bottom-0 h-0.5 bg-[#9CE840]" initial={false} animate={getIndicatorStyles} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
            </div>

            <div className="flex flex-col mt-4 gap-3">
              {loading ? (
                <p className="text-gray-500">Cargando testimonios...</p>
              ) : testimoniosMostrados.length > 0 ? (
                testimoniosMostrados.map((t) => (
                  <TestimonialCard key={t.id} name={t.name} position={t.position} imageUrl={t.imageUrl} comment={t.comment} status={t.status} onView={() => setSelectedTestimonio(t)} />
                ))
              ) : (
                <p className="text-gray-500">{activeTab === "nuevos" ? "No hay testimonios recientes" : "No hay testimonios pendientes"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="xl:w-1/2">
          <div className="hidden xl:flex xl:justify-end mb-4">
            <AdminProfile />
          </div>

          <div className="hidden xl:flex gap-7">
            <StatCard value={statsLoading ? "..." : stats.testimonios_aprobados.toString()} label="Testimonios aprobados" />
            <StatCard value={statsLoading ? "..." : stats.testimonios_rechazados.toString()} label="Testimonios anulados" />
            <StatCard value={statsLoading ? "..." : stats.noticias_publicadas.toString()} label="Noticias publicadas" />
          </div>

          <div className="hidden xl:flex flex-col mt-17">
            <h1 className="font-bold text-2xl mb-5">Estadísticas</h1>
            <h1 className="text-lg mb-5">Tasa de aprobación de testimonios</h1>
            <TestimonialStaticHome />
          </div>
        </div>
      </div>

      {selectedTestimonio && (
        <TestimonialModal
          isOpen={!!selectedTestimonio}
          onClose={() => setSelectedTestimonio(null)}
          testimonio={selectedTestimonio}
          onStatusChange={handleTestimonialStatusChange}
        />
      )}

      <Sidebar />
    </div>
  );
};

export default Home;
