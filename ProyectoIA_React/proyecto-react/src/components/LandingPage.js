import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        marginBottom: '40px'
      }}>
        <h1 style={{ margin: 0 }}>ProyectMax</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/pricing')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#b18cff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Planes y Precios
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#9371da',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>Bienvenido a CoffeeBreakIA</h2>
        <p style={{ fontSize: '1.2em', maxWidth: '800px', margin: '0 auto' }}>
          Tu asistente inteligente para la gestión de proyectos y recursos empresariales
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        padding: '20px'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Gestión de Proyectos</h3>
          <p>Optimiza tus proyectos con nuestra IA avanzada que analiza y sugiere la mejor distribución de recursos.</p>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Análisis de Riesgos</h3>
          <p>Identifica y mitiga riesgos potenciales en tus proyectos con nuestro sistema de análisis predictivo.</p>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Optimización de Recursos</h3>
          <p>Maximiza la eficiencia de tu equipo con recomendaciones personalizadas basadas en datos reales.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 