import AdminProfile from "../../components/admin/AdminProfile";
import EstadisticasDashboard from "../../components/admin/EstadisticasDashboard";
import Sidebar from "../../components/admin/Sidebar";

export default function Statics() {
  return (
    <div className="h-full m-7 sm:mt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15">
      <Sidebar />
      <main>
        {/* Header con título y AdminProfile en esquinas opuestas */}
        <div className="flex items-center justify-between mt-6 2xl:mt-0">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-adlam">
            ESTADISTICAS
          </h1>
          <AdminProfile />
        </div>

        <EstadisticasDashboard />
      </main>
    </div>
  );
}       