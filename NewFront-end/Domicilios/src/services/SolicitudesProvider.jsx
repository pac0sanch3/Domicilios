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

    const checkNetworkConnection = () => {
        if (!navigator.onLine) {
            setError({
                mensaje: 'Sin conexión a internet',
                status: 'OFFLINE'
            });
            return false;
        }
        return true;
    };
    // Función para listar solicitudes
    const listarSolicitudes = async () => {
        if (!checkNetworkConnection()) return [];
        try {
            setLoading(true);
            setError(null);
    
            const response = await axios.get('http://localhost:3000/solicitudes/listar', {
                timeout: 10000,
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            setSolicitudes(response.data);
            return response.data;
        } catch (error) {
            console.error('Error detallado completo:', error);
            
            // Manejo de errores similar al anterior
            const errorConfig = axios.isAxiosError(error) 
                ? (error.response 
                    ? { 
                        mensaje: error.response.data.mensaje || 'Error en el servidor', 
                        status: error.response.status 
                    }
                    : (error.request 
                        ? { 
                            mensaje: 'No se pudo conectar con el servidor', 
                            status: 'NETWORK_ERROR' 
                        }
                        : { 
                            mensaje: 'Error al configurar la solicitud', 
                            status: 'CONFIG_ERROR' 
                        }
                    )
                )
                : { 
                    mensaje: 'Error desconocido', 
                    status: 'UNKNOWN_ERROR' 
                };
    
            setError(errorConfig);
            throw error;  // Re-lanzar para que los componentes puedan manejar el error
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