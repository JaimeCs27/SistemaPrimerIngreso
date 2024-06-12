import React, {useState, useEffect, useDeferredValue} from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/HeaderAA.jsx'
import axios from 'axios'
import '../../styles.css'


const AA = () => {
  const [selection, setSelect] = useState("")
  const [name, setName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [lastName, setLastName] = useState("")
  const [secondLastName, setSecondLastName] = useState("")
  const [email, setEmail] = useState("")
  const [officePhone, setOfficePhone] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [searchName, setSearch] = useState("")
  const [campusRepresentante, setCampus] = useState("")
  const [profsList, setProfes] = useState([])
  const [loading, setLoading] = useState(false)
  const [teamwork, setTeamwork] = useState([])
  const [loadingTeam, setLoadingTeam] = useState(false)
  const [representante, setRepresentante] = useState({})
  const [loadingRepresentante, setLoadingRepresentante] = useState(false)
  
  
  

  const handleAssign = () => {
    const us = JSON.parse(localStorage.getItem('user'))
    const campus = us.campus
    setLoadingRepresentante(true)
    axios.post(``${api}`/AsistenteAdministrativo/AsignarRepresentante`,{
      selection, campus
    }).then((response) => {
      console.log(response)
      if(!Object.keys(response.data.profe).length){
        let rep = {name: "Sin Definir", teacherID: "---"}
        setRepresentante(rep)
      }else{
        setRepresentante(response.data.profe)
      }
      setLoadingRepresentante(false)
      if(response.data.status === "Not Added")
        alert("Para designar un nuevo representante de la sede, debe de dar de baja al representante actual")
      else if(response.data.status === "Created")
        alert("Representante asignado correctamente")
      else
        alert("Algo malo sucedió...")
    }).then(() => {
      setLoadingRepresentante(false)
      setLoadingTeam(true)
      try{
        axios.get('`${api}`/AsistenteAdministrativo/EquipoTrabajo').then((response) => {    
        setTeamwork(response.data)
          setLoadingTeam(false)
        }).catch((error) => {
          console.log(error)
          setLoadingTeam(false)
        })
  
      }catch(error){
        setLoadingTeam(false)
      }
    })
    
  }

  const handleDischarge = () => {
    const us = JSON.parse(localStorage.getItem('user'))
    const campus = us.campus
    setLoadingRepresentante(true)
    axios.post(``${api}`/AsistenteAdministrativo/DarDeBaja`, {
      campus
    }).then((response) => {
      console.log(response)  
      if (response.data === 'Success'){
          setRepresentante({name: "Sin Definir", teacherID: "---"})
          setLoadingRepresentante(false)
        }
    }).then(()=>{
      setLoadingRepresentante(false)
      setLoadingTeam(true)
      try{
        axios.get('`${api}`/AsistenteAdministrativo/EquipoTrabajo').then((response) => {    
        setTeamwork(response.data)
          setLoadingTeam(false)
        }).catch((error) => {
          console.log(error)
          setLoadingTeam(false)
        })
  
      }catch(error){
        setLoadingTeam(false)
      }
    })
    
  }

  const handleSearch = () =>{
    setLoading(true)
    const us = JSON.parse(localStorage.getItem('user'))
    const campus = us.campus

    axios.get(``${api}`/AsistenteAdministrativo/ListaProfesores/${searchName}?campus=${campus}`).then((response) => {
      setProfes(response.data)
      setLoading(false)
    }).catch((error) =>{
      setLoading(false)
    })
  }

  useEffect(()=>{
    const us = JSON.parse(localStorage.getItem('user'))
    const campus = us.campus
    setCampus(campus)
    setLoadingRepresentante(true)
    axios.post(``${api}`/AsistenteAdministrativo/RepresentanteSede`, {
      campus
    }).then((response) =>{
      if(!Object.keys(response.data).length){
        console.log('NO hay representante')
        let rep = {name: "Sin Definir", teacherID: "---"}
        setRepresentante(rep)
      }else{
        setRepresentante(response.data)
      }
      setLoadingRepresentante(false)
    }).catch((err) =>{
      setLoadingRepresentante(false)
    })
  }, [])

  useEffect(() => {
    setLoadingTeam(true)
    try{
      axios.get('`${api}`/AsistenteAdministrativo/EquipoTrabajo').then((response) => {  
        setTeamwork(response.data)
        setLoadingTeam(false)
      }).catch((error) => {
        console.log(error)
        setLoadingTeam(false)
      })

    }catch(error){
      setLoadingTeam(false)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    const us = JSON.parse(localStorage.getItem('user'))
    const campus = us.campus
    try {
      axios.get(``${api}`/AsistenteAdministrativo/ListaProfesores?campus=${campus}`).then((response) => {
        setProfes(response.data)
        setLoading(false)
      }).catch((error) => {
        console.log(error)
        setLoading(false)
      })
      
    } catch (error) {
      console.log(error)
        setLoading(false)
    }
  }, [])

  function validatePhoneNumber(phone) {
    const pattern = /^\d{4}-\d{4}$/;
    return pattern.test(phone);
  }
  function validatePhoneNumberWithExtension(phoneNumber) {
    const pattern = /^\d{4}-\d{4}\[\d{4}\]$/;
    return pattern.test(phoneNumber);
  }

  const handleSubmit = (e) => {
    const us = JSON.parse(localStorage.getItem('user'))
    const campus = us.campus
    if(!validatePhoneNumber(phoneNumber)){
      alert("Formato del telefono celular incorrecto")
      return;
    }
    if(!validatePhoneNumberWithExtension(officePhone)){
      alert("Formato del telefono de oficina incorrecto")
      return;
    }
    axios.post(``${api}`/AsistenteAdministrativo/AgregarProfesor`, {
      name,
      secondName,
      lastName,
      secondLastName,
      email,
      officePhone,
      phoneNumber,
      profilePic,
      campus
    }).then((response) => {
      console.log(response.data)
      if(response.data.status === "error")
        alert("Debe llenar todos los espacios")
      else{
        setLoading(true)
        const us = JSON.parse(localStorage.getItem('user'))
        const campus = us.campus
        try {
          axios.get(``${api}`/AsistenteAdministrativo/ListaProfesores?campus=${campus}`).then((response) => {
            setProfes(response.data)
            setLoading(false)
          }).then(()=>{
            alert('Profesor Agregado exitosamente')
          }).catch((error) => {
            console.log(error)
            alert('Ocurrio un problema agregando el profesor')
            setLoading(false)
          })
          
        } catch (error) {
          console.log(error)
            setLoading(false)
        }

      }
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
  const handleImage = async (file) =>{
    const image = await formatImg(file)
    setProfilePic(image)
  }

  return (
    <div>
    <Header />
        <div className="min-h-screen bg-[#29364E] text-white">
          <div className='flex'>
            {/* Left Column for Team Members */}
            <div className="flex w-1/2 p-4">
              {/* Left Column for Team Members */}
              <div className='w-[575px] p-4'>
                <h2 className="font-bold text-lg mb-4">Integrantes del equipo</h2>
                {/* Repeat this block for each team member */}
                <div className="custom-scrollbar bg-[#29364E] rounded-[16px] mb-3 overflow-auto h-[400px] pt-3 scrollbar-webkit scrollbar-thin border-2 border-[#061634]"> {/* Scrollbar appears if content exceeds 24rem/96px */}
                        {loadingTeam ? (
                          <div>
                            
                          </div>
                        ):(
                          <div>
                          {teamwork.map((prof) => (
                            <div className='flex items-center pl-5 pr-4 py-4 mx-4 bg-[#061634] rounded-[16px] my-3'>
                              <div className="flex-grow flex items-center justify-between ml-4">
                              <p className="text-white text-sm">{`${prof.name} ${prof.isCoord ? ("- Coordinador") : ("")} - ${prof.teacherID}`}</p>
                                <div>
                                  <Link to={`/AsistenteAdministrativo/VerDetalles/${prof._id}`}>Ver Detalles</Link>
                                </div>
                              </div>
                            </div> 
                          ))}
                          </div>
                          
                        )}
                    </div>
              </div>
              
              {/* Right Column for Additional Content */}
            </div>
            <div className="flex w-1/2 p-4">
              <div className='w-[575px] p-4'>
                <h3 className="font-bold text-lg mb-4">Representante Sede {campusRepresentante}</h3>
                <div div className="bg-[#29364E] rounded-[16px] w-[575px] mb-3 h-[400px] px-5 border-2 border-[#061634]">
                  <div>
                    {loadingRepresentante ? (
                      <div>
                          <div className="flex items-center pl-5 pr-4 py-4 bg-[#061634] rounded-[16px] my-4">
                            <div className="flex-grow flex items-center justify-between ml-4 my-1">
                              <p className="text-white text-sm">Sin Definir</p>
                            </div>
                          </div>
                        </div>
                    ) : (
                      <div className="flex items-center pl-5 pr-4 py-4 bg-[#061634] rounded-[16px] my-4">
                      <div className="flex-grow flex items-center justify-between ml-4 my-1">
                        <p className="text-white text-sm">{`${representante.name} - ${representante.teacherID}`}</p>
                        <div>
                        <Link to={`/AsistenteAdministrativo/VerDetalles/${representante._id}`}>Ver Detalles</Link>
                        </div>
                      </div>
                    </div>
                    )}
                    
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Lista de profesores</h3>
                    
                    <div class="relative w-full">
                      <input onChange={(e) => setSearch(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="Nombre Profesor"/>
                      <button onClick={handleSearch} type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-white rounded-[16px]">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span class="sr-only">Search</span>
                      </button>
                    </div>
                  
                
                  
                    <div className="custom-scrollbar bg-[#29364E] rounded-[16px] mb-3 overflow-auto h-[200px] pt-3 scrollbar-webkit scrollbar-thin"> {/* Scrollbar appears if content exceeds 24rem/96px */}
                        {loading ? (
                          <div>
                            
                          </div>
                        ):(
                          <div>
                          {profsList.map((prof) => (
                            <div className='flex items-center pl-5 pr-4 py-4 bg-[#061634] rounded-[16px] my-3'>
                              <div className="flex-shrink-0">
                                <input onChange={() => setSelect(prof._id)} type="radio" name="profes" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                              </div>
                              <div className="flex-grow flex items-center justify-between ml-4">
                                <p className="text-white text-sm">{`${prof.name} - ${prof.teacherID}`}</p>
                                <div>
                                  <Link to={`/AsistenteAdministrativo/VerDetalles/${prof._id}`}>Ver Detalles</Link>
                                </div>
                              </div>
                            </div> 
                          ))}
                          </div>
                          
                        )}
                    </div>     
                  </div>
                </div>
              </div>
              <div>
                <div className='w-[calc(100%)] p-4'>
                  <div className="items-start flex-1 pt-[75px]">
                    <button className="mx-2 bg-[#ffffff] text-[#061931] py-1 px-4 rounded-[10px]" onClick={handleDischarge}>
                      Dar de baja
                    </button>
                  </div>
                </div>
                <div className='w-[calc(100%)] p-4'>
                  <div className="items-start pt-[47px] ">
                    <button onClick={handleAssign} className="mx-2 bg-[#ffffff] text-[#061931] py-1 px-4 rounded-[10px]">
                      Designar representante
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='pl-8 pb-10'>
            <h3 className="font-bold text-lg mb-4">Agregar Nuevo Profesor</h3>
            <div className='flex w-[1505px] bg-[#29364E] rounded-[16px] mb-3 px-5 border-2 border-[#061634]'>
              <div className="w-1/4 pt-7">
                <div className="pb-6">
                  <input onChange={(e) => setName(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="Primer nombre"/>
                </div>
                <div className="pb-6">
                  <input onChange={(e) => setLastName(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="Primer apellido"/>
                </div>
                <div className="pb-6">
                  <input onChange={(e) => setEmail(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="Email"/>
                </div>
                <div className="pb-6">
                  <input onChange={(e) => setOfficePhone(e.target.value)} type="tel" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="xxxx-xxxx[xxxx]" pattern="\d{4}-\d{4}(\[\d{4}\])?" required />
                </div>
              </div>
              <div className="w-1/4 p-4 pt-7">
                <div className="pb-6">
                  <input onChange={(e) => setSecondName(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="Segundo nombre (opcional)"/>
                </div>
                <div className="pb-6">
                  <input onChange={(e) => setSecondLastName(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="Segundo apellido"/>
                </div>
                <div className="pb-16">
                </div>
                <div className="">
                  <input onChange={(e) => setPhoneNumber(e.target.value)} type="tel" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="xxxx-xxxx" pattern='[0-9]{4}-[0-9]{4}' required/>
                </div>
              </div>
              
              <div className="w-1/4 p-7">
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-white"><span class="font-semibold">Click to upload profile pic</span> or drag and drop</p>
                            <p class="text-xs">SVG, PNG, JPG or GIF</p>
                        </div>
                        <input onChange={(e) => handleImage(e.target.files[0])} id="dropzone-file" type="file" class="hidden" />
                    </label>
                </div> 
              </div>
              <div className="w-1/4 p-7">
                <button onClick={handleSubmit} className="mx-2 bg-[#ffffff] text-[#061931] py-1 px-4 rounded-[10px]">
                  Agregar Profesor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>






  )
}

export default AA




