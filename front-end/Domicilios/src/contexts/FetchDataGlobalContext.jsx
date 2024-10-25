import { useFetchSolicitud, useFetchRoles, useFetchAmbientes, useFetchUserData } from "../hooks/index";
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const {
    dataUser,
    loading: loadinDataUser,
    fetcDataUser,
  } = useFetchUserData();



  const { solicitudData, loading: loadinDataSolicitud, refreshSolicitud } = useFetchSolicitud();
  const { roles, loading: loadingRol, refreshRol } = useFetchRoles();
  const {
    ambientes,
    isLoading: loadinAmbientes,
    refress,
  } = useFetchAmbientes();

  const [loading, setLoading] = useState(true);

  const refreshDataUser = async () => {
    await fetcDataUser();
  };

  useEffect(() => {
    setLoading(
      loadinDataUser ||
        loadinDataEquipo ||
        loadinDataSolicitud ||
        loadingRol ||
        loadinAmbientes
    );
  }, [
    loadinDataUser,
    loadinDataEquipo,
    loadinDataSolicitud,
    loadingRol,
    loadinAmbientes,
  ]);

  const value = {
    refreshDataUser,
    loading,
    dataUser,
    equiposData,
    solicitudData,
    roles,
    refreshRol,
    ambientes,
    refress,
    eroresMaquinas,
    refreshEquipos,
    refreshSolicitud
  };

  return (
    <>
      <GlobalDataContext.Provider value={value}>
        {children}
      </GlobalDataContext.Provider>
    </>
  );
};

GlobalDataProvider.propTypes = {
  children: PropTypes.any,
};
