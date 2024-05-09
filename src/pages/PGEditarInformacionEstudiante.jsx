import React, {useState, useEffect, useDeferredValue} from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/HeaderProfesorGuia.jsx'
import axios from 'axios'
import '../../styles.css'


const PGEditarInformacionEstudiante = () => {
    
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [nameTitle, setNameTitle] = useState("")
    const [secondNameTitle, setSecondNameTitle] = useState("")
    const [lastNameTitle, setLastNameTitle] = useState("")
    const [secondLastNameTitle, setSecondLastNameTitle] = useState("")
    const [secondName, setSecondName] = useState("")
    const [lastName, setLastName] = useState("")
    const [secondLastName, setSecondLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [campus, setCampus] = useState("")
    const [carne, setCarne] = useState("")
    const {id} = useParams()
    
    const handleUpdate = () => {
        axios.post(`http://localhost:5555/AsistenteAdministrativo/EditarEstudiante/${id}`, {
            name,
            secondName,
            lastName,
            secondLastName,
            email,
            phoneNumber,
        }).then((response) => {
            setNameTitle(response.data.name)
            setSecondNameTitle(response.data.secondName)
            setLastNameTitle(response.data.lastName)
            setSecondLastNameTitle(response.data.secondLastName)
        })
    }

    useEffect(()=>{
        setLoading(true)
        axios.get(`http://localhost:5555/AsistenteAdministrativo/VerDetallesEstudiante/${id}`).then((response) =>{
            console.log(response.data)    
            setName(response.data.name)
            setNameTitle(response.data.name)
            setSecondName(response.data.secondName)
            setSecondNameTitle(response.data.secondName)
            setLastName(response.data.lastName)
            setLastNameTitle(response.data.lastName)
            setSecondLastName(response.data.secondLastName)
            setSecondLastNameTitle(response.data.secondLastName)
            setEmail(response.data.email)
            setPhoneNumber(response.data.phoneNumber)
            setCampus(response.data.campus)
            setCarne(response.data.carne)
            setLoading(false)
        })
    }, [])
  
    return (
      <div>
        <Header />
            <div className='min-h-screen bg-[#29364E] text-white flex'>
                <div className='flex flex-col w-screen'>
                    <div className='flex flex-col w-screen'>
                        {loading? (
                            <div>
                            <h2 className='font=semibold text-2xl mt-10 ml-20'>Sede: </h2>
                            <h2 className='font=semibold text-2xl mt-5 ml-20'>Estudiante: </h2>
                            <h2 className='font=semibold text-2xl mt-5 ml-20'>Carne: </h2> 
                            </div>
                        ) : (
                            <div>
                            <h2 className='font=semibold text-2xl mt-10 ml-20'>Sede: {campus}</h2>
                            <h2 className='font=semibold text-2xl mt-5 ml-20'>Estudiante: {nameTitle} {secondNameTitle} {lastNameTitle} {secondLastNameTitle}</h2>
                            <h2 className='font=semibold text-2xl mt-5 ml-20'>Carne: {carne}</h2> 
                            </div>
                        )}
                            <div className='p-10 font=semibold rounded-xl shadow-lg ring-2 ring-[#081434] m-10 flex w-1/2'>
                                <div className='p-10 font=semibold rounded-xl flex'>
                                    {loading ? (
                                        <div className='flex'>
                                            <div className='p-5 font=semibold rounded-xl flex flex-col space-y-5'>
                                                <input type="text" class="input-box" placeholder="Primer Apellido" className='text-black w-70 h-10 rounded-xl'></input>
                                                <input type="text" class="input-box" placeholder="Nombre" className='text-black w-80 h-10 rounded-xl'></input>
                                                <input type="text" class="input-box" placeholder="Correo" className='text-black w-80 h-10 rounded-xl'></input>
                                            </div>
                                            <div className='p-5 font=semibold rounded-xl flex flex-col space-y-5'>
                                                <input type="text" class="input-box" placeholder="Segundo Apellido" className='text-black w-80 h-10 rounded-xl'></input>
                                                <input type="text" class="input-box" placeholder="Segundo Nombre" className='text-black w-70 h-10 rounded-xl'></input>
                                                <input type="text" class="input-box" placeholder="Numero de Telefono" className='text-black w-70 h-10 rounded-xl'></input>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex">
                                            <div className='p-5 font=semibold rounded-xl flex flex-col space-y-5'>
                                                <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" class="input-box" placeholder="Primer Apellido" className='pl-2 text-black w-70 h-10 rounded-xl'></input>
                                                <input onChange={(e) => setName(e.target.value)} value={name} type="text" class="input-box" placeholder="Nombre" className='pl-2 text-black w-80 h-10 rounded-xl'></input>
                                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" class="input-box" placeholder="Correo" className='pl-2 text-black w-80 h-10 rounded-xl'></input>
                                            </div>
                                            <div className='p-5 font=semibold rounded-xl flex flex-col space-y-5'>
                                                <input onChange={(e) => setSecondLastName(e.target.value)} value={secondLastName} type="text" class="input-box" placeholder="Segundo Apellido" className='pl-2 text-black w-80 h-10 rounded-xl'></input>
                                                <input onChange={(e) => setSecondName(e.target.value)} value={secondName} type="text" class="input-box" placeholder="Segundo Nombre" className='pl-2 text-black w-70 h-10 rounded-xl'></input>
                                                <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" class="input-box" placeholder="Numero de Telefono" className='pl-2 text-black w-70 h-10 rounded-xl'></input>
                                            </div>
                                        </div>
                                    )}
                                </div>
                              
                            </div>
                        <button onClick={handleUpdate} className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 ml-10 rounded-xl rounded w-[10%]">Guardar Cambios</button>
                    </div>    
                </div>
            </div>
      </div>
    )
  }

  export default PGEditarInformacionEstudiante