import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import logo from '../images/LOGOTEC.png'


const Restore = () => {
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {id} = useParams()

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post(`http://localhost:5555/users/restore/${id}`, {
        password,
      }).then(response => {
        if(response.data.status){
          if(response.data.status === "Success") {
            alert("Contraseña cambiada exitosamente, ahora será redirigido a la pestaña de inicio de sesión.")
            navigate('/')
          }   
          else if(response.data.status === "Invalid Password")
            alert("La contraseña debe contener solo números y debe de tener 8 números de longitud.")
        }
      }).catch(err => {
        console.log(err)
      })
    }

  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };


  
  return (
    <div className="flex justify-center items-center h-screen bg-[#29364E] font-['helvetica'] text-[18px]">
      <div className="w-483px m-auto bg-[#29364E] rounded p-5">
        <header className="text-white text-center">
          <img src={logo} alt=""/>
        </header>
        <form>
          <div class="flex flex-col items-center">
              {/* Modal para recuperación de contraseña */}
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#29364E] bg-opacity-50 ">
                  <div className="bg-[#29364E] p-8 rounded-md">
                    <h2 className="text-white font-semibold mb-4">Nueva contraseña</h2>
                    <form>
                      <input type="password" name="email" id="email" placeholder="" onChange={(e) => setPassword(e.target.value)} className="placeholder-white pl-[20px] h-52px w-full p-2 mb-6 text-white outline-none bg-[#747C8C] rounded-[12px]" required />
                      <div className="flex justify-center">
                      <button onClick={handleSubmit} className="w-169px h-62px bg-white text-[#29364E] font-bold py-2 px-4 mb-6 rounded">Confirmar Contraseña</button>
                      </div>
                    </form>
                  </div>
                </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Restore