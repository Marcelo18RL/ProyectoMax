import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Gratis',
      price: '$0',
      period: 'para siempre',
      features: [
        'Acceso básico a la plataforma',
        'Análisis de proyectos limitados',
        'Soporte por email',
        'Actualizaciones básicas'
      ]
    },
    {
      name: 'Mensual',
      price: '$10',
      period: 'por mes',
      features: [
        'Acceso completo a la plataforma',
        'Análisis de proyectos ilimitados',
        'Soporte prioritario',
        'Actualizaciones premium',
        'Exportación de reportes'
      ]
    },
    {
      name: 'Anual',
      price: '$100',
      period: 'por año',
      features: [
        'Todo lo del plan mensual',
        'Ahorro del 17%',
        'Soporte 24/7',
        'Acceso anticipado a nuevas funciones',
        'Reportes personalizados',
        'API access'
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Planes y Precios</h1>
      <div style={styles.plansContainer}>
        {plans.map((plan, index) => (
          <div key={index} style={styles.planCard}>
            <h2 style={styles.planName}>{plan.name}</h2>
            <div style={styles.priceContainer}>
              <span style={styles.price}>{plan.price}</span>
              <span style={styles.period}>/{plan.period}</span>
            </div>
            <ul style={styles.featuresList}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={styles.feature}>{feature}</li>
              ))}
            </ul>
            <button 
              style={styles.button}
              onClick={() => navigate('/login')}
            >
              Comenzar ahora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#333',
  },
  plansContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    flex: '1',
    minWidth: '280px',
    maxWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  planName: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  priceContainer: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  price: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  period: {
    fontSize: '16px',
    color: '#666',
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 30px 0',
    width: '100%',
  },
  feature: {
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E6E6FA', // Light purple color
    color: '#333',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    width: '100%',
    '&:hover': {
      backgroundColor: '#D8D8F6',
    },
  },
};

export default PricingPlans; 