import { useState, useEffect } from 'react';
import { userService } from '../../service/api/userService';
import UserForm from './UserForm';
import UserList from './UserList';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (error) {
      showAlert('Error al cargar usuarios', 'error');
    }
  };

  const handleCreateOrUpdateUser = async (userData) => {
    try {
      if (selectedUser) {
        await userService.updateUser(selectedUser.id, userData);
        showAlert('Usuario actualizado exitosamente', 'success');
      } else {
        await userService.createUser(userData);
        showAlert('Usuario creado exitosamente', 'success');
      }
      loadUsers();
      setModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      showAlert('Error al procesar la operación', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      try {
        await userService.deleteUser(userId);
        showAlert('Usuario eliminado exitosamente', 'success');
        loadUsers();
      } catch (error) {
        showAlert('Error al eliminar usuario', 'error');
      }
    }
  };

  const handleToggleActive = async (userId, currentStatus) => {
    try {
      await userService.updateUser(userId, { active: !currentStatus });
      showAlert(`Usuario ${currentStatus ? 'desactivado' : 'activado'} exitosamente`, 'success');
      loadUsers();
    } catch (error) {
      showAlert('Error al cambiar estado del usuario', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const filteredUsers = users.filter(user => {
    if (!userTypeFilter) return true;
    return user.type === userTypeFilter;
  });

  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Gestión de Usuarios</h2>
      
      {alert.show && (
        <div 
          className={`mb-4 px-4 py-3 rounded-lg transition-all duration-300 ${
            alert.type === 'error' 
              ? 'bg-red-100 text-red-800 border border-red-200' 
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}
          role="alert"
        >
          {alert.message}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Filtrar por tipo de usuario</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={userTypeFilter}
          onChange={(e) => setUserTypeFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="administrador">Administrador</option>
          <option value="negocio">Negocio</option>
          <option value="particular">Particular</option>
          <option value="domiciliario">Domiciliario</option>
        </select>
      </div>

      <UserList 
        users={filteredUsers}
        onEdit={user => {
          setSelectedUser(user);
          setModalOpen(true);
        }}
        onDelete={handleDeleteUser}
        onToggleActive={handleToggleActive}
      />

      <button 
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        onClick={() => {
          setSelectedUser(null);
          setModalOpen(true);
        }}
      >
        Crear Nuevo Usuario
      </button>

      {modalOpen && (
        <UserForm
          user={selectedUser}
          onSubmit={handleCreateOrUpdateUser}
          onClose={() => {
            setModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;