// SolicitudesManagement.js
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { SolicitudesList } from './SolicitudesList';
import { SolicitudesService } from '../../service/api/Solicitudes'; // Asumiendo que tienes un servicio para manejar roles
import { SolicitudForm } from './SolicitudForm'; // Formulario para crear/editar roles
import { Alert } from './Alert';

const SolicitudesManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [roleTypeFilter, setRoleTypeFilter] = useState('');

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const response = await SolicitudesService.getSolicitud();
      setRoles(response.data);
    } catch (error) {
      showAlert('Error al cargar roles', 'error');
    }
  };

  const handleCreateOrUpdateRole = async (roleData) => {
    try {
      if (selectedRole) {
        await SolicitudesService.updateRole(selectedRole.id_solicitud, roleData);
        showAlert('Rol actualizado exitosamente', 'success');
      } else {
        await SolicitudesService.createRole(roleData);
        showAlert('Rol creado exitosamente', 'success');
      }
      loadRoles();
      setModalOpen(false);
      setSelectedRole(null);
    } catch (error) {
      showAlert('Error al procesar la operación', 'error');
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (window.confirm('¿Está seguro de eliminar este rol?')) {
      try {
        await SolicitudesService.deleteRole(roleId);
        showAlert('Rol eliminado exitosamente', 'success');
        loadRoles();
      } catch (error) {
        showAlert('Error al eliminar rol', 'error');
      }
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Filtrar roles según el tipo seleccionado
  const filteredRoles = roles.filter(role => {
    if (!roleTypeFilter) return true; 
    return role.estado === roleTypeFilter;
  });

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Gestión de Roles</h3>
      <Alert {...alert} />
      
      {/* Filtro para tipos de rol */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Filtrar por tipo de solicitud</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={roleTypeFilter}
          onChange={(e) => setRoleTypeFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="pendiente"> pendiente</option>
          <option value="asignado">asignado</option>
          <option value="en_curso">en curso</option>
          <option value="completado">completado</option>
          <option value="reprogramado"> reprogramado</option>
          <option value="cancelado"> cancelado</option>
          {/* Añade más opciones según tu lógica */}
        </select>
      </div>

      <Button 
        onClick={() => {
          setSelectedRole(null);
          setModalOpen(true);
        }} 
        color="primary" 
        auto
      >
        Crear Nueva Solicitud
      </Button>

      <SolicitudesList 
        roles={filteredRoles} // Usar roles filtrados
        onEdit={role => {
          setSelectedRole(role);
          setModalOpen(true);
        }}
        onDelete={handleDeleteRole}
      />

      {modalOpen && (
        <SolicitudForm
          role={selectedRole}
          onSubmit={handleCreateOrUpdateRole}
          onClose={() => {
            setModalOpen(false);
            setSelectedRole(null);
          }}
        />
      )}
    </div>
  );
};

export default SolicitudesManagement;
