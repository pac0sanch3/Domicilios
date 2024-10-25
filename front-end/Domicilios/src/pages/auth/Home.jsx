import {
  Layout,
  CardStyle,
  CardDataStats,
  useGlobalData,
  Icons,
  V,
  Breadcrumb,
  useAuth,
 // Artboard
  ChartMaquinas,
  MantenimientoGrafico,
  useMantenimientosQuery,
} from "../../index.js";
import {Artboard} from "../../components/index.js";
import { Link } from "react-router-dom";

export const Home = () => {
  const { dataUser, equiposData, solicitudData, ambientes } = useGlobalData();
  const { isLoading, mantenimientos } = useMantenimientosQuery();
  const { rol } = useAuth();

  const dataMap = [
    {
      title: ("total_users"),
      total: dataUser.length,
      icon: V.UsersIcon,
      link: "/Panelcontrol",
      admin: rol,
    },
    {
      title: ("total_equipos_sena"),
      total: equiposData.length,
      icon: V.ComputerDesktopIcon,
      link: "/Maquinas",
    },
    {
      title: ("total_solicitudes_mantenimiento"),
      total: solicitudData.length,
      icon: V.NewspaperIcon,
      link: "/solicitud",
    },
    {
      title: ("total_ambientes_formacion"),
      total: ambientes.length,
      icon: V.UsersIcon,
      link: "/Ambientes",
    },
  ];

  if (isLoading) {
    return <>{("loading")}</>;
  }
  return (
    <>
      <Layout>
        <Breadcrumb pageName={("inicio")} />
        {/* Primera fila con 4 tarjetas */}

        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dataMap.map(
              (value, index) =>
                (!value.admin ||
                  (value.admin &&
                    rol.trim().toLowerCase().startsWith("administrador"))) && (
                  <CardDataStats
                    key={index}
                    icon={value.icon}
                    title={value.title}
                    change={value.total}
                    total={value.total}
                    link={
                      <>
                        {rol === "Administrador" ? (
                           <Link to={value.link}>{("view")}</Link>
                        ) : (
                          " "
                        )}
                      </>
                    }
                  >
                    <Icons icon={value.icon} />
                  </CardDataStats>
                )
            )}
          </div>

          {/* Segunda fila con una tarjeta grande que ocupa 2/3 del ancho y una más pequeña */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CardStyle
                subtitle={("maintenance_summary_by_category")}
                titleCard={""}
              >
                <MantenimientoGrafico data={mantenimientos} />
              </CardStyle>
            </div>

            <CardStyle
              subtitle={("machinery_and_equipment_status_summary")}
              titleCard={("clasificacion_maquinas_equipos")}
            >
              <ChartMaquinas />
            </CardStyle>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-sm dark:border-strokedark dark:bg-boxdark">
              <Artboard />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
