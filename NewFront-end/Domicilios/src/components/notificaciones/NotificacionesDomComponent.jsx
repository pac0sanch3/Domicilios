import React, { useEffect, useState } from 'react';
import { useSolicitudes } from '../../services/SolicitudesProvider';

export const NotificacionesDomComponent = () => {
    const { listarSolicitudes, solicitudes, error, loading } = useSolicitudes();
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);

    useEffect(() => {
        listarSolicitudes(); // Llama a la función al cargar el componente
    }, []);

    // Filtra las solicitudes para mostrar solo las que tienen el estado "pendiente"
    const solicitudesPendientes = solicitudes.filter(solicitud => solicitud.estado === 'pendiente');

    // Función para actualizar el estado de la solicitud a "completado"
    const handleFinalizarSolicitud = async () => {
        try {
            const response = await fetch('http://localhost:3000/solicitudes/actualizarEstado', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: 'completado', idSolicitud: selectedSolicitud }),
            });
            if (response.ok) {
                listarSolicitudes(); // Actualiza la lista para reflejar el cambio
                setSelectedSolicitud(null); // Cierra el modal
            } else {
                console.error('Error al actualizar el estado de la solicitud');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Domicilios pendientes
            </h1>
            
            {loading && (
                <p className="text-lg text-gray-600">Cargando...</p>
            )}
            {error && (
                <p className="text-red-500 text-md font-semibold mb-4">
                    Error: {error.mensaje}
                </p>
            )}

            {solicitudesPendientes.length > 0 ? (
                <ul className="w-full max-w-4xl grid grid-cols-1 gap-4">
                    {solicitudesPendientes.map((solicitud) => (
                        <li 
                            key={solicitud.id_solicitud} 
                            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                        >
                            <p className="text-gray-800 font-semibold text-lg mb-2">
                                ID de la solicitud: <span className="text-gray-600">{solicitud.id_solicitud}</span>
                            </p>
                            <p className="text-gray-700 mb-1">
                                Cliente: <span className="text-gray-500">{solicitud.nombre_cliente || 'No disponible'}</span>
                            </p>
                            <p className="text-gray-700 mb-1">
                                Dirección de Recogida: <span className="text-gray-500">{solicitud.direccion_recogida}</span>
                            </p>
                            <p className="text-gray-700">
                                Dirección de Entrega: <span className="text-gray-500">{solicitud.direccion_entrega}</span>
                            </p>
                            <button 
                                onClick={() => setSelectedSolicitud(solicitud.id_solicitud)} 
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Marcar como finalizado
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-lg text-gray-600">
                    No hay solicitudes pendientes.
                </p>
            )}

            {/* Modal de confirmación */}
            {selectedSolicitud && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Confirmación</h2>
                        <p className="text-gray-700 mb-4">¿Estás seguro de que quieres realizar esta acción?</p>
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={() => setSelectedSolicitud(null)} 
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleFinalizarSolicitud} 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};