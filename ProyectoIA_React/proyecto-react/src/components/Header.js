import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importa los estilos del header

// Componente Header: muestra el nombre de la empresa y los botones de navegación
function Header() {
  return (
    <header className="header">
      {/* Nombre o logo de la empresa */}
      <div className="header-logo">
        Nuestra Empresa
      </div>
      {/* Botones de navegación */}
      <div className="header-buttons">
        <button className="header-btn">Iniciar sesión</button>
      </div>
      
    </header>
  );
}

export default Header;