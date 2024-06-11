import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderStudent'
import axios from 'axios'

const ActivityCalendar = () => {
    const [activities, setActivities] = useState([])

useEffect(()=>{
    const act = [
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"},
        {name: "hola", tipo: "arroz con pollo"}
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
                    <div className='border-2 rounded-[16px] border-[#061634] h-[655px]'>
                        <div className='p-2'>
                            {activities && activities.map((activity)=>(
                                <div className='p-3 bg-[#061634] rounded-[12px] flex items-center'>
                                    <p>{activity.name} {activity.tipo}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ActivityCalendar