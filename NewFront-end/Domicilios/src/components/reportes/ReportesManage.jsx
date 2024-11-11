import  { useState } from 'react';
import ReportesPDFVentas from './ReportesVentas';
import ReportesDomiciliario from './ReportesDomiciliario';

const ReportesManage = () => {
  const [currentReport, setCurrentReport] = useState('ventas');

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reportes</h2>

      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l-lg ${
            currentReport === 'ventas'
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          onClick={() => setCurrentReport('ventas')}
        >
          Reportes de Ventas
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${
            currentReport === 'domiciliario'
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          onClick={() => setCurrentReport('domiciliario')}
        >
          Reportes de Domiciliario
        </button>
      </div>

      {currentReport === 'ventas' ? <ReportesPDFVentas /> : <ReportesDomiciliario />}
    </div>
  );
};

export default ReportesManage;