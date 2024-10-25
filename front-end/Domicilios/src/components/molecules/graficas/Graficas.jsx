// Graficas.jsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios
ChartJS.register(ArcElement, Tooltip, Legend);

const Graficas = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Aquí debes obtener tus estadísticas de incidencias desde la API
    const obtenerEstadisticas = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuario/reportes/incidencias'); // Reemplaza con la URL de tu API
        const result = await response.json();

        // Procesar los datos para el gráfico
        const labels = result.map(item => item.tipo_incidencia);
        const totals = result.map(item => item.total_incidencias);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Total de Incidencias',
              data: totals,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colores para cada sección
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    obtenerEstadisticas();
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Gestión de Gráficos</h3>
      <Pie data={data} />
    </div>
  );
};

export default Graficas;
