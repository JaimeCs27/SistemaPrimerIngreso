import React, { useState, useEffect } from 'react';
import Header from '../components/HeaderStudent';
import basurero from '../images/basurero.png';
import eye from '../images/eye.png'
import eyeSlash from '../images/eye-slash.png'

import axios from 'axios'

const Notification = () => {
    const [buzon, setBuzon] = useState([]);
    const [selected, setSelected] = useState("Todos")

    // Función para convertir fecha y hora en un objeto Date
    function parseDateTime(fecha, hora) {
        const [month, day, year] = fecha.split('/');
        const [hours, minutes] = hora.split(':');
        return new Date(year, month - 1, day, hours, minutes);
    }

    // Función para ordenar la lista de eventos de forma descendente por fecha y hora
    function ordenarPorFecha(eventos) {
        return eventos.sort((a, b) => {
            const dateA = parseDateTime(a.date, a.hour);
            const dateB = parseDateTime(b.date, b.hour);
            return dateB - dateA; // Orden descendente
        });
    }
    useEffect(() => {
        const us = JSON.parse(localStorage.getItem('user'))
        axios.get(`${import.meta.env.VITE_API}/users/buzon/${us._id}`).then((response)=>{
            setBuzon(ordenarPorFecha(response.data));
        })
    }, []);

    const handleReadMessage = (noti) => {
        let aux = []
        buzon.map((n) => {
            if(n == noti){
                n["read"] = true
            }
            aux.push(n)
        })
        const us = JSON.parse(localStorage.getItem('user'))
        axios.post(`${import.meta.env.VITE_API}/users/uploadBuzon/${us._id}`,
            {
                aux
            }
        )
        setBuzon(ordenarPorFecha(aux))
    }

    const handleDeleteNoti = (noti) => {
        let aux = []
        buzon.map((n) => {
            if(n != noti){
                aux.push(n)
            }
        })
        const us = JSON.parse(localStorage.getItem('user'))
        axios.post(`${import.meta.env.VITE_API}/users/uploadBuzon/${us._id}`,
            {
                aux
            }
        )
        setBuzon(ordenarPorFecha(aux))
    }
    
    const handleFilters = () => {
        const us = JSON.parse(localStorage.getItem('user'))
        axios.get(`${import.meta.env.VITE_API}/users/filterBuzon/${us._id}?filter=${selected}`).then((response)=>{
            setBuzon(ordenarPorFecha(response.data))
        })
    }

    return (
        <div>
            <Header />
            <div className='min-h-screen bg-[#29364E] text-white'>
                <div className='flex p-10'>
                    <div className='w-1/2 px-5'>
                        <div className='px-5 pb-5'>
                            <p>Buzon de entrada</p>
                            <div className="flex space-x-2 items-center mb-4">
                                <div className='py-3'>
                                    <select onChange={(e)=>setSelected(e.target.value)} name='buzon' className="bg-white w-[185px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                        <option>Leído</option>
                                        <option>No leído</option>
                                        <option selected>Todos</option>
                                    </select>
                                </div>
                                <div className="py-3">
                                    <button onClick={handleFilters} className="bg-[#ffffff] w-[157px] h-[40px] text-[#061931] py-2 px-6 rounded-[10px]">
                                        Aplicar filtros
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='border-2 rounded-[16px] border-[#061634]'>
                            <div className='p-2 overflow-auto custom-scrollbar h-[655px]'>
                                {buzon.length > 0 ? (
                                    <div>
                                        {buzon.map((noti, index) => (

                                            <div key={index} className='py-2'>
                                                {noti.read ? (
                                                    <div>
                                                        <div className='flex p-1'>
                                                            <div className='pr-4'>
                                                                <p>{noti.author}:</p>
                                                            </div>
                                                            <div>
                                                                <p>{noti.date}    {noti.hour}</p>
                                                            </div>
                                                        </div>
                                                        <div className='p-3 bg-[#061634] rounded-[12px] flex justify-between items-center'>
                                                            <div className='flex-1 flex'>
                                                                <img src={eye} className='w-[16px] h-[16px] mt-1'></img><p className='pl-2'>{noti.message}</p>
                                                            </div>
                                                            <div className='flex-shrink-0'>
                                                                <img onClick={()=>handleDeleteNoti(noti)} src={basurero} className='w-[24px] h-[24px] cursor-pointer' alt='basurero' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ): (
                                                    <div>
                                                        <div className='flex p-1'>
                                                            <div className='pr-4'>
                                                                <p>{noti.author}:</p>
                                                            </div>
                                                            <div>
                                                                <p>{noti.date}    {noti.hour}</p>
                                                            </div>
                                                        </div>
                                                        <div className='cursor-pointer p-3 bg-[#1F2E49] rounded-[12px] flex justify-between items-center'>
                                                            <button onClick={()=>handleReadMessage(noti)} className='flex'>
                                                                <div className='flex-1 flex'>
                                                                    <img src={eyeSlash} className='w-[16px] h-[16px] mt-1'></img><p className='pl-2'>{noti.message}</p>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='p-4'>
                                        No se encontraron mensajes nuevos
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
