import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Graficos.css'; // Importa los estilos del componente

const Graficos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { graficoData } = location.state || { graficoData: {} };

  const handleVolver = () => {
    navigate(-1);
  };

  // Mostrar todos los riesgos
  const todosLosRiesgos = graficoData.riesgosDetectados || [];
  const todasLasMitigaciones = graficoData.mitigacionRiesgos || [];
  const porcentajesRiesgo = graficoData.porcentajeRiesgo || [];

  return (
    <div style={{ 
      padding: '20px',
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <button 
          onClick={handleVolver}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ← Volver
        </button>
        <h1 style={{ textAlign: 'center', margin: 0 }}>Análisis del Proyecto</h1>
        <div style={{ width: '100px' }}></div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '40px',
        alignItems: 'flex-start'
      }}>
        {/* Columna izquierda */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          <div>
            <h2>Gráfico de Carga de Trabajo</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graficoData.cargaTrabajo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2>Riesgos Detectados y Mitigaciones</h2>
            <div style={{ marginTop: '20px' }}>
              {todosLosRiesgos.map((riesgo, index) => {
                const mitigacion = todasLasMitigaciones[index] || 'Mitigación no especificada';
                
                return (
                  <div key={index} style={{ 
                    marginBottom: '30px',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #dc3545',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{
                      marginBottom: '15px'
                    }}>
                      <h3 style={{ 
                        margin: 0,
                        fontSize: '18px',
                        color: '#dc3545'
                      }}>
                        Riesgo {index + 1}
                      </h3>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ 
                        margin: '0 0 8px 0',
                        fontSize: '16px',
                        color: '#333'
                      }}>
                        Descripción del Riesgo:
                      </h4>
                      <p style={{ 
                        margin: 0,
                        fontSize: '16px',
                        lineHeight: '1.5',
                        color: '#555'
                      }}>
                        {riesgo}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ 
                        margin: '0 0 8px 0',
                        fontSize: '16px',
                        color: '#28a745'
                      }}>
                        Estrategia de Mitigación:
                      </h4>
                      <p style={{ 
                        margin: 0,
                        fontSize: '16px',
                        lineHeight: '1.5',
                        color: '#555',
                        backgroundColor: '#f8f9fa',
                        padding: '12px',
                        borderRadius: '5px',
                        borderLeft: '3px solid #28a745'
                      }}>
                        {mitigacion}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div style={{ flex: 1 }}>
          <h2>Presupuesto del Proyecto</h2>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#28a745',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              ${graficoData.presupuesto?.toLocaleString('es-CL') || '0'}
            </div>
            <div style={{
              fontSize: '1.2rem',
              color: '#666',
              textAlign: 'center'
            }}>
              Pesos Chilenos
            </div>
          </div>

          <h2>Porcentaje de Presupuesto</h2>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: '300px',
            display: 'flex',
            gap: '20px'
          }}>
            {/* Lista de distribución */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '10px'
            }}>
              {graficoData.distribucionPresupuesto && graficoData.distribucionPresupuesto.length > 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {graficoData.distribucionPresupuesto.map((item, index) => (
                    <div key={index} style={{
                      backgroundColor: '#fff',
                      padding: '10px',
                      borderRadius: '5px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <span style={{ flex: 1 }}>{item.nombre}</span>
                      <span style={{
                        backgroundColor: '#82ca9d',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '15px',
                        fontWeight: 'bold',
                        minWidth: '80px',
                        textAlign: 'center'
                      }}>
                        {item.valor}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666'
                }}>
                  No hay datos de porcentaje de presupuesto disponibles
                </div>
              )}
            </div>

            {/* Gráfico */}
            <div style={{ flex: 1 }}>
              {graficoData.distribucionPresupuesto && graficoData.distribucionPresupuesto.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={graficoData.distribucionPresupuesto}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="nombre" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                    />
                    <YAxis 
                      label={{ 
                        value: 'Porcentaje (%)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                      }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Porcentaje']}
                      labelFormatter={(label) => `Etapa: ${label}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="valor" 
                      fill="#82ca9d"
                      name="Porcentaje del Presupuesto"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666'
                }}>
                  No hay datos de distribución de presupuesto disponibles
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graficos;