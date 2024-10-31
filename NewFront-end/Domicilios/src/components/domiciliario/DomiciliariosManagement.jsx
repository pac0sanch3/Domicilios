import { useState, useEffect } from 'react';
import { domiciliariosService } from '../../services/domiciliarioServer';
import { DomiciliariosList } from './DomiciliariosList';
import { DomiciliarioForm } from './DomiciliarioForm';
import { Alert } from '../alert/Alert';

const DomiciliariosManagement = () => {
  const [domiciliarios, setDomiciliarios] = useState([]);
  const [selectedDomiciliario, setSelectedDomiciliario] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDomiciliarios();
  }, []);

  const loadDomiciliarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await domiciliariosService.getDomiciliarios();
      setDomiciliarios(response.data);
    } catch (error) {
      setError('Error al cargar los domiciliarios');
      showAlert('Error al cargar domiciliarios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateDomiciliario = async (formData) => {
    try {
      if (selectedDomiciliario) {
        await domiciliariosService.updateDomiciliario(
          selectedDomiciliario.id_domiciliario, 
          formData
        );
        showAlert('Domiciliario actualizado exitosamente', 'success');
      } else {
        await domiciliariosService.createDomiciliario(formData);
        showAlert('Domiciliario registrado exitosamente', 'success');
      }
      await loadDomiciliarios();
      handleCloseModal();
    } catch (error) {
      showAlert(
        error.response?.data?.error || 'Error al procesar la operación', 
        'error'
      );
    }
  };

  const handleDeleteDomiciliario = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este domiciliario?')) {
      try {
        await domiciliariosService.deleteDomiciliario(id);
        showAlert('Domiciliario eliminado exitosamente', 'success');
        await loadDomiciliarios();
      } catch (error) {
        showAlert('Error al eliminar el domiciliario', 'error');
      }
    }
  };

  const handleUpdateDisponibilidad = async (id, disponibilidad) => {
    try {
      await domiciliariosService.updateDisponibilidad(id, disponibilidad);
      showAlert('Disponibilidad actualizada exitosamente', 'success');
      await loadDomiciliarios();
    } catch (error) {
      showAlert('Error al actualizar la disponibilidad', 'error');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDomiciliario(null);
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Domiciliarios
          </h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Nuevo Domiciliario
          </button>
        </div>

        {alert.show && (
          <div className="mb-4">
            <Alert {...alert} />
          </div>
        )}

        <DomiciliariosList
          domiciliarios={domiciliarios}
          onEdit={(domiciliario) => {
            setSelectedDomiciliario(domiciliario);
            setModalOpen(true);
          }}
          onDelete={handleDeleteDomiciliario}
          onUpdateDisponibilidad={handleUpdateDisponibilidad}
        />

        {modalOpen && (
          <DomiciliarioForm
            domiciliario={selectedDomiciliario}
            onSubmit={handleCreateOrUpdateDomiciliario}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default DomiciliariosManagement;