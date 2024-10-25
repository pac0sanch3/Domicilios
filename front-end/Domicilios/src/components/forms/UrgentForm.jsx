import React, { useState, useEffect } from "react";
import axios from "axios";

const FormReporteNovedad = () => {
  const [domiciliarios, setDomiciliarios] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [formData, setFormData] = useState({
    id_domiciliario: "",
    id_solicitud: "",
    estado: "pendiente",
    fecha_reporte: "",
    descripcion: ""
  });

  useEffect(() => {
    // Llamadas a las API para obtener los domiciliarios y solicitudes
    const fetchDomiciliarios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/domiciliario/");
        setDomiciliarios(response.data);
      } catch (error) {
        console.error("Error al cargar los domiciliarios", error);
      }
    };

    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/solicitudes/listar");
        setSolicitudes(response.data);
      } catch (error) {
        console.error("Error al cargar las solicitudes", error);
      }
    };

    fetchDomiciliarios();
    fetchSolicitudes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/novedad/", formData);
      alert("Reporte enviado con éxito");
      // Resetear el formulario si es necesario
      setFormData({
        id_domiciliario: "",
        id_solicitud: "",
        estado: "pendiente",
        fecha_reporte: "",
        descripcion: ""
      });
    } catch (error) {
      console.error("Error al enviar el reporte", error);
      alert("Hubo un error al enviar el reporte");
    }
  };

  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Reportar Novedad Urgente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">ID Domiciliario</label>
          <select 
            name="id_domiciliario"
            value={formData.id_domiciliario}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Seleccione un domiciliario</option>
            {domiciliarios.length > 0 
              ? domiciliarios.map(domiciliario => (
                <option key={domiciliario.id} value={domiciliario.id}>
                  {domiciliario.nombre}
                </option>
              )) 
              : <option disabled>Cargando...</option>
            }
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">ID Solicitud</label>
          <select 
            name="id_solicitud"
            value={formData.id_solicitud}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Seleccione una solicitud</option>
            {solicitudes.length > 0 
              ? solicitudes.map(solicitud => (
                <option key={solicitud.id} value={solicitud.id}>
                  {solicitud.id} - {solicitud.descripcion || 'Sin descripción'}
                </option>
              )) 
              : <option disabled>Cargando...</option>
            }
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Estado</label>
          <select 
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="pendiente">pendiente</option>
            <option value="resuelta">resuelta</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Fecha de Reporte</label>
          <input
            type="date"
            name="fecha_reporte"
            value={formData.fecha_reporte}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Descripción del Problema</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            rows="4"
            placeholder="Describa el problema en detalle"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        > 
          Enviar Reporte Urgente
        </button>
      </form>
    </div>
  );
};

export default FormReporteNovedad;