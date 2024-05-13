import logo from '../images/LOGOTEC.png'
import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const Header = () => {
  const [activeTab, setActiveTab] = useState('equipo');
  const tabClasses = (tab) => 
    `px-3 py-2 text-white font-thin ${activeTab === tab 
      ? 'border-b-2 border-white' // Add padding-bottom to lift the text up a bit
      : 'hover:text-white hover:border-white hover:border-b-2'}`;

  return (
    <header className="bg-[#29364E] h-70 border-solid border-b-2 border-[#D9D9D9]">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <img src={logo} alt="TEC Logo" className="h-6 mr-4" />
          <nav className="flex">
            <Link className='text-white pl-4' to={'/ProfesorGuiaCoordinador/EquipoDeTrabajo'}>
              Equipo de trabajo
            </Link>
            <Link className='text-white pl-4' to={'/ProfesorGuiaCoordinador/Estudiantes'}>
              Estudiantes
            </Link>
            <Link className='text-white pl-4' to={'/ProfesorGuiaCoordinador/PlanDeTrabajo'}>
              PlanDeTrabajo
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center">
          <a href="/">
            <button className="bg-[#ffffff] px-3 py-2 rounded-full text-sm">Cerrar sesión</button>
          </a>
        </div>
      </div>
    </header>
    
  );
};

export default Header;
