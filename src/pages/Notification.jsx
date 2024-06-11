import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderStudent'
import basurero from '../images/basurero.png'


const Notification = () => {

    const [buzon, setBuzon] = useState([])

    useEffect(()=>{
        const mensaje = [
            {mensaje: "hola mundo"}
        ]
        setBuzon(mensaje)
    }, [])

  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-[#29364E] text-white'>
            <div className='flex p-10'>
                <div className='w-1/2 px-5'>
                    <div className='px-5 pb-5'>
                        <p>Buzon de entrada</p>
                        <div className="flex space-x-2 items-center mb-4">
                            <div className='py-3'>
                                <select name='buzon' class="bg-white w-[185px] h-[30px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                    <option>Leído</option>
                                    <option>No leído</option>
                                    <option selected>Todos</option>
                                </select>
                            </div>
                            <div className="py-3">
                                <button className="bg-[#ffffff] w-[157px] h-[30px] text-[#061931] py-2 px-6 rounded-[10px]">
                                    Aplicar filtros
                                </button>
                            </div>
                        </div>                        
                    </div>
                    <div className='border-2 rounded-[16px] border-[#061634]'>
                        <div className='p-2 overflow-auto custom-scrollbar h-[655px]'>
                            {buzon ? (
                                <div>
                                
                                {buzon.map((noti)=>(
                                    <div className='py-2'> 
                                        <div className='flex p-1'>
                                            <div className='pr-4'>
                                                <p>Sistema</p>
                                            </div>
                                            <div>
                                                <p>xx/xx/xxxx    xx:xx</p>
                                            </div>
                                        </div>
                                        <div className='p-3 bg-[#061634] rounded-[12px] flex items-center'>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <p>{noti.mensaje}</p>

                                                </div>
                                                <div className='flex justify-end w-full'>
                                                    <img src={basurero} ></img>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                
                            ) : (
                                <div className='p-4'>
                                    No se encontraron mensajes nuevos
                                </div>
                                
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification