import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderProfesorGuia.jsx'
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../../styles.css'

const ListaEstudiantesProfeGuia = () => {
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])
    const [campus, setCampus] = useState("")
    const [campusSelect, setCampusSelect] = useState("")
    const [filter, setFilter] = useState("")
    const [tipoInforme, setTipoInforme] = useState('')

    useEffect(()=>{
        setLoading(true)
        const us = JSON.parse(localStorage.getItem('user'))
        const campusUser = us.campus
        setCampusSelect(campusUser)
        setCampus(campusUser)
        setFilter('Por orden alfabético')
        try {
        axios.get(`${import.meta.env.VITE_API}/AsistenteAdministrativo/ListaEstudiantes/${campusUser}`).then((response) => {
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

    const handleFilters = () => {
        console.log(campus)
        console.log(filter)
        if (filter === 'Por orden alfabético'){
            console.log(campus)
            try {
                axios.get(`${import.meta.env.VITE_API}/AsistenteAdministrativo/ListaEstudiantes/${campus}`).then((response) => {
                    console.log(response.data)
                    response.data.sort((a, b) => {
                        if (a.lastName < b.lastName) {
                          return -1;
                        }
                        if (a.lastName > b.lastName) {
                          return 1;
                        }
                        return 0;
                      });
                    setStudents(response.data)
                    setLoading(false)
                }).catch((error) => {
                    console.log(error)
                    setLoading(false)
                }) } 
            catch (error) {
                console.log(error)
                setLoading(false)
            }
        } else if(filter === 'Por número de carné'){
            console.log(campus)
            try {
                axios.get(`${import.meta.env.VITE_API}/AsistenteAdministrativo/ListaEstudiantes/${campus}`).then((response) => {
                    console.log(response.data)
                    response.data.sort((a, b) => {
                        return a.carne.localeCompare(b.carne);
                    });
                    setStudents(response.data)
                    setLoading(false)
                }).catch((error) => {
                    console.log(error)
                    setLoading(false)
                }) } 
            catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }
    
    function handleDownload() {
        const us = JSON.parse(localStorage.getItem('user'))
        const campus = us.campus
        const selectedRadioValue = document.querySelector('input[name="locationType"]:checked').value
        var route;
        if(selectedRadioValue=='Campus'){
            route = 'ProfesorGuiaCoordinador/generarInformeAllCampus'
        }
        else{
            route = `ProfesorGuiaCoordinador/generarInformeCampus/${campus}`
        }
        axios({
            url: `${import.meta.env.VITE_API}/${route}`, 
            method: 'GET',
            responseType: 'blob', 
        })
        .then((response) => {
 
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');
            
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'informeEstudiantes.xlsx'); 
            document.body.appendChild(fileLink);
            
            fileLink.click();
    
        
            fileLink.parentNode.removeChild(fileLink);
            window.URL.revokeObjectURL(fileURL);
        })
        .catch(error => {
            console.error('Download error:', error);
            alert('Error downloading the file');
        });
    }


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
                        {campusSelect === 'San Jose' ? (
                                <select name='campus' onChange={(e) => setCampus(e.target.value)} class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                    <option selected>San Jose</option>
                                    <option>Alajuela</option>
                                    <option>Limon</option>
                                    <option>San Carlos</option>
                                    <option>Cartago</option>
                                    <option>Todos</option>
                                </select>
                                ) : (
                                    campusSelect === 'Cartago' ? (
                                        <select name='campus' onChange={(e) => setCampus(e.target.value)} class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                            <option>San Jose</option>
                                            <option>Alajuela</option>
                                            <option>Limon</option>
                                            <option>San Carlos</option>
                                            <option selected>Cartago</option>
                                            <option>Todos</option>
                                        </select>
                                    ) : (
                                        campusSelect === 'Alajuela' ? (
                                            <select name='campus' onChange={(e) => setCampus(e.target.value)} class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                <option>San Jose</option>
                                                <option selected>Alajuela</option>
                                                <option>Limon</option>
                                                <option>San Carlos</option>
                                                <option>Cartago</option>
                                                <option>Todos</option>
                                            </select>
                                        ): (
                                            campusSelect === 'San Carlos' ? (
                                                <select name='campus' onChange={(e) => setCampus(e.target.value)} class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                    <option>San Jose</option>
                                                    <option>Alajuela</option>
                                                    <option>Limon</option>
                                                    <option selected>San Carlos</option>
                                                    <option>Cartago</option>
                                                    <option>Todos</option>
                                                </select>
                                            ) : (
                                                campusSelect === 'Limon' ? (
                                                    <select name='campus' onChange={(e) => setCampus(e.target.value)} class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                        <option>San Jose</option>
                                                        <option>Alajuela</option>
                                                        <option selected>Limon</option>
                                                        <option>San Carlos</option>
                                                        <option>Cartago</option>
                                                        <option>Todos</option>
                                                    </select>
                                                ) : (
                                                    <select name='campus' onChange={(e) => setCampus(e.target.value)} class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                                                        <option>San Jose</option>
                                                        <option>Alajuela</option>
                                                        <option>Limon</option>
                                                        <option>San Carlos</option>
                                                        <option>Cartago</option>
                                                        <option selected>Todos</option>
                                                    </select>    
                                                )
                                            )
                                        )
                                    )
                                )}
                        </div>
                        <div className='py-3'>
                            <select name='orden' onChange={(e) => setFilter(e.target.value)} class="bg-white w-[250px] h-[40px] text-black text-sm rounded-[10px] p-2.5 focus:outline-none">
                            <option >Por orden alfabético</option>
                            <option >Por número de carné</option>
                            </select>
                        </div>
                        <div className="py-3">
                            <button onClick={handleFilters} className="bg-[#ffffff] text-[#061931] py-2 px-6 rounded-[10px]">
                                Aplicar filtros
                            </button>
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
                <div className="flex justify-center mb-4">
                    <label className="mr-4">
                        <input type="radio" name="locationType" value="Campus" className="mr-2" defaultChecked />
                        Todos los Campus
                    </label>
                    <label>
                        <input type="radio" name="locationType" value="Sede" className="mr-2"  />
                        Campus Perteneciente
                    </label>
                </div>
                <div className="flex justify-center">
                    <button className="bg-[#ffffff] text-[#061931] py-2 px-6 rounded-[10px]" onClick={handleDownload}>
                        Generar Informe
                    </button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default ListaEstudiantesProfeGuia
