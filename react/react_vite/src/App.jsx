import {Routes,Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { Principal } from './componentes/Principal'
import { Menu } from './componentes/Menu'
import { Registro } from './componentes/login/Registro'
import {LoginForm} from './componentes/login/LoginForm'
import { ListaHuertas } from './componentes/huerta/ListaHuertas'
import { CreaHuerta } from './componentes/huerta/CreaHuerta'
import { ListaUsuarios } from './componentes/usuarios/ListaUsuarios'
import { ListaPlantas } from './componentes/plantas/ListaPlantas'
import { CrearPlanta } from './componentes/plantas/crearPlanta'
import { ListaComentario } from './componentes/plantas/Comentarios'
import { EditarUsuario } from './componentes/usuarios/EditarUsuario'
import { EditarPlanta } from './componentes/plantas/EditarPlanta'
import { EditarHuerta } from './componentes/huerta/EditarHuerta'
import { AgregarComentario } from './componentes/plantas/agregarComentario'
import { MisHuertas } from './componentes/miHuerta/MisHuertas'
// import {Contacto} from './componentes/usuarios/Contacto'
//import "./componentes/login/loginn.css";
// import { Login } from './servicios/servicios'

function App() {
  const [usuario,setUsuario]=useState('');
  useEffect(()=>{
    const usuario_logueado=JSON.parse(localStorage.getItem('usuario'))
    if(usuario_logueado){
      setUsuario(usuario_logueado)
      console.log('usuario logueado ', usuario_logueado)
    }
  },[])
  return (
    <>
    {
      !usuario?
      <>
      <Routes>
             <Route path='/' element={<LoginForm/>}></Route>
             <Route path='/registro' element={<Registro/>}></Route>
        </Routes>
      </>:
<div className='container'>
<Menu/>
<Routes>
        <Route path='/' element={<Principal/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>  
        <Route path='/registro' element={<Registro/>}></Route>
        <Route path='/listarHuertas' element={<ListaHuertas/>}> </Route>
        <Route path='/crearHuerta' element={<CreaHuerta/>}> </Route>
        <Route path='/listarUsuarios' element={<ListaUsuarios/>}> </Route>
        <Route path='/listarPlantas' element={<ListaPlantas/>}> </Route>
        <Route path='/crearPlanta' element={<CrearPlanta/>}> </Route>
        <Route path='/comentarios' element={<ListaComentario/>}></Route>
        <Route path='/crearPlanta' element={<CrearPlanta/>}> </Route>
        <Route path='/editar_usuario/:id_usuario' element={<EditarUsuario/>}></Route> 
        <Route path='/editar_planta/:id_planta' element={<EditarPlanta/>}> </Route>
        <Route path='/editar_huerta/:id_huerta' element={<EditarHuerta/>}> </Route>
        <Route path='/contacto' element={<contactos/>}> </Route>
      
        <Route path='/comentar' element={<AgregarComentario/>}> </Route>
         
        <Route path='/mihuerta' element={<MisHuertas/>}> </Route>
        {/* <Route path='/contacto' element={<Contacto/>}> </Route> */}
        
       
      </Routes>
</div>
    }    
    </>
  )
}

export default App