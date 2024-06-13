import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderStudent'
import axios from 'axios'

const ActivityCalendar = () => {
    const [activities, setActivities] = useState([])
    const [nextActivity, setNext] = useState({})
useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API}/ProfesorGuiaCoordinador/ListaActividades`).then((response)=>{
        console.log(response)
        const actividadesOrdenadasDesc = response.data.sort((b, a) => {
            const fechaA = new Date(a.fecha);
            const fechaB = new Date(b.fecha);
            return fechaB - fechaA;
        });
        setActivities(actividadesOrdenadasDesc)
        setNext(actividadesOrdenadasDesc[0])
    })
},[])

  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-[#29364E] text-white'>
            <div className='flex p-10'>
                <div className='w-1/2 px-5'>
                    <div className='px-5 pb-5'>
                        <p>Actividades</p>
                    </div>
                    <div className='border-2 rounded-[16px] border-[#061634]'>
                        <div className='p-2 overflow-auto custom-scrollbar h-[655px]'>
                            {activities && activities.map((activity)=>(
                                <div className='py-2'> 
                                    <div className='p-3 bg-[#061634] rounded-[12px] flex items-center'>
                                        <p>{activity.nombre} {activity.tipo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-1/2 px-5'>
                    <div className='px-5 pb-5'>
                        <p>Proxima Actividad</p>
                    </div>
                    <div className='border-2 rounded-[16px] border-[#061634] h-[655px] flex'>
                        <div className='w-1/2 flex items-center pl-4'>
                            <img src={nextActivity.afiche} className=" rounded-[12px] object-cover w-[428px] h-[589px]" alt='Afiche evento'></img>
                        </div>
                        <div className='pt-3 pl-2'>
                            <div className='flex p-2 h-[42px]'>
                                <div>
                                    <p>Nombre: </p>
                                </div>
                                <div className='pl-2'>
                                    <p>{nextActivity.nombre}</p>
                                </div>
                            </div>
                            <div className='flex p-2 h-[42px]'>
                                <div>
                                    <p>Tipo: </p>
                                </div>
                                <div className='pl-2'>
                                    <p>{nextActivity.tipo}</p>
                                </div>
                            </div>
                            <div className='flex p-2 h-[42px]'>
                                <div>
                                    <p>Semana: </p>
                                </div>
                                <div className='pl-2'>
                                    <p>{nextActivity.semana}</p>
                                </div>
                            </div>
                            <div className='flex p-2 h-[42px]'>
                                <div>
                                    <p>Fecha: </p>
                                </div>
                                <div className='pl-2'>
                                    <p>{new Date(nextActivity.fecha).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className='flex p-2 h-[42px]'>
                                <div>
                                    <p>hora: </p>
                                </div>
                                <div className='pl-2'>
                                    <p>{nextActivity.hora}</p>
                                </div>
                            </div>
                            <div className='flex p-2 h-[42px]'>
                                <div>
                                    <p>Modalidad: </p>
                                </div>
                                <div className='pl-2'>
                                    <p>{nextActivity.modalidad}</p>
                                </div>
                            </div>
                            <div className='flex p-2 h-[42px]'>
                                <div>
                                    <p>Enlace: </p>
                                </div>
                                <div className='pl-2'>
                                    <p>{nextActivity.enlaceReunion}</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default ActivityCalendar