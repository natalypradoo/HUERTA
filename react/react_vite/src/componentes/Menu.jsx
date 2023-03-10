import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Principal } from './Principal'
//import "./login/login.css";

export function Menu(){
  const [usuario, setUsuario] =useState('');
  const [nombre_usuario, setNombreUsuario] =useState('')
  const logout  = async (event)=>{
          setUsuario('')
          window.localStorage.removeItem('usuario')
          window.location.reload(true);
  }
  useEffect(()=>{
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    if(usuarioLogueado){
      setNombreUsuario(usuarioLogueado.datos[0].nombre_usuario)
    }
  },[]);
    return(
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Huerta</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
      <Link className="nav-link" to={'/'}>Inicio</Link>
       
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Huertas
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to={'/listarHuertas'}>Lista de Huertas</Link>
          <Link className="dropdown-item" to={'/crearHuerta'}> Crear Huerta</Link> 
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Plantas
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to={'/listarPlantas'}>Lista de Plantas</Link>
          <Link className="dropdown-item" to={'/crearPlanta'}>Agregar Planta</Link> 
          <Link className="dropdown-item" to={'/comentarios'}>Comentarios</Link> 
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Usuarios
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to={'/listarUsuarios'}>Lista de Usuarios</Link>
          <Link className="dropdown-item" to={'/Registro'}> Agregar Usuario</Link> 

        </div>
      </li>
      <li className="nav-item active">
        {nombre_usuario}

        <Link to={'/'}><button onClick={logout} className='btn btn-danger btn-sm'> Salir</button></Link>
      </li>
    </ul>
  </div>
</nav>
{/* <Principal/> */}
</>
    )
}