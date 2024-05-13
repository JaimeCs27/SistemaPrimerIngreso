import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/LOGOTEC.png'


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate()
    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('https://tecportfolio-api.onrender.com/users/login', {
        username,
        password,
      }).then(response => {
        if(response.data.status){
          if(response.data.user.password === '1234'){
            alert("Su usuario no posee contraseña por lo cual se redireccionará a una nueva página para que digite su nueva contraseña")
            navigate(`/RestorePassword/${response.data.user._id}`)
          }else{
            localStorage.setItem('user', JSON.stringify(response.data.user))
            if(response.data.user.isAdministrative)
              if(response.data.user.campus === "Cartago")
                navigate('/AsistenteAdministrativoCartago/EquipoDeTrabajo')
              else
              navigate(`/AsistenteAdministrativo/EquipoDeTrabajo`)
            else if(!response.data.user.isCoord)
              navigate('/ProfesorGuia/EquipoDeTrabajo')
            else
              navigate('/ProfesorGuiaCoordinador/EquipoDeTrabajo')

          }
        }else if(response.data.message === "Contraseña Incorrecta"){
          alert("Contraseña Incorrecta")
        }
      }).catch(err => {
        console.log(err)
      })
    }


    const handleForgotPasswordClick = () => {
      setShowModal(true);
    };
  
    const handleModalClose = () => {
      setShowModal(false);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handleSubmitEmail = (e) => {
      e.preventDefault();
      console.log('restore')
      console.log(email)
      axios.post('https://tecportfolio-api.onrender.com/users/RestorePassword', {
        email
      }).then((response) => {
        console.log(response.data)
      })
      setShowModal(false);
      setEmail('');
    };

  
  return (
    <div className="flex justify-center items-center h-screen bg-[#29364E] font-['helvetica'] text-[18px]">
      <div className="w-483px m-auto bg-[#29364E] rounded p-5">
        <header className="text-white text-center">
          <img src={logo} alt=""/>
        </header>
        <form>
          <div class="mt-10">
            <input
              className="placeholder-white pl-[20px] h-52px w-full p-2 mb-6 text-white outline-none bg-[#747C8C] rounded-[12px]"
              type="text"
              name="username"
              id="username"
              placeholder="Nombre de usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <input
              className="placeholder-white pl-[20px] h-52px w-full p-2 mb-6 text-white outline-none bg-[#747C8C] rounded-[12px]"
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div class="flex flex-col items-center">
            <button
              className="w-169px h-62px bg-white text-[#29364E] font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              onClick={handleSubmit}
            >
              Iniciar sesión
            </button>
          </div>

          <div class="flex flex-col items-center">
              <Link to="#" className="text-white hover:underline" onClick={handleForgotPasswordClick}>¿Olvidaste tu contraseña?</Link>

              {/* Modal para recuperación de contraseña */}
              {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#29364E] bg-opacity-50 ">
                  <div className="bg-[#29364E] p-8 rounded-md">
                    <h2 className="text-white font-semibold mb-4">Recuperar contraseña</h2>
                    <form >
                      <input type="email" name="email" id="email" value={email} placeholder="Correo electrónico" onChange={handleEmailChange} className="placeholder-white pl-[20px] h-52px w-full p-2 mb-6 text-white outline-none bg-[#747C8C] rounded-[12px]" required />
                      <div className="flex justify-center">
                      <button onClick={handleSubmitEmail} type="submit" className="w-169px h-62px bg-white text-[#29364E] font-bold py-2 px-4 mb-6 rounded">Enviar</button>
                      </div>
                    </form>
                    <div className="flex justify-center">
                    <button onClick={handleModalClose} className="text-sm text-white hover:underline mt-4">Cancelar</button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login