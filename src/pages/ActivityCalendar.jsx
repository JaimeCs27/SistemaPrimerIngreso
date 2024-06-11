import React from 'react'
import Header from '../components/HeaderStudent'


const ActivityCalendar = () => {
  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-[#29364E] text-white'>
            <div className='flex p-10'>
                <div className='w-1/2'>
                    <div className='px-5'>
                        <p>Actividades</p>
                    </div>
                    <div className='border-2 border-[#061634] h-[655px]'>

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