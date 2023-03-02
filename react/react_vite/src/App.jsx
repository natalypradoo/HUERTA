import {Routes,Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { Principal } from './componentes/Principal'
import { Menu } from './componentes/Menu'
import {LoginForm} from './componentes/login/LoginForm'
import { ListaHuertas } from './componentes/huerta/ListaHuertas'
import { CreaHuerta } from './componentes/huerta/CreaHuerta'
import { EliminarHuerta } from './componentes/huerta/eliminarHuerta'
import { ListaUsuarios } from './componentes/usuarios/ListaUsuarios'
import { CreaUsuario } from './componentes/usuarios/CreaUsuario'
import { ListaPlantas } from './componentes/plantas/ListaPlantas'
// import { CrearPlanta } from './componentes/plantas/crearPlanta', <Route path='/crearPlanta' element={<crearPlanta/>}> </Route>
// import { AgregarComentario } from './componentes/plantas/agregarComentario' , <Route path='/comentar' element={<agregarComentario/>}> </Route>

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
      <LoginForm/>:
<div className='container'>
<Menu/>
<Routes>
        <Route path='/' element={<Principal/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>   
        <Route path='/listarHuertas' element={<ListaHuertas/>}> </Route>
        <Route path='/crearHuerta' element={<CreaHuerta/>}> </Route>
        <Route path='/eliminarHuerta' element={<EliminarHuerta/>}> </Route>
        <Route path='/listarUsuarios' element={<ListaUsuarios/>}> </Route>
        <Route path='/crearUsuario' element={<CreaUsuario/>}> </Route>
        <Route path='/listarPlantas' element={<ListaPlantas/>}> </Route>
        
       
      </Routes>
</div>
    }    
    </>
  )
}

export default App