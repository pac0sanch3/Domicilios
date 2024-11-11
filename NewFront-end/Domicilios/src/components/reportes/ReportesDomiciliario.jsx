import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { domiciliariosService } from '../../services/domiciliarioServer';
import { userService } from '../../services/userService';


const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerLogos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  headerCenter: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#1E40AF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 5,
    textAlign: 'center',
  },
  content: {
    marginTop: 30,
  },
  section: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F9FF',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1E40AF',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#93C5FD',
    alignItems: 'center',
    minHeight: 28,
    paddingVertical: 4,
  },
  column: {
    flex: 1,
    fontSize: 11,
    padding: 4,
    color: '#1E3A8A',
  },
  value: {
    fontSize: 11,
    marginBottom: 5,
    color: '#1E3A8A',
  },
  novedadSection: {
    marginLeft: 12,
    marginTop: 8,
    padding: 8,
    backgroundColor: '#DBEAFE',
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#64748B',
  }
});

const PDFDocument = ({ data }) => (
  <Document>
    {/* Primera página - Información del Domiciliario */}
    <Page size="A4" style={[styles.page, { position: 'relative', padding: '50px 40px' }]} wrap={false}>
      <View style={[styles.header, { marginBottom: 40 }]}>
        <View style={styles.headerLogos}>
          <Image style={[styles.logo, { width: 80, height: 80 }]} src="/loguito.jpeg" />
          <View style={styles.headerCenter}>
            <Text style={[styles.headerText, { fontSize: 24, marginBottom: 10 }]}>
              Sistema de Gestión de Domiciliarios
            </Text>
            <Text style={[styles.subHeaderText, { fontSize: 18 }]}>
              Reporte de Domiciliario
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.content, { marginTop: 30 }]}>
        <View style={[styles.section, { padding: 25 }]}>
          <Text style={[styles.sectionTitle, { fontSize: 20, marginBottom: 25 }]}>
            Información del Domiciliario
          </Text>
          <View style={[styles.row, { minHeight: 40 }]}>
            <Text style={[styles.column, { fontSize: 14 }]}>Nombre:</Text>
            <Text style={[styles.column, { flex: 2, fontSize: 14 }]}>
              {data?.data?.[0]?.nombre_domiciliario || 'No disponible'}
            </Text>
          </View>
          <View style={[styles.row, { minHeight: 40 }]}>
            <Text style={[styles.column, { fontSize: 14 }]}>Teléfono:</Text>
            <Text style={[styles.column, { flex: 2, fontSize: 14 }]}>
              {data?.data?.[0]?.telefono_domiciliario || 'No disponible'}
            </Text>
          </View>
          <View style={[styles.row, { minHeight: 40 }]}>
            <Text style={[styles.column, { fontSize: 14 }]}>Licencia del vehiculo:</Text>
            <Text style={[styles.column, { flex: 2, fontSize: 14 }]}>
              {data?.data?.[0]?.licencia_vehiculo || 'No disponible'}
            </Text>
          </View>
          <View style={[styles.row, { minHeight: 40 }]}>
            <Text style={[styles.column, { fontSize: 14 }]}>Total Solicitudes:</Text>
            <Text style={[styles.column, { flex: 2, fontSize: 14 }]}>
              {data?.total_solicitudes || 0}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.footer, { marginTop: 40 }]} fixed>
        <Text style={{ fontSize: 12 }}>
          Documento generado automáticamente el {new Date().toLocaleDateString()}
        </Text>
        <Text style={{ fontSize: 12 }} render={({ pageNumber, totalPages }) => (
          `Página ${pageNumber} de ${totalPages}`
        )} />
      </View>
    </Page>

    {/* Segunda página - Solicitudes */}
    <Page size="A4" style={[styles.page, { position: 'relative' }]}>
      <View style={styles.header} fixed>
        <View style={styles.headerLogos}>
          <Image style={styles.logo} src="/loguito.jpeg" />
          <View style={styles.headerCenter}>
            <Text style={styles.headerText}>Sistema de Gestión de Domiciliarios</Text>
            <Text style={styles.subHeaderText}>Detalle de Solicitudes</Text>
          </View>
        </View>
      </View>

      <View style={[styles.content]} wrap>
        {data?.data?.map((solicitud, index) => (
          <View key={index} style={styles.section} break={index !== 0 && index % 3 === 0}>
            <Text style={styles.sectionTitle}>Solicitud #{solicitud.id_solicitud}</Text>
            
            <View style={styles.row}>
              <Text style={styles.column}>Dirección Recogida:</Text>
              <Text style={[styles.column, { flex: 2 }]}>{solicitud.direccion_recogida}</Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.column}>Dirección Entrega:</Text>
              <Text style={[styles.column, { flex: 2 }]}>{solicitud.direccion_entrega}</Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.column}>Estado:</Text>
              <Text style={[styles.column, { flex: 2 }]}>{solicitud.estado_solicitud}</Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.column}>Fecha:</Text>
              <Text style={[styles.column, { flex: 2 }]}>
                {new Date(solicitud.fecha_solicitud).toLocaleDateString()}
              </Text>
            </View>

            {solicitud.novedades?.length > 0 && (
              <View style={styles.novedadSection}>
                <Text style={styles.sectionTitle}>Novedades:</Text>
                {solicitud.novedades.map((novedad, nIndex) => (
                  <View key={nIndex} style={styles.row}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.value}>• {novedad.novedad_descripcion}</Text>
                      <Text style={styles.value}>  Estado: {novedad.novedad_estado}</Text>
                      <Text style={styles.value}>  Ubicación: {novedad.ubicacionActual}</Text>
                      <Text style={styles.value}>  Fecha: {new Date(novedad.fecha_reporte).toLocaleDateString()}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={styles.footer} fixed>
        <Text>Documento generado automáticamente el {new Date().toLocaleDateString()}</Text>
        <Text render={({ pageNumber, totalPages }) => (
          `Página ${pageNumber} de ${totalPages}`
        )} />
      </View>
    </Page>
  </Document>
);
const ReportesDomiciliario = () => {
  const [domiciliarios, setDomiciliarios] = useState([]);
  const [selectedDomiciliario, setSelectedDomiciliario] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState({});

  useEffect(() => {
    loadDomiciliarios();
    loadUsers();
  }, []);

  const loadDomiciliarios = async () => {
    try {
      const response = await domiciliariosService.getDomiciliarios();
      const formattedDomiciliarios = response.data.map(domiciliario => ({
        ...domiciliario,
        fecha_creacion: domiciliario.fecha_creacion.split('T')[0],
        fecha_actualizacion: domiciliario.fecha_actualizacion.split('T')[0],
      }));
      setDomiciliarios(formattedDomiciliarios);
    } catch (error) {
      setError('Error al cargar domiciliarios');
      console.error(error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      const usersMap = {};
      response.data.forEach(user => {
        usersMap[user.id_usuario] = user.nombre;
      });
      setUsers(usersMap);
      updateDomiciliariosWithUserNames(usersMap);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const updateDomiciliariosWithUserNames = (usersMap) => {
    setDomiciliarios(prevDomiciliarios =>
      prevDomiciliarios.map(domiciliario => ({
        ...domiciliario,
        nombre_usuario: usersMap[domiciliario.id_usuario] || domiciliario.id_usuario
      }))
    );
  };

  const handleGenerateReport = async () => {
    if (!selectedDomiciliario || !fechaInicio || !fechaFin) {
      setError('Por favor complete todos los campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await domiciliariosService.DomiciliarioReporte({
        id_domiciliario: parseInt(selectedDomiciliario),
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
      });
      setReportData(response.data);
    } catch (error) {
      setError('Error al generar el reporte');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <img src="/loguito.jpeg" alt="Logo" className="h-16 w-auto" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-800">Sistema de Gestión de Domiciliarios</h1>
            <h2 className="text-xl text-blue-600">Reporte de Domiciliario</h2>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Seleccionar Domiciliario
            </label>
            <select
              className="w-full p-3 border-2 border-blue-200 rounded-lg hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-800"
              value={selectedDomiciliario}
              onChange={(e) => setSelectedDomiciliario(e.target.value)}
            >
              <option value="">Seleccione un domiciliario</option>
              {domiciliarios.map(domiciliario => (
                <option key={domiciliario.id_domiciliario} value={domiciliario.id_domiciliario}>
                  {domiciliario.nombre_usuario} - {domiciliario.licencia_vehiculo}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Fecha Inicio
              </label>
              <input
                type="date"
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Fecha Fin
              </label>
              <input
                type="date"
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              onClick={handleGenerateReport}
              disabled={isLoading}
            >
              {isLoading ? 'Generando...' : 'Generar Reporte'}
            </button>

            {reportData && (
              <PDFDownloadLink
                document={<PDFDocument data={reportData} />}
                fileName={`reporte_domiciliario_${selectedDomiciliario}.pdf`}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                {({ loading }) => loading ? 'Preparando PDF...' : 'Descargar PDF'}
              </PDFDownloadLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesDomiciliario;