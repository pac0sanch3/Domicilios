import { V } from "../style";

import { FaUserGear } from "react-icons/fa6";

export const menus = (t) => [
  { name: t("inicio"), link: "/home", icon: V.HomeIcon },
  {
    name: t("sitios"),
    link: "#",
    icon: V.MapIcon,
    submenu: true,
    submenus: [
      { name: t("sedes"), link: "/Sedes", logo: V.BuildingLibraryIcon },
      { name: t("areas"), link: "/Areas", logo: V.MapIcon },
      { name: t("ambientes"), link: "/Ambientes", logo: V.MapIcon },
    ],
  },
  {
    name: t("mantenimientos"),
    link: "#",
    icon: V.DocumentTextIcon,
    submenu: true,
    submenus: [
      {
        name: t("registrar_solicitud"),
        link: "/solicitud/registrar",
        logo: V.PencilSquareIcon,
      },
      {
        name: t("registrar_mantenimiento"),
        link: "/crear_ficha_mantenimiento",
        logo: V.WrenchIcon,
      },
      { name: t("solicitudes"), link: "/solicitud", logo: V.DocumentIcon },
    ],
  },
  { name: t("equipo_maquinaria"), link: "/Maquinas", icon: V.ServerIcon },
  { name: t("historial"), link: "/Historial", icon: V.ClockIcon },
  {
    name: t("panel_control"),
    link: "/Panelcontrol",
    icon: FaUserGear,
  },
];

export const tipoDocumentoData = [
  {
    value: "cedula de ciudadania",
    view: "Cédula de ciudadanía",
  },
  {
    value: "tarjeta identidad",
    view: "Tarjeta de Identidad",
  },
  {
    value: "cedula extranjeria",
    view: "Cédula de Extranjería",
  },
];
