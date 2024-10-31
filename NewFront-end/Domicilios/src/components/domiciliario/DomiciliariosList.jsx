export const DomiciliariosList = ({ 
  domiciliarios, 
  onEdit, 
  onDelete,
  onUpdateDisponibilidad 
}) => {
  return (
    <div className="space-y-4 mt-4">
      {domiciliarios.map(domiciliario => (
        <div 
          key={domiciliario.id_domiciliario}
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">
                Usuario ID: {domiciliario.id_usuario}
              </h3>
              <p className="text-sm text-gray-600">
                Licencia: {domiciliario.licencia_vehiculo}
              </p>
              <div className="flex items-center space-x-2">
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${domiciliario.disponibilidad === 'disponible' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }`}
                >
                  {domiciliario.disponibilidad}
                </span>
                <button
                  onClick={() => onUpdateDisponibilidad(
                    domiciliario.id_domiciliario,
                    domiciliario.disponibilidad === 'disponible' ? 'no disponible' : 'disponible'
                  )}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Cambiar disponibilidad
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(domiciliario)}
                className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(domiciliario.id_domiciliario)}
                className="inline-flex items-center px-3 py-1.5 border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}

      {domiciliarios.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron domiciliarios registrados
          </p>
        </div>
      )}
    </div>
  );
};