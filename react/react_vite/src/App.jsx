import {Routes,Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { Principal } from './componentes/Principal'
import { Menu } from './componentes/Menu'
import { Registro } from './componentes/Registro'
import {LoginForm} from './componentes/login/LoginForm'
import { ListaHuertas } from './componentes/huerta/ListaHuertas'
import { CreaHuerta } from './componentes/huerta/CreaHuerta'
import { ListaUsuarios } from './componentes/usuarios/ListaUsuarios'
import { ListaPlantas } from './componentes/plantas/ListaPlantas'
import { CrearPlanta } from './componentes/plantas/crearPlanta'
import { AgregarComentario } from './componentes/plantas/agregarComentario'
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
        <Route path='/comentar' element={<AgregarComentario/>}> </Route>
        
       
      </Routes>
</div>
    }    
    </>
  )
}

export default App