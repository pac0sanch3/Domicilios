import React from 'react';

const UserForm = ({ user, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {user ? 'Editar Usuario' : 'Crear Usuario'}
        </h2>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            type: formData.get('type'),
            password: formData.get('password'),
            active: true
          };
          onSubmit(userData);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name || ''}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email || ''}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Usuario</label>
              <select
                name="type"
                defaultValue={user?.type || ''}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Seleccione tipo de usuario</option>
                <option value="administrador">Administrador</option>
                <option value="negocio">Negocio</option>
                <option value="particular">Particular</option>
                <option value="domiciliario">Domiciliario</option>
              </select>
            </div>

            {!user && (
              <div>
                <label className="block text-sm font-medium mb-1">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {user ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;