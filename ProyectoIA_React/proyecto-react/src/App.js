import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Graficos from './components/Graficos';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PricingPlans from './components/PricingPlans';
import './App.css';

const CoffeeBreakIA = ({ graficoData, setGraficoData, formData, setFormData }) => {
  const [tipoProyecto, setTipoProyecto] = useState(formData.tipoProyecto || '');
  const [cantidadTrabajadores, setCantidadTrabajadores] = useState(formData.cantidadTrabajadores || '');
  const [fechaInicio, setFechaInicio] = useState(formData.fechaInicio || '');
  const [fechaEntrega, setFechaEntrega] = useState(formData.fechaEntrega || '');
  const [descripcionGeneral, setDescripcionGeneral] = useState(formData.descripcionGeneral || '');
  const [especialidades, setEspecialidades] = useState(formData.especialidades || []);
  const [respuestas, setRespuestas] = useState(formData.respuestas || '');
  const [respuestaCompleta, setRespuestaCompleta] = useState(formData.respuestaCompleta || '');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFormData({
      tipoProyecto,
      cantidadTrabajadores,
      fechaInicio,
      fechaEntrega,
      descripcionGeneral,
      especialidades,
      respuestas,
      respuestaCompleta
    });
  }, [
    tipoProyecto,
    cantidadTrabajadores,
    fechaInicio,
    fechaEntrega,
    descripcionGeneral,
    especialidades,
    respuestas,
    respuestaCompleta,
    setFormData
  ]);

  useEffect(() => {
    if (location.state) {
      setTipoProyecto(location.state.tipoProyecto || '');
      setCantidadTrabajadores(location.state.cantidadTrabajadores || '');
      setFechaInicio(location.state.fechaInicio || '');
      setFechaEntrega(location.state.fechaEntrega || '');
      setDescripcionGeneral(location.state.descripcionGeneral || '');
      setEspecialidades(location.state.especialidades || []);
      setRespuestas(location.state.respuestas || '');
      setRespuestaCompleta(location.state.respuestaCompleta || '');
    }
  }, [location.state]);

  useEffect(() => {
    const cantidad = parseInt(cantidadTrabajadores);
    if (!isNaN(cantidad) && cantidad > 0) {
      setEspecialidades(Array.from({ length: cantidad }, () => ''));
    } else {
      setEspecialidades([]);
    }
  }, [cantidadTrabajadores]);

  const handleEspecialidadChange = (index, value) => {
    const nuevas = [...especialidades];
    nuevas[index] = value;
    setEspecialidades(nuevas);
  };

  const enviarDatos = async () => {
    const cantidad = parseInt(cantidadTrabajadores);
    if (!tipoProyecto || !cantidad || !fechaInicio || !fechaEntrega || !descripcionGeneral) {
      setRespuestas('<p>Por favor, completa todos los campos.</p>');
      return;
    }

    for (let i = 0; i < cantidad; i++) {
      if (!especialidades[i]?.trim()) {
        setRespuestas(`<p>Falta la especialidad del trabajador ${i + 1}.</p>`);
        return;
      }
    }

    const especialidadesTexto = especialidades
      .map((esp, i) => `Trabajador ${i + 1}: ${esp.trim()}`)
      .join(', ');

    const preguntaGenerada = `Tengo un proyecto del tipo "${tipoProyecto}" con ${cantidad} trabajadores. La fecha de inicio es el ${fechaInicio} y la de entrega es el ${fechaEntrega}. Las especialidades de los trabajadores son: ${especialidadesTexto}. La descripción del proyecto es: "${descripcionGeneral}".\n
Por favor, responde usando los siguientes títulos EXACTAMENTE como te los doy y sepáralos claramente cada uno con un salto de línea, dos puntos ":" al final del título, y luego el contenido. No combines apartados. Utiliza este orden y formato literal:\n
Etapas de desarrollo:
Roles del equipo:
Carga de trabajo:
Porcentaje de carga de cada trabajador:
Presupuesto:
porcentaje de presupuesto:
Riesgos detectados:
Porcentaje de probabilidad de cada riesgo:
Cómo mitigar los riesgos:
Herramientas y Metodologías:\n
Es muy importante que uses esos títulos tal cual, sin cambiarlos, sin comillas, sin signos extra, y cada uno separado en bloques claramente. Usa porcentajes numéricos como 80% en lugar de texto y no pongas caracteres especiales en el texto como el *, en el presupuesto no pongas el porcentaje de presupuesto, solo el presupuesto, solo el completo, no un aproximado entre tal y tal, que sea solamente el presupuesto y en pesos chilenos.
ademas necesito que me des del apartado "Riesgos detectados""Cómo mitigar los riesgos" me des 10 de cada uno, cada trabajador aunque sean la cantidad que sea iguales me los des todos por separado\n`;

    setRespuestas('<p><em>Pensando...</em></p>');

    try {
      const response = await fetch('http://localhost:3000/preguntar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: preguntaGenerada })
      });
      const data = await response.json();
      if (data.respuesta) {
        setRespuestaCompleta(data.respuesta);
        mostrarRespuestasPorCategoria(data.respuesta);
      } else {
        setRespuestas('<p>No se pudo obtener una respuesta.</p>');
      }
    } catch (error) {
      console.error('Error:', error);
      setRespuestas('<p>Error al conectar con el servidor.</p>');
    }
  };

  const mostrarRespuestasPorCategoria = (respuestaCompleta) => {
    const titulosEsperados = {
      "Porcentaje de carga de cada trabajador": "porcentajeCarga",
      "porcentaje de presupuesto": "distribucionPresupuesto",
      "Porcentaje de probabilidad de cada riesgo": "porcentajeRiesgo",
      "Cómo mitigar los riesgos": "mitigacionRiesgos",
      "Riesgos detectados": "riesgosDetectados",
      "Presupuesto": "presupuesto"
    };

    const apartados = {};
    const regex = new RegExp(
      `(${Object.keys(titulosEsperados).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}):`,
      'gi'
    );

    const secciones = respuestaCompleta.split(regex).filter(Boolean);

    for (let i = 0; i < secciones.length; i++) {
      const titulo = secciones[i].trim();
      const contenido = secciones[i + 1]?.trim();
      if (titulosEsperados[titulo]) {
        apartados[titulosEsperados[titulo]] = contenido;
        i++;
      }
    }

    const parsePorcentaje = (text) => {
      const lineas = text.split('\n').filter(Boolean);
      return lineas.map((linea, idx) => {
        const match = linea.match(/(.+?):\s*(\d+)%/);
        return match ? { nombre: match[1].trim(), valor: parseInt(match[2]) } : null;
      }).filter(Boolean);
    };

    const parseLista = (text) => {
      return text.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+\.\s*/, '').trim());
    };

    const parsePresupuesto = (text) => {
      const match = text.match(/[\d.,]+/);
      if (match) {
        const numero = match[0].replace(/[.,]/g, '');
        return parseInt(numero);
      }
      return 0;
    };

    const parseDistribucionPresupuesto = (text) => {
      if (!text) return [];
      console.log('Texto de distribución de presupuesto:', text);
      const lineas = text.split('\n').filter(Boolean);
      console.log('Líneas separadas:', lineas);
      const resultado = lineas.map(linea => {
        console.log('Procesando línea:', linea);
        // Intentar diferentes patrones de coincidencia
        const match1 = linea.match(/(.+?):\s*(\d+)%/);
        const match2 = linea.match(/(.+?)\s*-\s*(\d+)%/);
        const match3 = linea.match(/(.+?)\s*(\d+)%/);
        
        const match = match1 || match2 || match3;
        if (match) {
          const resultado = {
            nombre: match[1].trim(),
            valor: parseInt(match[2])
          };
          console.log('Resultado procesado:', resultado);
          return resultado;
        }
        console.log('No se encontró coincidencia para:', linea);
        return null;
      }).filter(Boolean);
      console.log('Resultado final:', resultado);
      return resultado;
    };

    const cargaTrabajo = apartados.porcentajeCarga ? parsePorcentaje(apartados.porcentajeCarga) : [];
    const presupuesto = apartados.presupuesto ? parsePresupuesto(apartados.presupuesto) : 0;
    const distribucionPresupuesto = apartados.distribucionPresupuesto ? parseDistribucionPresupuesto(apartados.distribucionPresupuesto) : [];
    const porcentajeRiesgo = apartados.porcentajeRiesgo ? parsePorcentaje(apartados.porcentajeRiesgo) : [];
    const mitigacionRiesgos = apartados.mitigacionRiesgos ? parseLista(apartados.mitigacionRiesgos) : [];
    const riesgosDetectados = apartados.riesgosDetectados ? parseLista(apartados.riesgosDetectados) : [];

    console.log('Apartados encontrados:', apartados);
    console.log('Distribución de presupuesto procesada:', distribucionPresupuesto);

    setGraficoData({ 
      cargaTrabajo, 
      presupuesto,
      distribucionPresupuesto,
      porcentajeRiesgo,
      mitigacionRiesgos,
      riesgosDetectados
    });
    setRespuestas('<p>Respuestas procesadas y listas.</p>');
  };

  const handleVerGraficos = () => {
    navigate('/graficos', {
      state: {
        tipoProyecto,
        cantidadTrabajadores,
        fechaInicio,
        fechaEntrega,
        descripcionGeneral,
        especialidades,
        respuestas,
        respuestaCompleta,
        graficoData
      }
    });
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ textAlign: 'center' }}>CoffeeBreakIA</h1>

      <label>Tipo de proyecto:</label>
      <input type="text" value={tipoProyecto} onChange={(e) => setTipoProyecto(e.target.value)} style={inputStyle} />

      <label>Cantidad de trabajadores:</label>
      <input type="number" value={cantidadTrabajadores} onChange={(e) => setCantidadTrabajadores(e.target.value)} style={inputStyle} />

      <div id="especialidadesContainer">
        {especialidades.map((esp, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Especialidad del trabajador ${index + 1}`}
            value={esp}
            onChange={(e) => handleEspecialidadChange(index, e.target.value)}
            style={inputStyle}
          />
        ))}
      </div>

      <label>Fecha de inicio:</label>
      <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} style={inputStyle} />

      <label>Fecha de entrega:</label>
      <input type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} style={inputStyle} />

      <label>Descripción general:</label>
      <textarea value={descripcionGeneral} onChange={(e) => setDescripcionGeneral(e.target.value)} rows="4" style={inputStyle} />

      <button onClick={enviarDatos} style={inputStyle}>Enviar a la IA</button>

      <div dangerouslySetInnerHTML={{ __html: respuestas }} style={{ marginTop: '20px' }} />
      {respuestaCompleta && <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: '10px' }}>{respuestaCompleta}</pre>}

      {graficoData.cargaTrabajo.length > 0 && (
        <button 
          onClick={handleVerGraficos}
          style={{...inputStyle, backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer'}}
        >
          Ver Gráficos
        </button>
      )}
    </div>
  );
};

const App = () => {
  const [graficoData, setGraficoData] = useState({
    cargaTrabajo: [],
    porcentajePresupuesto: [],
    porcentajeRiesgo: [],
    mitigacionRiesgos: [],
    riesgosDetectados: []
  });

  const [formData, setFormData] = useState({
    tipoProyecto: '',
    cantidadTrabajadores: '',
    fechaInicio: '',
    fechaEntrega: '',
    descripcionGeneral: '',
    especialidades: [],
    respuestas: '',
    respuestaCompleta: ''
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<PricingPlans />} />
        <Route 
          path="/dashboard" 
          element={<CoffeeBreakIA 
            graficoData={graficoData} 
            setGraficoData={setGraficoData}
            formData={formData}
            setFormData={setFormData}
          />} 
        />
        <Route path="/graficos" element={<Graficos />} />
      </Routes>
    </Router>
  );
};

const inputStyle = {
  display: 'block',
  margin: '10px auto',
  padding: '8px',
  width: '100%',
  maxWidth: '400px',
  fontSize: '16px'
};

export default App;