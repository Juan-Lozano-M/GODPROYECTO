import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export const SmoothScrollHero = () => {
  return (
    <>
      <style>{`
        /* Estilos específicos para SmoothScrollHero */
        .smooth-scroll-hero {
          /* Estilos para pantallas con poca altura */
        }
        
        @media (max-height: 700px) {
          .smooth-scroll-hero .hero-title {
            font-size: 2rem !important;
            line-height: 1.2 !important;
            margin-bottom: 0.5rem !important;
          }
          .smooth-scroll-hero .hero-subtitle {
            font-size: 1rem !important;
            line-height: 1.4 !important;
            padding: 0 1rem !important;
          }
          .smooth-scroll-hero .hero-section {
            height: calc(100vh - 2rem) !important;
          }
          .smooth-scroll-hero .parallax-card {
            height: 350px !important;
            padding: 1rem !important;
          }
          .smooth-scroll-hero .parallax-card img {
            height: 160px !important;
          }
          .smooth-scroll-hero .parallax-card h3 {
            font-size: 1rem !important;
            margin-bottom: 0.5rem !important;
          }
          .smooth-scroll-hero .parallax-card p {
            font-size: 0.8rem !important;
            margin-bottom: 1rem !important;
          }
          .smooth-scroll-hero .parallax-category {
            font-size: 0.7rem !important;
          }
        }

        /* Estilos para móviles */
        @media (max-width: 768px) {
          .smooth-scroll-hero .parallax-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .smooth-scroll-hero .parallax-card {
            width: 100% !important;
            margin: 0 !important;
            height: 450px !important;
            aspect-ratio: 3/4 !important;
          }
          .smooth-scroll-hero .parallax-card img {
            height: 220px !important;
          }
        }

        /* Estilos para tablets */
        @media (min-width: 769px) and (max-width: 1024px) {
          .smooth-scroll-hero .parallax-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .smooth-scroll-hero .parallax-card {
            width: 100% !important;
            margin: 0 !important;
            height: 500px !important;
            aspect-ratio: 3/4 !important;
          }
        }

        /* Estilos para desktop - tarjetas más largas y menos anchas */
        @media (min-width: 1025px) {
          .smooth-scroll-hero .parallax-card {
            aspect-ratio: 3/4 !important;
            height: 550px !important;
          }
          .smooth-scroll-hero .parallax-grid .parallax-card:nth-child(1) {
            width: 280px !important;
          }
          .smooth-scroll-hero .parallax-grid .parallax-card:nth-child(2) {
            width: 400px !important;
          }
          .smooth-scroll-hero .parallax-grid .parallax-card:nth-child(3) {
            width: 280px !important;
          }
          .smooth-scroll-hero .parallax-grid .parallax-card:nth-child(4) {
            width: 320px !important;
          }
        }

        /* Animaciones suaves */
        .smooth-scroll-hero .parallax-card {
          transition: transform 0.2s ease-out;
        }
        .smooth-scroll-hero .parallax-card:hover {
          transform: translateY(-4px) !important;
        }
      `}</style>
      
      <div className="font-sans smooth-scroll-hero">
        <Nav />
        <Hero />
      </div>
    </>
  );
};

const Nav = () => {
  return null;
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 200vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-96" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );

  return (
    <motion.div
      className="hero-section sticky top-0 h-screen w-full flex items-center justify-center px-4"
      style={{
        clipPath,
        backgroundSize,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center text-white z-10 max-w-6xl mx-auto">
        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 tracking-tight leading-tight">
          <span className="text-[#9CE840]">Noticias</span> mas{" "}
          relevantes
        </h1>
        <p className="hero-subtitle text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light px-2">
          Un vistazo a nuestras iniciativas más relevantes que transforman vidas
        </p>
      </div>
      <div className="absolute inset-0 bg-black/30" />
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-[100px] md:pt-[200px]">
      <div className="parallax-grid">
        <ParallaxImg
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Inteligencia Artificial y Tecnología"
          start={-200}
          end={200}
          className="lg:w-1/3 lg:mr-auto"
          title="IA Autónoma 2025" 
          subtitle="Agentes de IA realizan tareas sin intervención humana"
          category="TECNOLOGÍA"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Cambio climático y temperatura global"
          start={200}
          end={-250}
          className="lg:mx-auto lg:w-2/3"
          title="Enero 2025: El Más Caluroso"
          subtitle="Temperaturas 1.75°C por encima de niveles preindustriales"
          category="CLIMA"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Innovación y futuro tecnológico"
          start={-200}
          end={200}
          className="lg:ml-auto lg:w-1/3"
          title="Tendencias Tech 2025"
          subtitle="Microsoft apuesta por centros de datos sostenibles"
          category="INNOVACIÓN"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Desarrollo sostenible y medio ambiente"
          start={0}
          end={-500}
          className="lg:ml-24 lg:w-5/12"
          title="Copa Mundial Skateboarding"
          subtitle="Colombia se prepara para competir en Roma 2025"
          category="DEPORTES"
        />
      </div>
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end, title, subtitle, category }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      ref={ref}
      className={`parallax-card ${className} relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl border border-black mb-4 md:mb-8 bg-white p-4 md:p-6 flex flex-col justify-between h-[350px] md:h-[450px] lg:h-[500px]`}
      style={{ transform, opacity }}
    >
      <div className="flex-1">
        <div className="mb-2">
          <span className="parallax-category text-xs font-semibold text-[#9CE840] tracking-wider uppercase">
            {category}
          </span>
        </div>
        <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight text-black">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed font-light mb-4 md:mb-6">
          {subtitle}
        </p>
      </div>
      <img
        src={src}
        alt={alt}
        className="w-full h-[180px] md:h-[250px] lg:h-[300px] object-cover mt-auto rounded-lg"
      />
    </motion.div>
  );
};

export default SmoothScrollHero;