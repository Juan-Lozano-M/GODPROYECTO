import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: '¿Quiénes somos?',
    answer:
      'Somos una empresa dedicada al asesoramiento vocacional para jóvenes, ayudándolos a descubrir su camino profesional a través de orientación personalizada, herramientas interactivas y acompañamiento constante.',
  },
  {
    question: '¿Cuál es nuestra misión?',
    answer:
      'Nuestra misión es guiar a los jóvenes en el descubrimiento de sus talentos y vocaciones, impulsándolos a tomar decisiones conscientes sobre su futuro académico y profesional.',
  },
  {
    question: '¿Cuál es nuestra visión?',
    answer:
      'Ser la plataforma de asesoramiento vocacional líder en América Latina, transformando la forma en que los jóvenes eligen su camino profesional.',
  },
  {
    question: '¿Qué valores nos representan?',
    answer:
      'Empatía, compromiso, innovación, responsabilidad y confianza. Creemos que cada joven tiene un potencial único que merece ser descubierto y potenciado.',
  },
];

const Nosotros = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="nosotros-wrapper  p-6 max-w-5xl mx-auto text-gray-800">
      {/* Media query personalizada para pantallas con altura baja */}
      <style>
        {`
          @media (max-height: 700px) {
            .nosotros-wrapper {
              padding-top: 1rem;
              padding-bottom: 1rem;
            }

            .nosotros-title {
              
              line-height: 2.5rem !important;
              
            }

            .nosotros-subtext {
              font-size: 1.2rem !important;
            }

            .faq-card {
              padding: 1rem !important;
            }

            .faq-question {
              font-size: 0.95rem !important;
            }

            .faq-answer {
              font-size: 0.85rem !important;
            }
          }
        `}
      </style>      <div className="text-center mt-10 p-6 mb-10">
        <h1 className="nosotros-title text-3xl md:mb-6 md:text-4xl lg:text-5xl font-bold font-adlam leading-tight">
          Conoce de <span className="text-[#9CE840] mt-2 sm:mt-0 block sm:inline">Nosotros</span>
        </h1>
        <p className="nosotros-subtext text-black/50 mt-4 text-lg md:text-xl">
          Descubre quiénes somos, nuestra misión y nuestra filosofia.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-card bg-transparent border border-black rounded-3xl p-6 transition-all duration-300 shadow-md"
          >
            <button
              className="w-full flex justify-between items-center text-left font-semibold text-black text-base faq-question focus:outline-none"
              onClick={() => toggle(index)}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#9CE840]" />
                <span>{faq.question}</span>
              </div>
              <span className="text-[#9CE840] text-xl">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="faq-answer mt-3 text-gray-700 text-sm text-left ml-8 overflow-hidden">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

// Exportación por defecto del componente Nosotros
export default Nosotros;