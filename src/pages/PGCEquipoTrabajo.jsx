import React from 'react'
import {useState, useEffect} from 'react'
import Header from '../components/HeaderProfesorGuiaCoord.jsx'
import { Link } from 'react-router-dom';
import '../../styles.css'
import axios from 'axios'

const EquipoTrabajo = () => {
  const [teamwork, setTeamwork] = useState([])
  const [loadingTeam, setLoadingTeam] = useState(false)
  
  useEffect(() => {
    setLoadingTeam(true)
    try{
      axios.get('https://tecportfolio-api.onrender.com/AsistenteAdministrativo/EquipoTrabajo').then((response) => {  
        setTeamwork(response.data)
        setLoadingTeam(false)
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
        setLoadingTeam(false)
      })

    }catch(error){
      setLoadingTeam(false)
    }
  }, [])

  return (
    <div>
    <Header />
        <div className="min-h-screen bg-[#29364E] text-white">
          <div className='flex'>
            {/* Left Column for Team Members */}
            <div className="flex w-1/2 p-4">
              {/* Left Column for Team Members */}
              <div className='w-[575px] p-4'>
                <h2 className="font-bold text-lg mb-4">Integrantes del equipo</h2>
                {/* Repeat this block for each team member */}
                <div className="custom-scrollbar bg-[#29364E] rounded-[16px] mb-3 overflow-auto h-[400px] px-5 border-2 border-[#061634] scrollbar-webkit scrollbar-thin"> {/* Scrollbar appears if content exceeds 24rem/96px */}
                  {loadingTeam ? (
                        <div>
                          
                        </div>
                      ):(
                        <div>
                        {teamwork.map((prof) => (
                          <div className='flex items-center pl-5 pr-4 py-4 bg-[#061634] rounded-[16px] my-3'>
                            <div className="flex-grow flex items-center justify-between ml-4">
                              <p className="text-white text-sm">{`${prof.name} ${prof.isCoord ? ("- Coordinador") : ("")} - ${prof.teacherID}`}</p>
                              <div>
                                <Link to={`/ProfesorGuiaCoordinador/VerDetalles/${prof._id}`}>Ver Detalles</Link>
                              </div>
                            </div>
                          </div> 
                        ))}
                        </div>      
                    )}
                </div>
              </div>
              
              {/* Right Column for Additional Content */}
            </div>
          </div>
        </div>
      </div>






  )
}

export default EquipoTrabajo




