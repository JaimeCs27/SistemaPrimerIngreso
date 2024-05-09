import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderAACartago.jsx'
import flecha from '../images/Flecha.png'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
import '../../styles.css'

const AACInformacionDeActividad = () => {
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
    const [evidencias, setEvidencias] = useState([]);
    const [comentarios, setComentarios] = useState([])
    const [responder, setResponder] = useState(false)
    const [comment, setComment] = useState('')
    const [respuesta, setRespuesta] = useState('')
    const [idComment, setIdComment] = useState('')



    const handleResponse = (idComentario) => {
        setResponder(false)
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        const date = new Date()
        axios.post(`https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/ResponderComentario/${id}`,{
            idComentario, user, date, respuesta
        }).then((response)=>{
            setComentarios(response.data)
            setLoading(false)
        }).catch((error) =>{
            setLoading(false)
        })
    }   


    const handleOpenResponse = (e) => {
        setIdComment(e)
        setResponder(true)
    }

    const calculateDaysUntil = (date) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        let targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        let difference = targetDate - today;
        let days = Math.ceil(difference / (1000 * 60 * 60 * 24));

        return days;
    };

    const handleComment = () =>{
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const date = new Date()
        axios.post(`https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/ComentarActividad/${id}`,{
            comment, user, date
        }).then((response)=>{
            setComentarios(response.data)
            setLoading(false)
        }).catch((erro) => {
            setLoading(false)
        })
    }

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
            setRecordatorios(response.data.recordatorios)
            setComentarios(response.data.comentarios)
            setEvidencias(response.data.evidencias)
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
                                        <div className='pr-3'>
                                            <h3 className='pb-2'>Enlace de la reunion</h3>
                                            <input value={enlace} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none"/>
                                        </div>
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
                                hola
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
  }

  export default AACInformacionDeActividad

