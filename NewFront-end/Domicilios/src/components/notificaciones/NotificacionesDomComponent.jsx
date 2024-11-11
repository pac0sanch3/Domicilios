import React, { useEffect, useState } from 'react';
import { useSolicitudes } from '../../services/SolicitudesProvider';
import axios from 'axios';

export const NotificacionesDomComponent = () => {
    const { listarSolicitudes, solicitudes, error, loading } = useSolicitudes();
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [activeTab, setActiveTab] = useState('pendiente');
    const [disponibilidadActual, setDisponibilidadActual] = useState('disponible');
    const [disponibilidad, setDisponibilidad] = useState('disponible');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);


    useEffect(() => {
        listarSolicitudes();
        getDisponibilidad();
    }, []);

    const filteredBySearch = searchTerm
    ? solicitudes.filter(solicitud => {
        const searchLower = searchTerm.toLowerCase();
        return (
            solicitud.id_solicitud.toString().includes(searchLower) ||
            (solicitud.nombre_cliente || '').toLowerCase().includes(searchLower) ||
            solicitud.direccion_recogida.toLowerCase().includes(searchLower) ||
            solicitud.direccion_entrega.toLowerCase().includes(searchLower) ||
            solicitud.estado.toLowerCase().includes(searchLower)
        );
    })
    : [];

    const filteredByTab = solicitudes.filter(solicitud => solicitud.estado === activeTab);

    const displayedSolicitudes = isSearching ? filteredBySearch : filteredByTab;

    useEffect(() => {
    }, [solicitudes, activeTab]);

    const filteredSolicitudes = solicitudes.filter(solicitud => solicitud.estado === activeTab);

    const getDisponibilidad = async () => {
        const id_usuario = localStorage.getItem('userId')
        const respuesta = await axios.get(`${import.meta.env.VITE_API_URL}domiciliario/consultar/${id_usuario}`)
        console.log(respuesta.data[0].disponibilidad)
        setDisponibilidad(respuesta.data[0].disponibilidad)
        setDisponibilidadActual(respuesta.data[0].disponibilidad)
    }

    const handleFinalizarSolicitud = async () => {
        try {
            console.log(selectedSolicitud)
            const response = await axios.put(`${import.meta.env.VITE_API_URL}solicitudes/actualizarEstado`,{ 
                estado: 'completado',
                idSolicitud: selectedSolicitud
            } )
            
            await listarSolicitudes(); // Espera a que la lista se actualice
            setSelectedSolicitud(null);
            setActiveTab('completado'); // Cambia automáticamente a la pestaña de completados
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
        }
    };

    const handleDisponibilidadChange = async (id_domiciliario) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}domiciliario/disponibilidad/${id_domiciliario}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Nueva disponibilidad:', data.nuevaDisponibilidad);
                // Actualizar el estado local inmediatamente
                setDisponibilidadActual(data.nuevaDisponibilidad);
                // Actualizar la lista de solicitudes
                await listarSolicitudes();
            } else {
                console.error('Error al actualizar la disponibilidad');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsSearching(value.length > 0);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header con título y estado de disponibilidad */}
            <div className={`shadow transition-colors duration-50  ${
            disponibilidadActual === 'disponible' ? 'bg-blue-300/20' 
            : disponibilidadActual === 'no_disponible' ? 'bg-red-300/20'
            : 'bg-gray-300'
        }`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${
                disponibilidadActual === 'disponible' ? 'text-blue-900'
                : disponibilidadActual === 'no_disponible' ? 'text-red-900'
                : 'text-gray-900'
            }`}>
                Administrar domicilios
            </h1>
            <div className="flex items-center space-x-2">
            <span className="text-gray-900 text-lg font-semibold ml-2">Cambiar estado</span>
                <button
                    onClick={() => handleDisponibilidadChange(solicitudes[0]?.id_domiciliario)}
                    className={`px-4 py-2 rounded-full transition-colors duration-50 
                        ${disponibilidadActual === 'disponible'
                            ? 'bg-blue-300 text-blue-900 hover:bg-blue-400'
                        : disponibilidadActual === 'no_disponible'
                            ? 'bg-red-300 text-red-900 hover:bg-red-400'
                            : 'bg-gray-300 text-gray-900 hover:bg-gray-400'
                    } border border-black`}
                >
                    
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                            disponibilidadActual === 'disponible' ? 'bg-blue-600'
                            : disponibilidadActual === 'no_disponible' ? 'bg-red-600'
                            : 'bg-gray-600'
                        }`}></div>
                        <span>{disponibilidadActual}</span>
                    </div>
                </button>
                
            </div>
        </div>
    </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar domicilios por ID, cliente, dirección o estado..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setIsSearching(false);
                            }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!isSearching && (
                <div className="flex flex-wrap gap-2 mb-6">
                <button 
                    onClick={() => setActiveTab('pendiente')} 
                    className={`px-4 py-2 rounded-md ${activeTab === 'pendiente' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Pedidos pendientes
                </button>
                <button 
                    onClick={() => setActiveTab('en_curso')} 
                    className={`px-4 py-2 rounded-md ${activeTab === 'en_curso' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Pedidos en curso
                </button>
                <button 
                    onClick={() => setActiveTab('completado')} 
                    className={`px-4 py-2 rounded-md ${activeTab === 'completado' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Pedidos completados
                </button>
                <button 
                    onClick={() => setActiveTab('cancelado')} 
                    className={`px-4 py-2 rounded-md ${activeTab === 'cancelado' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Pedidos cancelados
                </button>
                <button 
                    onClick={() => setActiveTab('reprogramado')} 
                    className={`px-4 py-2 rounded-md ${activeTab === 'reprogramado' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Pedidos reprogramados
                </button>
            </div>
                )}

                {loading && (
                    <p className="text-lg text-gray-600">Cargando...</p>
                )}
                {error && (
                    <p className="text-red-500 text-md font-semibold mb-4">
                        Error: {error.mensaje}
                    </p>
                )}

                {displayedSolicitudes.length > 0 ? (
                    <ul className="grid grid-cols-1 gap-4">
                        {displayedSolicitudes.map((solicitud) => (
                            <li 
                                key={solicitud.id_solicitud} 
                                className="bg-white shadow rounded-lg p-6"
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
                                
                                {activeTab === 'reprogramado' && (
                                    <p className="text-gray-700">
                                        Lugar del Incidente: <span className="text-gray-500">{solicitud.ubicaciones}</span>
                                    </p>
                                )}

                                <p className="text-gray-700">
                                    Estado: <span className="text-gray-500">{solicitud.estado}</span>
                                </p>

                                {(activeTab === 'en_curso' || activeTab === 'reprogramado') && (
                                    <button 
                                        onClick={() => setSelectedSolicitud(solicitud.id_solicitud)} 
                                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Marcar como finalizado
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-lg text-gray-600 text-center">
                        {isSearching 
                            ? "No se encontraron domicilios que coincidan con tu búsqueda."
                            : "No hay solicitudes en este apartado."}
                    </p>
                )}
            </div>

            {/* Modal de confirmación */}
            {selectedSolicitud && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Confirmación</h2>
                        <p className="text-gray-700 mb-4">¿Estás seguro de que quieres marcar esta solicitud como completada?</p>
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