import React, { useState, useEffect } from 'react'
import Header from '../components/HeaderProfesorGuiaCoord.jsx'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'


const AGPlanDeTrabajo = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [date, setDate] = useState(null)
    const [selection, setSelect] = useState("")
    const [selectionErase, setSelectErase] = useState("")
    const [selectionDate, setSelectDate] = useState("")
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("Planeada");
    const [semana, setSemana] = useState("1");
    const [tipo, setTipo] = useState("Orientacion");
    const [afiche, setAfiche] = useState("");
    const [diasRestantes, setDiasRestantes] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [modalidad, setModalidad] = useState("Presencial");
    const [enlaceReunion, setEnlaceReunion] = useState("");
    const [responsables, setResponsables] = useState([]);
    const [recordatorios, setRecordatorios] = useState([]);
    const [evidencias, setEvidencias] = useState([]);
    const [imagen, setImagen] = useState("");
    const [comentarios, setComentarios] = useState([]);
    const [searchList, setSearchList] = useState([])
    const [loadingProf, setLoadingProf] = useState(false)
    const [searchName, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/CrearActividad', {
            nombre,
            estado,
            semana,
            tipo,
            afiche,
            fecha,
            hora,
            modalidad,
            enlaceReunion,
            responsables,
            recordatorios,
            evidencias,
            imagen,
            comentarios
        }).then(response => {
          console.log(response.data.status)
            alert('Se creo exitosamente la actividad')
            navigate('/ProfesorGuiaCoordinador/PlanDeTrabajo')
        }).catch(err => {
          console.log(err)
        })
      }

      const handleAssign = () => {
        setLoadingProf(true)
        axios.post(`https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/RecuperarProfesor`, {
            selection
        }).then((response)=>{
            if (responsables.length === 0)
                setResponsables(prev => [...prev, response.data])
            responsables.forEach((responsable) => {
                if(responsable._id !== response.data._id)
                    setResponsables(prev => [...prev, response.data])
            })
            setLoadingProf(false)
        }).catch((error)=>{
            setLoadingProf(false)
        })
      }

      useEffect(()=>{
        setLoadingProf(true)
        axios.get(`https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/ListaProfesores`).then((response)=>{
            console.log(response.data)    
            setSearchList(response.data)
            setLoadingProf(false)
        }).catch((error)=>{
            setLoadingProf(false)
        })
        axios.get(`https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/Responsables/${id}`).then((response)=>{
            setResponsables(response.data)
            setLoadingProf(false)
        })
      }, [])

      const handleSearch = () =>{
        setLoadingProf(true)
        axios.get(`https://tecportfolio-api.onrender.com/ProfesorGuiaCoordinador/ListaProfesores/${searchName}`).then((response)=>{    
            setSearchList(response.data)
            setLoadingProf(false)
        }).catch((error)=>{
            setLoadingProf(false)
        })
        
      }

      const handleDiscard = () => {
        let result = []
        responsables.forEach((responsable) => {
            if(responsable._id !== selectionErase)
                result.push(responsable)
        })
        setResponsables(result)
        
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
        setLoadingProf(true)
        setRecordatorios(prev => [...prev, date])
        setLoadingProf(false)
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
                        <div className='py-3'>
                            <input name='Nombre_de_la_actividad' type="input" onChange={(e) => setNombre(e.target.value)} class="p-2.5 z-20 w-[400px] text-sm text-black bg-white rounded-[10px] focus:outline-none"></input>
                        </div>
                        <h3>Estado actual</h3>
                        <div className='py-3'>
                            <select name='Estado_de_la_actividad' onChange={(e) => setEstado(e.target.value)} class="bg-white w-[400px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                <option selected>Planeada</option>
                                <option>Notificada</option>
                                <option>Realizada</option>
                                <option>Cancelada</option>
                            </select>
                        </div>
                        
                        <div className='flex pt-3'>
                            <div className='p-4 rounded-[12px] w-[1000px] border-2 border-[#061634]'>
                                <div className='flex'>
                                    <div>
                                        <div className='flex'>
                                            <div>
                                                <h3 className='pb-2'>Semana</h3>
                                                <select name='Numero_de_la_semana' onChange={(e) => setSemana(e.target.value)} class="bg-white w-[60px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                <option selected>1</option>
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
                                                </select>
                                            </div>
                                            <div className='pl-4'>
                                                <h3 className='pb-2'>Tipo</h3>
                                                <select name='Tipo_de_actividad' onChange={(e) => setTipo(e.target.value)} class="bg-white w-[425px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                    <option selected>Orientacion</option>
                                                    <option>Motivacion</option>
                                                    <option>Orientacion</option>
                                                    <option>Apoyo Estudiantil</option>
                                                    <option>Tecnica</option>
                                                    <option>Recreacion</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='flex pt-4'>
                                            <div>
                                                <h3 className='pb-2'>Fecha</h3>
                                                <input name='Fecha_de_actividad' type='date' onChange={(e) => setFecha(e.target.value)} className='p-2.5 z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none'></input>
                                            </div>
                                            <div className='pl-4'>
                                                <h3 className='pb-2'>Hora</h3>
                                                <input name='Hora_de_actividad' type='time' onChange={(e) => setHora(e.target.value)} className='p-2.5 z-20 text-sm text-black bg-white rounded-[10px] focus:outline-none'></input>
                                            </div>
                                            <div className='pl-4'>
                                                <h3 className='pb-2'>Modalidad</h3>
                                                <select name='Modalidad_de_la_actividad' onChange={(e) => setModalidad(e.target.value)} class="bg-white w-[215px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                    <option selected>Presencial</option>
                                                    <option>Remota</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pl-10'>
                                        <h3 className='pb-2'>Afiche del evento</h3>
                                        <input name='Afiche_de_la_actividad' onChange={(e) => handleImage(e.target.files[0])} class="p-2 w-[400pxpx] text-sm text-white rounded-[10px] cursor-pointer bg-[#061634]" id="file_input" type="file"></input>
                                    </div>
                                </div>
                                <div className='pt-4'>
                                    <div className='p-2 rounded-[10px] border-2 border-[#061634]'>
                                        <h3>Responsables</h3>
                                        <div className='flex'>
                                            <div className='p-2 custom-scrollbar overflow-auto scrollbar-webkit scrollbar-thin h-[225px]'>
                                                <div className='pb-2'>
                                                    {loadingProf ? (
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
                                                        {loadingProf ? (
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
                                                {loadingProf ? (
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
                                
                            </div>
                            <div className='p-4'>
                                <button type='submit' onClick={handleSubmit} class='py-1 px-4 bg-white text-[#061931] rounded-[10px] mx-2'>Crear Actividad</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default AGPlanDeTrabajo
