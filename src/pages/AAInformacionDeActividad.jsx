import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderAA.jsx'
import flecha from '../images/Flecha.png'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
import '../../styles.css'

const AAInformacionDeActividad = () => {
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const [nombreActividad, setNombreActividad] = useState("");
    const [semana, setSemana]= useState("");  
    const [tipo, setTipo] = useState("");
    const [afiche, setAfiche] = useState("");
    const [diasRestantes, setDiasRestante] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [modalidad, setModalidad] = useState(""); 
    const [estado, setEstado] = useState("");
    const [enlace, setEnlace] = useState("");
    const [responsables, setResponsables] = useState([]); 
    const [recordatorios, setRecordatorios] = useState([]);



 

    const calculateDaysUntil = (date) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        let targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        let difference = targetDate - today;
        let days = Math.ceil(difference / (1000 * 60 * 60 * 24));

        return days;
    };


    const formatDate = (dateInput) => {
        const date = new Date(dateInput); // Asegura que dateInput se convierta a un objeto Date
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() retorna 0 para enero, 1 para febrero, etc.
        const day = date.getDate();
    
        // Añadir un cero al inicio si el mes o día es menor a 10
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
    
        return `${year}-${formattedMonth}-${formattedDay}`;
      };

    useEffect(()=>{
        setLoading(true)
        let listId = {}
        axios.get(`https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/Actividad/${id}`).then((response) => {
            setNombreActividad(response.data.nombre)
            setEstado(response.data.estado)
            setSemana(response.data.semana)
            setTipo(response.data.tipo)
            setAfiche(response.data.afiche)
            let fecha = new Date(response.data.fecha)
            setFecha(fecha.toLocaleDateString())
            setHora(response.data.hora)
            setModalidad(response.data.modalidad)
            setEnlace(response.data.enlaceReunion)
            listId={list: response.data.responsables}
            const list = []
            response.data.recordatorios.forEach((recordatorio) => {
                list.push(formatDate(recordatorio))
            })
            setRecordatorios(list)
            let days = calculateDaysUntil(response.data.fecha);
            setDiasRestante(days);
        }).then(()=> {
            axios.post(`https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/Responsables`, {
                listId
            }).then((response)=>{
                setResponsables(response.data)
                setLoading(false)
            })
        })
    }, [])

    return (
        <div>
            <Header/>
            <div className='min-h-screen bg-[#29364E] text-white'>
                <div className='p-10'>
                    <h3 className=''>{nombreActividad}</h3>
                    <h3 className='pb-5'>Estado de la actividad: {estado}</h3>
                    <div className='p-7 rounded-[12px] border-2 border-[#061634]'> {/* Contenedor de todo */}
                        <div className='flex'>
                            <div className='w-1/2'>
                                <div>
                                    <div className='flex'>
                                        <div className='pr-3 flex-none'>
                                            <h3 className='pb-2'>Semana</h3>
                                            <input value={semana} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none"/>
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className='pb-2'>Tipo</h3>
                                            <input value={tipo} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none"/>
                                        </div>
                                        <div className='px-3 flex-none'>
                                            <h3 className='pb-2'>Dias Restantes</h3>
                                            <input value={diasRestantes} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none"/>
                                        </div>
                                    </div>
                                    <div className='flex pt-3'>
                                    <div className='pr-3 flex-none'>
                                            <h3 className='pb-2'>Fecha</h3>
                                            <input value={fecha} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none"/>
                                        </div>
                                        <div className='flex-none'>
                                            <h3 className='pb-2'>Hora</h3>
                                            <input value={hora} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none"/>
                                        </div>
                                        <div className='px-3 flex-1'>
                                            <h3 className='pb-2'>Modalidad</h3>
                                            <input value={modalidad} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none"/>
                                        </div>
                                    </div>
                                    <div className='pt-3'>
                                        {modalidad === 'Presencial' ? (
                                                <div/>
                                            ): (
                                                <div className='pr-3'>
                                                    <h3 className='pb-2'>Enlace de la reunion</h3>
                                                    <input value={enlace} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none"/>
                                                </div>
                                        )}
                                    </div>
                                </div>
                                <div className='flex pt-4 pr-3'>
                                    <div className='p-3 rounded-[12px] border-2 border-[#061634] w-1/2'>
                                        Responsables
                                        <div className='custom-scrollbar overflow-auto scrollbar-webkit scrollbar-thin h-[350px]'>
                                            {loading? (
                                                <div>
                                                    </div>
                                            ) : (
                                                <div>
                                                    {responsables.map((responsable)=>(
                                                        <div className='flex bg-[#061634] p-2 rounded-[10px] my-2'>
                                                            <div className="flex-grow flex items-center justify-between ml-3">
                                                                <p className="text-white text-sm">{responsable.name} {responsable.secondName} {responsable.lastName} {responsable.secondLastName}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='p-3 rounded-[12px] border-2 border-[#061634] w-1/2'>
                                        Recordatorios
                                        <div className='custom-scrollbar overflow-auto scrollbar-webkit scrollbar-thin h-[350px]'>
                                            {loading ? (
                                                <div/>
                                            ) : (
                                                <div>
                                                    {recordatorios.map((recordatorio) => (
                                                        <div className='flex pb-2 w-[175px]'>
                                                            <input value={recordatorio} name='Fecha_recordatorio' type='date' className='p-2 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none' readOnly></input>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2 p-10 rounded-[12px] border-2 border-[#061634]'>
                                <img src={afiche} alt="Imagen no encontrada" className="w-full h-full object-cover"></img>
                            </div>
                        </div>
                        <div className='pt-5'> {/* evidencias*/}
                            <h3 className=''>Evidencias</h3>
                            <div>
                                <div className='custom-scrollbar overflow-auto scrollbar-webkit scrollbar-thin'>
                                    {loading ? (
                                        <div/>
                                    ) : (
                                        <div>
                                            {evidencias.map((evidencia) => (
                                                <div className='pt-3'>
                                                    <input value={evidencia} type="input" class="p-2.5 w-1/2 z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none"/>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='pt-10'>
                            <div className='px-[350px]'> {/* Comentar */}
                                <h3 className='pb-3'>Comentarios y observaciones</h3>
                                <div className='flex justify-center items-center'>
                                    <textarea onChange={(e)=>setComment(e.target.value)} rows="5" class="w-full rounded-[10px] p-2.5 text-black focus:outline-none" placeholder='Agregar Comentario'/>
                                </div>
                                <div className='flex justify-end pt-3'>
                                    <button onClick={handleComment} className='mx-2 bg-[#ffffff] text-[#061931] py-1 px-4 rounded-[10px]'>Comentar</button>
                                </div>
                            </div>
                            <div className='px-[350px] pt-4'> {/* Comentarios */}
                                <div>
                                    {loading ? (
                                        <div>
                                            </div>
                                    ) : (
                                        comentarios.map((comentario) => (
                                            <div>
                                                    <div>
                                                        <h3 className='pb-3'>{comentario.profesor} - {comentario.fecha}</h3>
                                                        <div className='flex justify-center items-center'>
                                                            <textarea value={comentario.comentario} rows="3" class=" bg-[#061634] w-full rounded-[10px] p-2.5 text-white focus:outline-none" readOnly/>
                                                        </div>
                                                        <div className='flex justify-end pt-3'>
                                                            <button onClick={() => handleOpenResponse(comentario._id)} className='mx-2 bg-[#ffffff] text-[#061931] py-1 px-4 rounded-[10px]'>Responder</button>
                                                        </div>
                                                        
                                                    </div>
                                                    <div>
                                                        
                                                        {responder && comentario._id === idComment ? (
                                                            <div className='pt-3 pl-7'>
                                                                <div className='flex'>
                                                                    <div className='pt-4'>
                                                                        <img src={flecha} className="h-10 mr-4"></img>
                                                                    </div>
                                                                    <div className='flex-1'>
                                                                        <div className='flex justify-center items-center'>
                                                                            <textarea onChange={(e)=>setRespuesta(e.target.value)} rows="2" className="w-full rounded-[10px] p-2.5 text-black focus:outline-none"/>
                                                                        </div>
                                                                        <div className='flex justify-end pt-3'>
                                                                            <button onClick={()=>handleResponse(comentario._id)} className='mx-2 bg-[#ffffff] text-[#061931] py-1 px-4 rounded-[10px]'>Comentar</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div/>
                                                        )}
                                                        {comentario.respuestas.map((respuesta)=> (
                                                            <div className='pt-3 pl-7'>
                                                                <h3 className='pb-3 pl-12'>{comentario.profesor} - {comentario.fecha}</h3>
                                                                <div className='flex'>
                                                                    <div className='pt-3'>
                                                                        <img src={flecha} className="h-10 mr-4"></img>
                                                                    </div>
                                                                    <div className='flex-1'>
                                                                        <div className='flex justify-center items-center'>
                                                                            <textarea value={respuesta.respuesta}  rows="2" className="w-full bg-[#061634] rounded-[10px] p-2.5 text-white focus:outline-none" readOnly/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                        ))
                                    )}
                                    
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
  }

  export default AAInformacionDeActividad

