import React from 'react';

export const UserList = ({ users, onEdit, onDelete, onToggleActive }) => {
  return (
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id_usuario} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
          <div className="flex flex-col">
            <span className="font-medium">{user.nombre}</span>
            <span className="text-sm text-gray-500">{user.correo}</span>
            <span className="text-sm text-gray-500 capitalize">
              {user.tipo_usuario}
            </span>
            <span className="text-sm text-gray-500">
              Tel: {user.telefono}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(user)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Editar
            </button>
            
            <button
              onClick={() => onToggleActive(user.id_usuario, user.estado)}
              className={`px-3 py-1 rounded-lg ${
                user.estado === 'activo'
                  ? 'text-yellow-600 hover:bg-yellow-50'
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              {user.estado === 'activo' ? 'Inactivar' : 'Activar'}
            </button>
            
            <button
              onClick={() => onDelete(user.id_usuario)}
              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron usuarios
        </div>
      )}
    </div>
  );
};