
// RolesManagement.js
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import {IncidenciaForm} from './IncidenciaForm';
import {IncidenciaList} from './IncidenciaList';
import { IncidenciasService } from '../../service/api/IncidenciasService';

const RolesManagement = () => {
    const [incidencias, setIncidencias] = useState([]);

    const [selectedIncidencia, setSelectedIncidencia] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadIncidencias();
  }, []);

  const loadIncidencias = async () => {
    try {
      const response = await IncidenciasService.getIncidencias();
      setIncidencias(response.data);
    } catch (error) {
      console.error("Error al cargar incidencias", error);
    }
  };

  const handleCreateOrUpdateIncidencia = async (IncidenciasData) => {
    try {
      if (selectedIncidencia) {
        await IncidenciasService.updateIncidencias(selectedIncidencia.id_reporte, IncidenciasData);
        alert("Incidencia actualizada exitosamente");
      } else {
        await IncidenciasService.createIncidencias(IncidenciasData);
        alert("Incidencia registrada exitosamente");
      }
      loadIncidencias();
      setModalOpen(false);
      setSelectedIncidencia(null);
    } catch (error) {
      console.error("Error al procesar la incidencia", error);
    }
  };

  const handleDeleteIncidencia = async (id_reporte) => {
    if (window.confirm("¿Está seguro de eliminar esta incidencia?")) {
      try {
        await IncidenciasService.deleteIncidencias(id_reporte);
        alert("Incidencia eliminada exitosamente");
        loadIncidencias();
      } catch (error) {
        console.error("Error al eliminar la incidencia", error);
      }
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Gestión de Incidencias</h3>
      
      {/* Listado de incidencias */}
      <IncidenciaList
        incidencias={incidencias}
        onEdit={(incidencia) => {
          setSelectedIncidencia(incidencia);
          setModalOpen(true);
        }}
        onDelete={handleDeleteIncidencia}
      />

      {/* Botón para crear nueva incidencia */}
      <Button
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        onClick={() => {
          setSelectedIncidencia(null);
          setModalOpen(true);
        }}
      >
        Registrar Nueva Incidencia
      </Button>

      {/* Modal de formulario */}
      {modalOpen && (
        <IncidenciaForm
          incidencia={selectedIncidencia}
          onSubmit={handleCreateOrUpdateIncidencia}
          onClose={() => {
            setModalOpen(false);
            setSelectedIncidencia(null);
          }}
        />
      )}
    </div>
  );
};

export default RolesManagement;
