import {Routes,Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { ListaHuertas } from './componentes/ListaHuertas'
import { Principal } from './componentes/Principal'
import { CreaHuerta } from './componentes/CreaHuerta'
import { ListaUsuarios } from './componentes/ListaUsuarios'
import {CreaUsuario} from './componentes/CreaUsuario'
import {LoginForm} from './componentes/LoginForm'
import { Menu } from './componentes/Menu'
import { EliminarHuerta } from './componentes/eliminarHuerta'


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
        <Route path='/eliminarHuerta' element={<EliminarHuerta/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>   
      </Routes>
</div>
    }    
    </>
  )
}

export default App