import {Routes,Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { ListaHuertas } from './componentes/huerta/ListaHuertas'
import { Principal } from './componentes/Principal'
import { CreaHuerta } from './componentes/huerta/CreaHuerta'
import { ListaUsuarios } from './componentes/usuarios/ListaUsuarios'
import {CreaUsuario} from './componentes/usuarios/CreaUsuario'
import {LoginForm} from './componentes/login/LoginForm'
import { Menu } from './componentes/Menu'
import { EliminarHuerta } from './componentes/huerta/eliminarHuerta'


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
        <Route path='/listarHuertas' element={<ListaHuertas/>}> </Route>
        <Route path='/crearHuerta' element={<CreaHuerta/>}> </Route>
        <Route path='/listarUsuarios' element={<ListaUsuarios/>}> </Route>
        <Route path='/crearUsuario' element={<CreaUsuario/>}> </Route>
        <Route path='/eliminarHuerta' element={<EliminarHuerta/>}> </Route>
        <Route path='/login' element={<LoginForm/>}></Route>   
      </Routes>
</div>
    }    
    </>
  )
}

export default App