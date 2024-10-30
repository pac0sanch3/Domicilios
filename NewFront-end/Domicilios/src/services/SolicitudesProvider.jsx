import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const SolicitudesContext = createContext();

export const SolicitudesProvider = ({ children }) => {
    const [infoSolicitud, setInfoSolicitud] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Función para registrar una solicitud
    const registrarSolicitud = async (solicitudData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post('http://localhost:3000/solicitudes/registrar', solicitudData);
            setInfoSolicitud(response.data.infoSolicitudCo); // Guardamos la información de la solicitud en el estado
        } catch (error) {
            setError(error.response ? error.response.data : { mensaje: "Error en el servidor" });
        } finally {
            setLoading(false);
        }
    };

    // Función para listar solicitudes
    const listarSolicitudes = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('http://localhost:3000/solicitudes/listar');
            setSolicitudes(response.data); // Guardamos la lista de solicitudes en el estado
        } catch (error) {
            setError(error.response ? error.response.data : { mensaje: "Error en el servidor" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SolicitudesContext.Provider value={{ infoSolicitud, registrarSolicitud, listarSolicitudes, solicitudes, error, loading }}>
            {children}
        </SolicitudesContext.Provider>
    );
};

// Hook para usar el contexto
export const useSolicitudes = () => useContext(SolicitudesContext);