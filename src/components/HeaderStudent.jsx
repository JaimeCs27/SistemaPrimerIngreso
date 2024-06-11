import logo from '../images/LOGOTEC.png'
import bell from '../images/bell.png'
import bellNoti from '../images/bell-noti.png'
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const HeaderStudent = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('equipo');

  const handlePerfil = () =>{
    const us = JSON.parse(localStorage.getItem('user'))
    navigate(`/Estudiantes/MiPerfil`)
  }

  return (
    <header className="bg-[#29364E] h-70 border-solid border-b-2 border-[#D9D9D9]">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <img src={logo} alt="TEC Logo" className="h-6 mr-4" />
          <nav className="flex">
            <Link className='text-white pl-4' to={'/Estudiantes/Calendario'}>
              <p>Calendario de Actividades</p>
            </Link>
          </nav>
        </div>
        
        <div className="flex p-2 items-center">
          <div className='pr-2'>
            <Link to={'/Estudiantes/Buzon'}><img src={bell} className='h-[24px] w-[24px]'></img></Link>
          </div>
          <button onClick={handlePerfil} className="bg-[#ffffff] hover:bg-blue-600 px-3 py-2 rounded-full text-sm">Perfil</button>
        </div>
      </div>
    </header>
    
  );
};

export default HeaderStudent;
