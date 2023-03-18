import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import icono from './styles.css/icono.png'
//import { Principal } from './Principal'
//import "./login/login.css";

export function Menu(){
  const[id_usuario,setIdUsuario]=useState('')
  const [usuario, setUsuario] =useState('');
  const [nombre_usuario, setNombreUsuario] =useState('')
  const logout  = async (event)=>{
          setUsuario('')
          window.localStorage.removeItem('usuario')
          window.location.reload(true);
  }
  useEffect(()=>{
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    //console.log(usuarioLogueado.datos[0].username)
    if(usuarioLogueado){
      setIdUsuario(usuarioLogueado.datos[0].id_usuario);
      setNombreUsuario(usuarioLogueado.datos[0].username);
  
    }
  },[]);
    return(
      <>
      <div className='row'>
       
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

        <div className='col-1'>
        <small id="helpId" className="text-muted">&nbsp;</small>
        <small id="helpId" className="text-muted">&nbsp;</small>
        <small id="helpId" className="text-muted">&nbsp;</small>
          <a className="navbar-brand" href="#"><img src={icono} width="50" height="50" /></a> 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
        </div>

        <div className="collapse navbar-collapse row" id="navbarNavDropdown">
        <ul className="navbar-nav">

        <div className='col-1'>
          <li className="nav-item active">
          <Link className="nav-link" to={'/'}>Inicio</Link>
          </li>
        </div>

        <div className='col-2'>
          <li className="nav-item active">
          <Link className="nav-link" to={'/mihuerta'}>Mi Huerta</Link>
          </li>
        </div>


        <div className='col-2'>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Huertas
            </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to={'/listarHuertas'}>Lista de Huertas</Link>
           {/* <Link className="dropdown-item" to={'/crearHuerta'}> Crear Huerta</Link>  */}
          </div>
          </li>
        </div>


      <div className='col-2'>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Plantas
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to={'/listarPlantas'}>Lista de Plantas</Link>
          <Link className="dropdown-item" to={'/crearPlanta'}>Agregar Planta</Link> 
          {/* <Link className="dropdown-item" to={'/comentarios'}>Comentarios</Link>  */}
        </div>
      </li>
      </div>

<div className='col-2'>
<li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Usuarios
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to={'/listarUsuarios'}>Lista de Usuarios</Link>
          <Link className="dropdown-item" to={'/Registro'}> Agregar Usuario</Link> 
          {/* <Link className="dropdown-item" to={'/contacto'}> Contactos</Link> */}
        </div>
</li>
</div>

  <div className='col-2'>
    <li className="nav-item active">
      <a href="">Hola, {nombre_usuario}!</a>
    </li> 
  </div>  

          <small id="helpId" className="text-muted">&nbsp;</small>
          <small id="helpId" className="text-muted">&nbsp;</small>
  <div className='col-1'>
      <li className="nav-item active">
        <Link to={'/'}><button onClick={logout} className='btn btn-outline-danger'> Salir</button></Link>
      </li>
  </div>

    </ul>
  </div>
</nav>
<small id="helpId" className="text-muted">&nbsp;</small>
</div>
{/* <Principal/> */}
</>
    )
}