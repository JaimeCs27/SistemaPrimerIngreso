import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderProfesorGuiaCoord.jsx'
import basurero from '../images/basurero.png'
import axios from 'axios'
import { useParams } from 'react-router-dom';


const MDPlanDeTrabajo = () => {
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const [nombreActividad, setNombreActividad] = useState("");
    const [selection, setSelect] = useState('')
    const [selectionErase, setSelectErase] = useState("")
    const [selectionDate, setSelectDate] = useState("")
    const [selectionEvidencia, setSelectEvidencia] = useState("")
    const [semana, setSemana]= useState("");  
    const [tipo, setTipo] = useState("");
    const [afiche, setAfiche] = useState("");
    const [searchList, setSearchList] = useState([])
    const [searchName, setSearch] = useState('')
    const [fecha, setFecha] = useState(null);
    const [date, setDate] = useState(null);
    const [hora, setHora] = useState("");
    const [modalidad, setModalidad] = useState(""); 
    const [estado, setEstado] = useState("");
    const [estadoActual, setEstadoActual] = useState("");
    const [justificacion, setJustificacion] = useState("")
    const [enlace, setEnlace] = useState("");
    const [evidencia, setEvidencia] = useState('')
    const [responsables, setResponsables] = useState([]); 
    const [recordatorios, setRecordatorios] = useState([]);
    const [evidencias, setEvidencias] = useState([]);

    const handleEvidencia = () => {
        setLoading(true)
        setEvidencias(prev => [...prev, evidencia])
        setLoading(false)
    }

    const handleModify = () => {
        setLoading(true)
        let listId = {}
        if(estadoActual === "Cancelada" && justificacion === ""){
            alert("Debe agregar una justificacion de la cancelacion")
            return
        }
        let estadoA = "asd";
        if(estadoActual !== "Cancelada" && estadoActual !== "Realizada"){
            estadoA = estado
        }else{
            estadoA = estadoActual
        }
        console.log(estadoA)
        axios.post(`${import.meta.env.VITE_API}/ProfesorGuiaCoordinador/ModificarActividad/${id}`, {
            nombreActividad, semana, tipo, afiche, estadoA, fecha, hora, modalidad, responsables, recordatorios, evidencias, justificacion
        }).then((response) => {
            setNombreActividad(response.data.nombre)
            setEstado(response.data.estado)
            setSemana(response.data.semana)
            setTipo(response.data.tipo)
            setAfiche(response.data.afiche)
            setFecha(formatDate(response.data.fecha))
            setHora(response.data.hora)
            setModalidad(response.data.modalidad)
            setJustificacion(response.data.justificacion)
            setEnlace(response.data.enlaceReunion)
            listId={list: response.data.responsables}
            const list = []
            response.data.recordatorios.forEach((recordatorio) => {
                list.push(formatDate(recordatorio))
            })
            setRecordatorios(list)
            setEvidencias(response.data.evidencias)
        }).then(()=> {
            axios.post(`${import.meta.env.VITE_API}/ProfesorGuiaCoordinador/Responsables`, {
                listId
            }).then((response)=>{
                console.log(response.data)
                setResponsables(response.data)
                setLoading(false)
            })
        }).then(()=>{
            alert('Se Modifico Correctamente')
        }).catch((error) => {
            alert('Ocurrio un error al intentar guardar los cambios')
        })
    }

    const formatImg = async (img) => {
    
        const reader = new FileReader
        await reader.readAsDataURL(img)
        const data = new Promise((res,error)=>{
            reader.onload = () => res(reader.result)
            reader.onerror = (err) => error(err)
        })
        return data 
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

      const handleSearch = () =>{
        setLoading(true)
        axios.get(`${import.meta.env.VITE_API}/ProfesorGuiaCoordinador/ListaProfesores/${searchName}`).then((response)=>{    
            setSearchList(response.data)
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
        })
        
      }
      const handleEraseDate = () => {
        let result = []
        recordatorios.forEach((recordatorio) => {
            if(recordatorio !== selectionDate)
                result.push(recordatorio)
        })
        setRecordatorios(result)
      }

      const handleDate = () => {
        setLoading(true)
        setRecordatorios(prev => [...prev, date])
        setLoading(false)
      }
    
      const handleAssign = () => {
        setLoading(true)
        axios.post(`${import.meta.env.VITE_API}/ProfesorGuiaCoordinador/RecuperarProfesor`, {
            selection
        }).then((response)=>{
            if (responsables.length === 0)
                setResponsables(prev => [...prev, response.data])
            responsables.forEach((responsable) => {
                if(responsable._id !== response.data._id)
                    setResponsables(prev => [...prev, response.data])
            })
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
        })
      }
      
      const handleEraseEvidencia = (e) => {
        let result = []
        setSelectEvidencia(e.currentTarget.dataset.value)
        evidencias.forEach((evidencia) => {
            if(evidencia !== selectionEvidencia)
                result.push(evidencia)
        })
        console.log(result)
        setEvidencias(result)
      }

    useEffect(()=>{
        setLoading(true)
        let listId = {}
        axios.get(`${import.meta.env.VITE_API}/ProfesorGuiaCoordinador/Actividad/${id}`).then((response) => {
            console.log(response.data)
            setNombreActividad(response.data.nombre)
            setEstado(response.data.estado)
            setSemana(response.data.semana)
            setTipo(response.data.tipo)
            setAfiche(response.data.afiche)
            setFecha(formatDate(response.data.fecha))
            setHora(response.data.hora)
            setModalidad(response.data.modalidad)
            setEnlace(response.data.enlaceReunion)
            listId={list: response.data.responsables}
            const list = []
            response.data.recordatorios.forEach((recordatorio) => {
                list.push(formatDate(recordatorio))
            })
            setRecordatorios(list)
            setEvidencias(response.data.evidencias)

            console.log(listId)
        }).then(()=> {
            axios.post(`${import.meta.env.VITE_API}/ProfesorGuiaCoordinador/Responsables`, {
                listId
            }).then((response)=>{
                console.log(response.data)
                setResponsables(response.data)
                setLoading(false)
            }).catch((error) =>{
                console.log(error)
            })
        }).catch((error) =>{
            console.log(error)
        })
    }, [])

    const handleDiscard = () => {
        let result = []
        responsables.forEach((responsable) => {
            if(responsable._id !== selectionErase)
                result.push(responsable)
        })
        setResponsables(result)
        
      }
    
    const handleImage = async (file) =>{
        const image = await formatImg(file)
        setAfiche(image)
    }

    return (
        <div>
            <Header/>
            <div className='min-h-screen bg-[#29364E] text-white'>
                    <div className='p-10'>
                        <h3>Nombre de la actividad</h3>
                        {loading ? (
                            <div className='py-3'>
                                <input  type="input" class="p-2.5 z-20 w-[400px] text-sm text-black bg-white rounded-[10px] focus:outline-none"></input>
                            </div>
                        ) : (
                            <div className='py-3'>
                                <input onChange={(e) => setNombreActividad(e.target.value)} value={nombreActividad} type="input" class="p-2.5 z-20 w-[400px] text-sm text-black bg-white rounded-[10px] focus:outline-none"></input>
                            </div>
                        )}
                        
                        <h3>Estado actual: {estado} </h3>
                        <div className='py-3'>
                            {loading ? (
                                <select name='Estado_de_la_actividad' class="bg-white w-[400px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                    <option selected>Elegir Estado</option>
                                </select>
                            ) : (
                                <div>
                                    <select onChange={(e) => setEstadoActual(e.target.value)} name='Estado_de_la_actividad' class="bg-white w-[400px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                        <option selected>Elegir Estado</option>
                                        <option >Cancelada</option>
                                        <option >Realizada</option>
                                    </select>
                                </div>
                            )}
                            
                        </div>
                        {estadoActual === "Cancelada" ? (
                            <div>
                            <h3>Justificacion </h3>
                            <div className='py-3'>
                                <input className="p-2.5 w-1/4 z-20 text-sm text-black bg-white rounded-[12px] focus:outline-none" type="text" onChange={(e)=> setJustificacion(e.target.value)}></input>
                            </div>
                            </div>
                        ):(
                            <div></div>
                        ) }
                        
                        <div className='flex pt-3'>
                            <div className='p-4 rounded-[12px] w-[1000px] border-2 border-[#061634]'>
                                <div className='flex'>
                                    <div>
                                        <div className='flex'>
                                            <div>
                                                <h3 className='pb-2'>Semana</h3>
                                                {loading ? (
                                                    <select name='Numero_de_la_semana' class="bg-white w-[60px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                        <option>1</option>
                                                    </select>
                                                ) : (
                                                    <select onChange={(e) => setSemana(e.target.value)} name='Numero_de_la_semana' class="bg-white w-[60px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                        <option>6</option>
                                                        <option>7</option>
                                                        <option>8</option>
                                                        <option>9</option>
                                                        <option>10</option>
                                                        <option>11</option>
                                                        <option>12</option>
                                                        <option>13</option>
                                                        <option>14</option>
                                                        <option>15</option>
                                                        <option>16</option>
                                                        <option selected>{semana}</option>
                                                    </select>
                                                )}
                                                
                                            </div>
                                            <div className='pl-4'>
                                                <h3 className='pb-2'>Tipo</h3>
                                                {loading ? (
                                                    <select name='Tipo_de_actividad' class="bg-white w-[425px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                        <option selected>Seleccione el tipo</option>
                                                    </select>
                                                ) : (
                                                    <select onChange={(e) => setTipo(e.target.value)} name='Tipo_de_actividad' class="bg-white w-[425px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                        <option selected>{tipo}</option>
                                                        <option >Orientacion</option>
                                                        <option>Motivacion</option>
                                                        <option>Orientacion</option>
                                                        <option>Apoyo Estudiantil</option>
                                                        <option>Tecnica</option>
                                                        <option>Recreacion</option>
                                                    </select>
                                                )}
                                                
                                            </div>
                                        </div>
                                        <div className='flex pt-4'>
                                            <div>
                                                <h3 className='pb-2'>Fecha</h3>
                                                {loading ? (
                                                    <input name='Fecha_de_actividad' type='date' className='p-2.5 z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none'></input>
                                                ) : (
                                                    <input onChange={(e)=>setFecha(e.target.value)} value={fecha} name='Fecha_de_actividad' type='date' className='p-2.5 z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none'></input>
                                                )}
                                                
                                            </div>
                                            <div className='pl-4'>
                                                <h3 className='pb-2'>Hora</h3>
                                                {loading ? (
                                                    <input name='Hora_de_actividad' type='time' className='p-2.5 z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none'></input>
                                                ): (
                                                    <input value={hora} name='Hora_de_actividad' type='time' className='p-2.5 z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none'></input>
                                                )}
                                                
                                            </div>
                                            <div className='pl-4'>
                                                <h3 className='pb-2'>Modalidad</h3>
                                                {loading ? (
                                                    <select name='Modalidad_de_la_actividad' class="bg-white w-[215px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                        <option selected>Seleccione la modalidad</option>
                                                    </select>
                                                ): (
                                                    modalidad === 'Presencial' ? (
                                                        <select name='Modalidad_de_la_actividad' class="bg-white w-[215px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                            <option selected>Presencial</option>
                                                            <option>Remota</option>
                                                        </select>
                                                    ) : (
                                                        <select name='Modalidad_de_la_actividad' class="bg-white w-[215px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                            <option selected>Remota</option>
                                                            <option >Presencial</option>
                                                        </select>
                                                    )
                                                    
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pl-10'>
                                        <h3 className='pb-2'>Afiche del evento</h3>
                                        {loading ? (
                                            <input name='Afiche_de_la_actividad' class="p-2 w-[400pxpx] text-sm text-white rounded-[10px] cursor-pointer bg-[#061634]" id="file_input" type="file"></input>
                                        ) : (
                                            <input onChange={(e) => handleImage(e.target.files[0])} name='Afiche_de_la_actividad' class="p-2 w-[400pxpx] text-sm text-white rounded-[10px] cursor-pointer bg-[#061634]" id="file_input" type="file"></input>    
                                        )}
                                        
                                    </div>
                                </div>
                                <div className='pt-4'>
                                    <div className='p-2 rounded-[10px] border-2 border-[#061634]'>
                                        <h3>Responsables</h3>
                                        <div className='flex'>
                                            <div className='p-2 custom-scrollbar overflow-auto scrollbar-webkit scrollbar-thin h-[225px]'>
                                                <div className='pb-2'>
                                                    {loading ? (
                                                        <div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                        {responsables.map((prof) => (
                                                            <div className='flex bg-[#061634] p-2 rounded-[10px] my-2'>
                                                                <div className="flex-shrink-0">
                                                                    <input onClick={() => setSelectErase(prof._id)}  name='R_Responsable' type="radio" className="form-checkbox h-3 w-3 text-blue-600 rounded focus:ring-blue-500" />
                                                                </div>
                                                                <div className="flex-grow flex items-center justify-between ml-3">
                                                                    <p className="text-white text-sm">{prof.name} {prof.secondName} {prof.lastName} {prof.secondLastName}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='p-2'>
                                                <button onClick={handleDiscard} class='text-sm py-1 px-4 bg-white text-[#061931] rounded-[10px] mx-2'>Eliminar Responsable</button>
                                            </div>
                                            <div className='p-2'>
                                                <div class="relative w-[250px]">
                                                <input onChange={(e) => setSearch(e.target.value)} name='Nombre_profesor_busqueda' type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[12px] focus:outline-none" placeholder="Nombre Profesor"/>
                                                    <button onClick={handleSearch} type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-white rounded-[12px]">
                                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                        </svg>
                                                        <span class="sr-only">Search</span>
                                                    </button>
                                                </div>
                                                <div className='pt-3'>
                                                    <div className="custom-scrollbar bg-[#29364E] rounded-[16px] mb-3 overflow-auto pt-3 scrollbar-webkit scrollbar-thin">
                                                        {loading ? (
                                                            <div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {searchList.map((prof)=> (
                                                                    <div className='flex items-center pl-5 pr-4 py-4 bg-[#061634] rounded-[16px]'>
                                                                        <div className="flex-shrink-0">
                                                                            <input onClick={() => setSelect(prof._id)} name='Profesor_busqueda_seleccion' type="radio" className="form-checkbox h-3 w-3 text-blue-600 rounded focus:ring-blue-500" />
                                                                        </div>
                                                                        <div className="pl-3 flex-grow flex items-center justify-between">
                                                                            <p className="text-white text-sm">{prof.name} {prof.lastName} {prof.secondLastName}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='p-2'>
                                                <button onClick={handleAssign} class='text-sm py-1 px-4 bg-white text-[#061931] rounded-[10px] mx-2'>Agregar Responsable</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-4'>
                                    <div className='p-2 rounded-[10px] border-2 border-[#061634]'>
                                        <h3>Recordatorios</h3>
                                        <div className='flex'>
                                            <div className='p-2 custom-scrollbar overflow-auto scrollbar-webkit scrollbar-thin h-[225px]'>
                                            {loading ? (
                                                    <div></div>
                                                ) : (
                                                    <div>
                                                        {recordatorios.map((recordatorio) => (
                                                            <div className='flex pb-2 w-[175px]'>
                                                                <input name='boton' type='radio' onChange={()=> setSelectDate(recordatorio)}/>
                                                                <input value={recordatorio} name='Fecha_recordatorio' type='date' className='p-2 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none' readOnly></input>
                                                            </div>
                                                        ))}
                                                        
                                                    </div>
                                                )}
                                            </div>
                                            <div className='p-2'>
                                                <button onClick={handleEraseDate} class='text-sm py-2 px-4 bg-white text-[#061931] rounded-[10px] mx-2'>Eliminar Recordatorio</button>
                                            </div>
                                            <div className='p-2'>
                                                <input onChange={(e)=>setDate(e.target.value)} name='Fecha_agregar_recordatorio' type='date' className='p-2 w-full z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none'></input>
                                            </div>
                                            <div className='p-2'>
                                                <button onClick={handleDate} class='text-sm py-2 px-4 bg-white text-[#061931] rounded-[10px] mx-2'>Agregar Recordatorio</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-4'>
                                    <div className='p-2 rounded-[10px] border-2 border-[#061634]'>
                                        {estadoActual === "Realizada" ? (
                                            <div>
                                                <h3>Evidencias</h3>
                                                <div className='pt-3 flex'>
                                                    <input onChange={(e) => setEvidencia(e.target.value)} name='Path_evidencia' class="p-2 w-[400pxpx] text-sm text-white rounded-[10px] cursor-pointer bg-[#061634]" id="file_input" type="file"></input>
                                                    <div className='pt-1'>
                                                        <button onClick={handleEvidencia} class='text-sm py-2 px-4 bg-white text-[#061931] rounded-[10px] mx-2'>Agregar Evidencia</button>
                                                    </div>
                                                </div>
                                                <div className='pt-3'>
                                                        {loading ? (
                                                            <div className='flex pb-3'>
                                                                <input name='Evidencia' type='input' className='p-2 w-[300px] text-sm text-black bg-white rounded-[10px] focus:outline-none'/>
                                                                <div className='pt-1 pl-2'>
                                                                    <button>
                                                                        <img src={basurero} className='h-7'></img>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                            {evidencias.map((evidencia) => (
                                                                <div className='flex pb-3'>
                                                                    <input value={evidencia} name='Evidencia' type='text' className='p-2 w-[300px] text-sm text-black bg-white rounded-[10px] focus:outline-none'/>
                                                                    <div className='pt-1 pl-2'>
                                                                    <button onClick={handleEraseEvidencia} data-value={evidencia}>
                                                                        <img src={basurero} className='h-7'></img>
                                                                    </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        ):(
                                            <div></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='p-4'>
                                <button onClick={handleModify} type='submit' class='py-1 px-4 bg-white text-[#061931] rounded-[10px] mx-2'>Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default MDPlanDeTrabajo