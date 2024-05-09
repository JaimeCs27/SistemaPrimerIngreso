import React, {useState, useEffect} from 'react'
import Header from '../components/HeaderAACartago.jsx'
import axios from 'axios'
import '../../styles.css'
import * as XLSX from 'xlsx'

const AACListaEstudiantes = () => {
    const [excelFile, setExcelFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])

    useEffect(()=>{
        setLoading(true)
        const us = JSON.parse(localStorage.getItem('user'))
        const campus = us.campus
        try {
        axios.get(`https://tecportfolio-api.onrender.com/AsistenteAdministrativo/ListaEstudiantes/${campus}`).then((response) => {
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

    const handleUploadFile = (e) =>{
        const file = e.target.files[0]
        const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv']
        if(file){
            if(file&&fileTypes.includes(file.type)){
                let reader = new FileReader()
                reader.readAsArrayBuffer(file)
                reader.onload=(e)=>{
                    setExcelFile(e.target.result)
                }
            } else {
                alert("No selecciono un archivo valido")
            }
        }else{

        }
        
    }

    const handleUpload = (e) => {
        let data = null
        if(excelFile!==null){
            const workbook = XLSX.read(excelFile, {type: 'buffer'})
            const worksheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[worksheetName]
            data = XLSX.utils.sheet_to_json(worksheet)
        } else {
            console.log('Excel file mising')
        }
      axios.post('https://tecportfolio-api.onrender.com/AsistenteAdministrativo/subirArchivo', {
        data
      }).then(response =>{
        
      })
    }

  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-[#29364E] text-white flex flex-col items-center pt-8'>
            <div className='w-full max-w-[1140px] p-4'>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg mb-2">Lista de Estudiantes</h2>
                    <div>
                    <input onChange={handleUploadFile} name='Afiche_de_la_actividad' class="p-2 w-[400pxpx] text-sm text-white rounded-[10px] cursor-pointer bg-[#061634]" id="file_input" type="file"></input>
                    <button onClick={handleUpload} className="bg-[#ffffff] text-[#061931] py-2 px-6 rounded-[10px]">
                        Subir archivo
                    </button>
                    </div>
                </div>
                <div className="custom-scrollbar bg-[#29364E] rounded-[16px] mb-6 overflow-auto h-[520px] px-5 border border-[#061634] scrollbar-webkit scrollbar-thin pt-5">
                    
                    {loading? (
                        <div></div>
                    ):(
                        <div>
                        {students.map((student)=>(
                            <div className="flex items-center pl-5 pr-4 py-4 bg-[#061634] rounded-[16px] my-3">
                                <p className="text-white text-sm">{`${student.name} ${student.secondName===undefined ? ('') : (student.secondName)} ${student.lastName} ${student.secondLastName} - ${student.carne}`}</p>
                            </div>
                        ))}
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    </div>

  )
}

export default AACListaEstudiantes