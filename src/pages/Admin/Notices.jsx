import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Search from "../../components/admin/Search";
import DataStat from "../../components/admin/DataStat";
import Sidebar from "../../components/Sidebar";
import CartoonButton from "../../components/buttons/CartoonButton";

import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";

function Notices() {
  // Estado simulado de noticias por estado
  const [noticias, setNoticias] = useState([
    { id: 1, status: "Aprobado" },
    { id: 2, status: "Anulado" },
    { id: 3, status: "En espera" },
    { id: 4, status: "Aprobado" },
  ]);

  const countByStatus = (status) =>
    noticias.filter((n) => n.status === status).length;

  const totalAprobados = countByStatus("Aprobado");
  const totalAnulados = countByStatus("Anulado");
  const totalEnEspera = countByStatus("En espera");

  const prevCounts = useRef({
    Aprobado: totalAprobados,
    Anulado: totalAnulados,
    "En espera": totalEnEspera,
  });

  const [cambios, setCambios] = useState({
    Aprobado: 0,
    Anulado: 0,
    "En espera": 0,
  });

  useEffect(() => {
    setCambios({
      Aprobado: totalAprobados - prevCounts.current.Aprobado,
      Anulado: totalAnulados - prevCounts.current.Anulado,
      "En espera": totalEnEspera - prevCounts.current["En espera"],
    });

    prevCounts.current = {
      Aprobado: totalAprobados,
      Anulado: totalAnulados,
      "En espera": totalEnEspera,
    };
  }, [noticias]);

  const getIcon = (cambio) =>
    cambio >= 0 ? flechaTestimonialArriba : flechaTestimonialAbajo;

  return (
    <div className="h-full m-7 sm:mt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15">
      <div className="flex w-full items-center">
        <Search />
      </div>

      <div>
        <h1 className="mt-6 text-3xl md:text-4xl xl:text-5xl font-adlam"> NOTICIAS </h1>
      </div>

      <div className="flex flex-wrap sm:flex-row mt-6 gap-5 sm:gap-10 lg:gap-20 h-auto">
        <DataStat
          value={totalAprobados}
          indicator={cambios.Aprobado}
          label="Publicadas"
          iconSrc={getIcon(cambios.Aprobado)}
          bgColor="#9CE840"
        />
        <DataStat
          value={totalAnulados}
          indicator={cambios.Anulado}
          label="Eliminadas"
          iconSrc={getIcon(cambios.Anulado)}
          bgColor="#EA4335"
        />
        <DataStat
          value={totalEnEspera}
          indicator={cambios["En espera"]}
          label="Archivadas"
          iconSrc={getIcon(cambios["En espera"])}
          bgColor="#FFBE00"
        />
      </div>

        {/* Sección de agregar noticia */}
        <div className="mt-10 w-full gap-2 lg:w-190">
          <Link to={"/home/newscreate"}>
            <CartoonButton />
          </Link>
        </div>

      <div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Notices;
