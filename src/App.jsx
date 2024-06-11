import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AACEquipoTrabajo from './pages/AACEquipoTrabajo'
import AACInfoProfe from './pages/AACInfoProfe'
import AACListaEstudiantes from './pages/AACListaEstudiantes'


import AAEquipoTrabajo from './pages/AAEquipoDeTrabajo'
import AAInfoProfe from './pages/AAInfoProfe'
import AAInformacionDeActividad from './pages/AAInformacionDeActividad'
import AAListaEstudiantes from './pages/AAListaEstudiantes'
import AAPlanDeTrabajo from './pages/AAPlanDeTrabajo'


import PGCEquipoTrabajo from './pages/PGCEquipoTrabajo'
import PGCListaEstudiantes from './pages/PGCListaEstudiantes'
import PGCInfoProfeConsulta from './pages/PGCInfoProfeConsulta'
import PGCEditarInformacionEstudiante from './pages/PGCEditarInformacionEstudiante'
import PGCPlanDeTrabajo from './pages/PGCPlanDeTrabajo'
import PGCAGPlanDeTrabajo from './pages/PGCAGPlanDeTrabajo'
import PGCActividad from './pages/PGCActividad'
import PGCPlandeTrabajo from './pages/PGCMDPlanDeTrabajo'

import PGEquipoTrabajo from './pages/PGEquipoTrabajo'
import PGListaEstudiantes from './pages/PGListaEstudiantes'
import PGEditarInformacionEstudiante from './pages/PGEditarInformacionEstudiante'
import PGInfoProfeConsulta from './pages/PGInfoProfeConsulta'
import PGPlanDeTrabajo from './pages/PGPlandeTrabajo'
import PGActividad from './pages/PGActividad'




import Restore from './pages/RestorePass'
import AACInformacionDeActividad from './pages/AACInformacionDeActividad'
import AACPlanDeTrabajo from './pages/AACPlanDeTrabajo'


import ActivityCalendar from './pages/ActivityCalendar'
import EInfoEstudiante from './pages/EInfoEstudiante'


const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/RestorePassword/:id' element={<Restore/>}/>

      <Route path='AsistenteAdministrativoCartago/EquipoDeTrabajo' element={<AACEquipoTrabajo />} />
      <Route path='AsistenteAdministrativoCartago/Estudiantes' element={<AACListaEstudiantes />} />
      <Route path='AsistenteAdministrativoCartago/VerDetalles/:id' element={<AACInfoProfe />} />
      <Route path='AsistenteAdministrativoCartago/PlanDeTrabajo/VerDetalles/:id' element={<AACInformacionDeActividad />} />
      <Route path='AsistenteAdministrativoCartago/PlanDeTrabajo' element={<AACPlanDeTrabajo/>} />

      
      <Route path='AsistenteAdministrativo/EquipoDeTrabajo' element={<AAEquipoTrabajo/>} />
      <Route path='AsistenteAdministrativo/Estudiantes' element={<AAListaEstudiantes/>} />
      <Route path='AsistenteAdministrativo/VerDetalles/:id' element={<AAInfoProfe />} />
      <Route path='AsistenteAdministrativo/PlanDeTrabajo/VerDetalles/:id' element={<AAInformacionDeActividad />} />
      <Route path='AsistenteAdministrativo/PlanDeTrabajo' element={<AAPlanDeTrabajo/>} />
      
      <Route path='ProfesorGuia/EquipoDeTrabajo' element={<PGEquipoTrabajo/>} />
      <Route path='ProfesorGuia/VerDetalle/:id' element={<PGInfoProfeConsulta/>} />
      <Route path='ProfesorGuia/Estudiantes' element={<PGListaEstudiantes/>} />
      <Route path='ProfesorGuia/Estudiantes/VerDetalles/:id' element={<PGEditarInformacionEstudiante/>} />
      <Route path='ProfesorGuia/PlanDeTrabajo' element={<PGPlanDeTrabajo/>} />
      <Route path='ProfesorGuia/PlanDeTrabajo/VerDetalles/:id' element={<PGActividad/>} />


      
      <Route path='ProfesorGuiaCoordinador/EquipoDeTrabajo' element={<PGCEquipoTrabajo/>} />
      <Route path='ProfesorGuiaCoordinador/Estudiantes' element={<PGCListaEstudiantes/>} />
      <Route path='ProfesorGuiaCoordinador/Estudiantes/VerDetalles/:id' element={<PGCEditarInformacionEstudiante/>} />
      <Route path='ProfesorGuiaCoordinador/VerDetalles/:id' element={<PGCInfoProfeConsulta/>} />
      <Route path='ProfesorGuiaCoordinador/PlanDeTrabajo' element={<PGCPlanDeTrabajo/>} />
      <Route path='ProfesorGuiaCoordinador/PlanDeTrabajo/Crear' element={<PGCAGPlanDeTrabajo/>} />
      <Route path='ProfesorGuiaCoordinador/PlanDeTrabajo/VerDetalles/:id' element={<PGCActividad/>} />
      <Route path='ProfesorGuiaCoordinador/PlanDeTrabajo/Editar/:id' element={<PGCPlandeTrabajo/>} />


      <Route path='Estudiantes/Calendario' element={<ActivityCalendar/>}/>
      <Route path='Estudiantes/MiPerfil' element={<EInfoEstudiante/>}/>
      
    </Routes>
  )
}

export default App
