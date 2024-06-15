import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderStudent'
import axios from 'axios'
import dayjs from "dayjs";
import { generateDate, months } from "../util/calendar.js";
import cn from "../util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
    isSameDay,
    parseISO,
  } from 'date-fns'


const ActivityCalendar = () => {
    const [activities, setActivities] = useState([])
    const [nextActivity, setNext] = useState({})
    const systemDate = JSON.parse(localStorage.getItem('systemDate')) || { systemDate: new Date().toISOString().split('T')[0] };
    const currentDate = dayjs(systemDate.systemDate);
    const days = ["S", "M", "T", "W", "T", "F", "S"];
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);

function isTheSameDay (date1, date2){
    return new Date(date1).toLocaleDateString() === new Date(date2).toLocaleDateString()
}

useEffect(() => {
    setToday(currentDate);
    setSelectDate(currentDate);
    axios.get(`${import.meta.env.VITE_API}/ProfesorGuiaCoordinador/ListaActividades`).then((response) => {
        const actividadesOrdenadasDesc = response.data.sort((b, a) => {
            const fechaA = new Date(a.fecha);
            const fechaB = new Date(b.fecha);
            return fechaB - fechaA;
        });
        setActivities(actividadesOrdenadasDesc);

        for (let index = 0; index < actividadesOrdenadasDesc.length; index++) {
            if (new Date(actividadesOrdenadasDesc[index].fecha).getTime() >= new Date(systemDate.systemDate).getTime()) {
                setNext(actividadesOrdenadasDesc[index]);
                return;
            }
        }
    });
}, []);

  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-[#29364E] text-white'>
            <div className='flex p-10'>
                <div className='w-1/2 px-5'>
                    <div className='px-5 pb-5'>
                        <p>Actividades</p>
                    </div>
                    <div className='border-2 rounded-[16px] border-[#061634] h-[655px]'>
                        <div className="p-5 flex gap-10 sm:divide-x justify-center mx-auto items-center sm:flex-row flex-col">
                            <div className="w-full h-96 ">
                                <div className="flex justify-between items-center">
                                    <h1 className="select-none font-semibold">
                                        {months[today.month()]}, {today.year()}
                                    </h1>
                                    <div className="flex gap-10 items-center ">
                                        <GrFormPrevious
                                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                            onClick={() => {
                                                setToday(today.month(today.month() - 1));
                                            }}
                                        />
                                        <h1
                                            className=" cursor-pointer hover:scale-105 transition-all"
                                            onClick={() => {
                                                setToday(currentDate);
                                            }}
                                        >
                                            Today
                                        </h1>
                                        <GrFormNext
                                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                            onClick={() => {
                                                setToday(today.month(today.month() + 1));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 ">
                                    {days.map((day, index) => {
                                        return (
                                            <h1
                                                key={index}
                                                className="text-sm font-bold text-white text-center h-14 w-14 grid place-content-center select-none"
                                            >
                                                {day}
                                            </h1>
                                        );
                                    })}
                                </div>

                                <div className=" grid grid-cols-7 ">
                                    {generateDate(today.month(), today.year()).map(
                                        ({ date, currentMonth, today }, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                                                >
                                                    <h1
                                                        className={cn(
                                                            currentMonth ? "" : "text-gray-400",
                                                            currentDate.toDate()
                                                            .toDateString() ===
                                                            date.toDate().toDateString()
                                                                ? "bg-red-600 text-white"
                                                                : "",
                                                            selectDate
                                                                .toDate()
                                                                .toDateString() ===
                                                                date.toDate().toDateString()
                                                                ? "bg-black text-white"
                                                                : "",
                                                            "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                                                        )}
                                                        onClick={() => {
                                                            setSelectDate(date);console.log(date);
                                                        }}
                                                    >
                                                        {date.date()}
                                                    </h1>
                                                    
                                                    {activities.some((act) => isTheSameDay(act.fecha, date)) && (
                                                        <div className='flex items-center justify-center'>
                                                            <div className=' w-1 h-1 rounded-full bg-white'>
                                                            </div>
                                                        </div>  
                                                    )}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            <div className="h-96 w-96 sm:px-5">
                                <h1 className=" font-semibold">
                                    Evento el dia {selectDate.toDate().toDateString()}
                                </h1>
                                <div>
                                
                                {activities.map((act) => {
                                    
                                    return isTheSameDay(act.fecha, selectDate) ? (
                                        <div>
                                            <p className="text-gray-400">{act.nombre}</p>
                                            <img src={act.afiche}></img>
                                        </div>
                                    ): null
                                })}
                                {activities.every(act => !isTheSameDay(act.fecha, selectDate)) && (
                                    <p className="text-gray-400">No hay eventos para hoy.</p>
                                )}
                                </div>
                            </div>
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