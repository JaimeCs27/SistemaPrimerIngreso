import React, { useEffect } from 'react'
import Header from '../components/HeaderAACartago.jsx'
import axios from 'axios'
import '../../styles.css'
import {useState } from "react";
import { useParams } from 'react-router-dom';



const AACInfoProfe = () => {

  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const {id} = useParams()
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
  const [officePhone, setOfficePhone] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [campus, setCampus] = useState("")
  const [idTeacher, setId] = useState("")
  const [profilePic, setProfilePic] = useState("")

  const formatImg = async (img) => {
    
    const reader = new FileReader
    reader.readAsDataURL(img)
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
  const confirmChanges = () =>{
    const text = "¿Guardar los cambios?"
    if(confirm(text)){
      handleUpdate()
    }
  }

  function validatePhoneNumber(phone) {
    const pattern = /^\d{4}-\d{4}$/;
    return pattern.test(phone);
  }
  function validatePhoneNumberWithExtension(phoneNumber) {
    const pattern = /^\d{4}-\d{4}\[\d{4}\]$/;
    return pattern.test(phoneNumber);
  }

  const handleUpdate = () =>{
    if(!validatePhoneNumber(phoneNumber)){
      alert("Formato del telefono celular incorrecto")
      return;
    }
    if(!validatePhoneNumberWithExtension(officePhone)){
      alert("Formato del telefono de oficina incorrecto")
      return;
    }
    axios.post(`https://tecportfolio-api.onrender.com/AsistenteAdministrativo/EditarProfesor/${id}`, {
      name,
      secondName,
      lastName,
      secondLastName,
      email,
      officePhone,
      phoneNumber,
      profilePic
    }).then((response) => {
      handleImage(response.data.profilePic)
      setNameTitle(response.data.name)
      setSecondNameTitle(response.data.secondName)
      setLastNameTitle(response.data.lastName)
      setSecondLastNameTitle(response.data.secondLastName)
    })
    
  }

  useEffect(()=>{
    setLoading(true)
    axios.get(`https://tecportfolio-api.onrender.com/AsistenteAdministrativo/VerDetalles/${id}`).then((response) =>{
    console.log(response.data)  
    setName(response.data.name)
    setNameTitle(response.data.name)
      setSecondName(response.data.secondName)
      setSecondNameTitle(response.data.secondName)
      setLastName(response.data.lastName)
      setLastNameTitle(response.data.lastName)
      setSecondLastName(response.data.secondLastName)
      setSecondLastNameTitle(response.data.secondLastName)
      setEmail(response.data.username)
      setOfficePhone(response.data.officePhone)
      setPhoneNumber(response.data.phoneNumber)
      setProfilePic(response.data.profilePic)
      setCampus(response.data.campus)
      setId(response.data.teacherID)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }, [])
    return (
        <div>
    <Header />
    <div className="min-h-screen bg-[#29364E] text-white">
            <div className='flex'>
            <div className='w-[575px] p-4'>
              {loading ? (
                <div>
                    <p className="font-bold text-lg mb-4">Sede: </p>
                    <p className="font-bold text-lg mb-4">Profesor(a): </p>
                    <p className="font-bold text-lg mb-4">ID: </p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-lg mb-4">Sede: {campus}</p>
                  <p className="font-bold text-lg mb-4">Profesor(a): {nameTitle} {secondNameTitle} {lastNameTitle} {secondLastNameTitle} </p>
                  <p className="font-bold text-lg mb-4">ID: {idTeacher}</p>
                </div>
              )}
                

            <div className='flex w-[1250px] bg-[#29364E] rounded-[16px] mb-3 px-5 border-2 border-[#061634]'>
            <div className="w-1/4 pt-7">
                {loading ? (
                  <div>
                      <div className="pb-6">
                        <input type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder = "Nombre"/>
                      </div>
                      <div className="pb-6">
                        <input type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder ="Apellido"/>
                      </div>
                      <div className="pb-6">
                        <input type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder= "Email"/>
                      </div>
                      <div className="pb-6">
                        <input type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="xxxx-xxxx[xxxx]"/>
                      </div>
                    </div>
                ) : (
                  <div>
                    <div className="pb-6">
                      <input onChange={(e) => setName(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" value={name}/>
                    </div>
                    <div className="pb-6">
                      <input onChange={(e) => setLastName(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" value={lastName}/>
                    </div>
                    <div className="pb-6">
                      <input onChange={(e) => setEmail(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" value={email}/>
                    </div>
                    <div className="pb-6">
                      <input onChange={(e) => setOfficePhone(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="xxxx-xxxx[xxxx]" value={officePhone}/>
                    </div>
                  </div>
                )}
                
            </div>
            <div className="w-1/4 p-4 pt-7">
              {loading ? (
                  <div>
                    <div className="pb-6">
                      <input type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="Segundo Nombre (opcional)"/>
                    </div>
                    <div className="pb-6">
                      <input type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder="Segundo Apellido"/>
                    </div>
                    <div className="pb-16">
                    </div>
                    <div className="">
                      <input type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder= "xxxx-xxxx"/>
                    </div>
                  </div>
              ) : (
                <div>
                    <div className="pb-6">
                      <input onChange={(e) => setSecondName(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" value={secondName}/>
                    </div>
                    <div className="pb-6">
                      <input onChange={(e) => setSecondLastName(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" value={secondLastName}/>
                    </div>
                    <div className="pb-16">
                    </div>
                    <div className="">
                      <input onChange={(e) => setPhoneNumber(e.target.value)} type="input" class="p-2.5 w-full z-20 text-sm text-black bg-white rounded-[16px] focus:outline-none" placeholder= "xxxx-xxxx" value={phoneNumber}/>
                    </div>
                  </div>
              )}
                
            </div>
            <div className="w-1/4 p-4 pt-7">
                {loading ? (
                  <div>
                    </div>
                ) : (
                  <div>
                    {profilePic && (
                      <div>
                          <img src={profilePic} alt="Imagen seleccionada" />
                      </div>
                    )}
                  </div>
                )}

            </div>
            <div className="w-1/4 p-4 pt-7">
                <div className='w-[calc(100%)] p-4'>
                  <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImage(e.target.files[0])}
                      className="hidden" 
                      id="fileInput" 
                  />

                  <label htmlFor="fileInput" className="mx-2 bg-[#ffffff] text-[#061931] py-1 px-4 rounded-[10px] cursor-pointer">
                      Cambiar foto
                  </label>
                </div>
              <div className='w-[calc(100%)] p-4'> 
                <button onClick={confirmChanges} className="mx-2 bg-[#ffffff] text-[#061931] py-1 px-4 rounded-[10px]">
                  Guardar cambios
                </button>
              </div>
            </div>
            
            </div>
        </div>   
        </div>
        </div>  
    </div>
    )
}

export default AACInfoProfe
