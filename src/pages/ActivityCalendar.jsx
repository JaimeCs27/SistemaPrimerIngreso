import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderStudent'
import axios from 'axios'

const ActivityCalendar = () => {
    const [activities, setActivities] = useState([])
    const [nextActivity, setNext] = useState({})
useEffect(()=>{
    const act = [
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
    ]
    setActivities(act)
},[])

  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-[#29364E] text-white'>
            <div className='flex p-10'>
                <div className='w-1/2'>
                    <div className='px-5 pb-5'>
                        <p>Actividades</p>
                    </div>
                    <div className='border-2 rounded-[16px] border-[#061634]'>
                        <div className='p-2 overflow-auto custom-scrollbar h-[655px]'>
                            {activities && activities.map((activity)=>(
                                <div className='py-2'> 
                                    <div className='p-3 bg-[#061634] rounded-[12px] flex items-center'>
                                        <p>{activity.name} {activity.tipo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='px-5 pb-5'>
                        <p>Proxima Actividad</p>
                    </div>
                    <div className='border-2 rounded-[16px] border-[#061634] h-[655px] flex'>
                        <div className='w-1/2'>
                            <img src='' alt='Afiche evento'></img>
                        </div>
                        <div>
                            <div className='flex p-2'>
                                <div>
                                    <p>Nombre: </p>
                                </div>
                                <div>
                                    <p>Aqui va el nombre</p>
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div>
                                    <p>Tipo: </p>
                                </div>
                                <div>
                                    <p>Aqui va el tipo</p>
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div>
                                    <p>Semana: </p>
                                </div>
                                <div>
                                    <p>Aqui va el semana</p>
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div>
                                    <p>Fecha: </p>
                                </div>
                                <div>
                                    <p>Aqui va el fehca</p>
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div>
                                    <p>hora: </p>
                                </div>
                                <div>
                                    <p>Aqui va el hora</p>
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div>
                                    <p>Modalidad: </p>
                                </div>
                                <div>
                                    <p>Aqui va el Modalidad</p>
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div>
                                    <p>Nombre: </p>
                                </div>
                                <div>
                                    <p>Aqui va el enlace</p>
                                </div>
                            </div>
                            <div className='flex p-2'>
                                
                            </div>
                            <div className='flex p-2'>
                                
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