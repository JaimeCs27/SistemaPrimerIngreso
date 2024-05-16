import React, {useState, useEffect} from 'react'
import Header from "../components/HeaderAACartago"
import '../../styles.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

const AACPlanDeTrabajo = () => {
    const [loadingActivities, setLoadingActivities] = useState(false)
    const [activitiesList, setActivities] = useState([])

    useEffect(() => {
        setLoadingActivities(true)
        try{
            axios.get('https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/ListaActividades').then((response) => {  
            setActivities(response.data)
            console.log(response.data)
            setLoadingActivities(false)
            }).catch((error) => {
            console.log(error)
            setLoadingActivities(false)
            })

        }catch(error){
            console.log(error)
            setLoadingActivities(false)
        }
    }, [])

    return (
      <div>
        <Header />
            <div className='min-h-screen bg-[#29364E] text-white flex'>
                <div className='flex flex-col w-[50%]'>
                    <h2 className='font=semibold text-2xl mt-10 ml-20'>Lista De Actividades:</h2> 
                        <div className='p-10 font=semibold rounded-xl shadow-lg ring-2 ring-[#081434] m-10 space-y-5'>
                            {loadingActivities ? (
                                        <div>
                                        </div>
                                    ):(
                                        <div>
                                        {activitiesList.map((activity) => (
                                            <div className='py-2'>
                                            <Link to={`/AsistenteAdministrativoCartago/PlanDeTrabajo/VerDetalles/${activity._id}`}>
                                            <a class="bg-[#081434] hover:bg-[#212c48] p-7 rounded-xl flex justify-between items-center">
                                                <span class="text-white font-semibold">{`${activity.nombre}`}</span>
                                                <span class="text-white font-semibold">{`${activity.tipo}`}</span>
                                                <span class="text-white font-bold">{`${activity.estado}`}</span>
                                            </a>
                                            </Link>
                                            </div>
                                        ))}
                                        </div>  
                                )}
                        </div>
                </div>
                <div className='flex flex-col w-[50%]'>
                    <h2 className='font=semibold text-2xl mt-10 ml-20'>Proxima Actividad:</h2>
                        <div className='p-10 font=semibold rounded-xl shadow-lg ring-2 ring-[#081434] m-10 space-y-5'>
                            <a class="bg-[#081434] hover:bg-[#212c48] p-7 rounded-xl flex justify-between items-center">
                                <span class="text-white font-semibold">Nombre de la actividad</span>
                                <span class="text-white font-semibold">Tipo de Actividad</span>
                                <span class="text-white font-bold">Estado</span>
                            </a>
                        </div>
                </div>
            </div>
      </div>
    )
  }

  export default AACPlanDeTrabajo
