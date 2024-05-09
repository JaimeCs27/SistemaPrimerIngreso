import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderProfesorGuia.jsx'
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../../styles.css'

const ListaEstudiantesProfeGuia = () => {
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])

    useEffect(()=>{
        setLoading(true)
        const us = JSON.parse(localStorage.getItem('user'))
        const campus = us.campus
        try {
        axios.get(`http://localhost:5555/AsistenteAdministrativo/ListaEstudiantes/${campus}`).then((response) => {
            console.log(response.data)
            setStudents(response.data)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
        
        } catch (error) {
        console.log(error)
            setLoading(false)
    }
    },[])
  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-[#29364E] text-white flex flex-col items-center pt-8'>
            <div className='w-full max-w-[1140px] p-4'>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg mb-2">Lista de Estudiantes</h2>
                </div>
                <div className="bg-[#29364E] rounded-[16px] mb-6 h-[520px] px-5 border border-[#061634] scrollbar-webkit scrollbar-thin pt-1">
                    <div className="flex space-x-2 items-center mb-4">
                        <div className='py-3'>
                            <select name='Estado_de_la_actividad' class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                <option selected>1</option>
                            </select>
                        </div>
                        <div className='py-3'>
                            <select name='Estado_de_la_actividad' class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                <option selected>2</option>
                            </select>
                        </div>
                        <div className='py-3'>
                            <select name='Estado_de_la_actividad' class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                <option selected>3</option>
                            </select>
                        </div>
                    </div>
                    <div className="custom-scrollbar mb-6 overflow-auto h-[420px] px-5 scrollbar-webkit scrollbar-thin">
                        {loading? (
                            <div></div>
                        ):(
                            <div>
                            {students.map((student)=>(
                                <div className="flex items-center pl-5 pr-4 py-4 bg-[#061634] rounded-[16px] my-3">
                                    <p className="text-white text-sm">{`${student.name} ${student.secondName===undefined ? ('') : (student.secondName)} ${student.lastName} ${student.secondLastName} - ${student.carne}`}</p>
                                    <div className='pl-3'>
                                        <Link to={`/ProfesorGuia/Estudiantes/VerDetalles/${student._id}`}>Ver Detalles</Link>
                                    </div>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="bg-[#ffffff] text-[#061931] py-2 px-6 rounded-[10px]">
                        Generar Informe
                    </button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default ListaEstudiantesProfeGuia