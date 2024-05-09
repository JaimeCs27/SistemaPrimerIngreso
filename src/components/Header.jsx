import logo from '../images/LOGOTEC.png'
import React, { useState } from 'react';

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
            <a
              href="EquipoDeTrabajo"
              className={tabClasses('equipo')}
              onClick={() => setActiveTab('equipo')}
            >
              Equipo de trabajo
            </a>
            <a
              href="Estudiantes"
              className={tabClasses('estudiantes')}
              onClick={() => setActiveTab('estudiantes')}
            >
              Estudiantes
            </a>
            <a
              href="PlanDeTrabajo"
              className={tabClasses('plan')}
              onClick={() => setActiveTab('plan')}
            >
              Plan de trabajo
            </a>
          </nav>
        </div>
        
        <div className="flex items-center">
          <span className="mr-3 text-white">Sede: </span>
          <button className="bg-[#ffffff] hover:bg-blue-600 px-3 py-2 rounded-full text-sm">Perfil</button>
        </div>
      </div>
    </header>
    
  );
};

export default Header;
