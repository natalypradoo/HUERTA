import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function ListaUsuarios(){
    const [usuarios,setUsuarios]=useState([]);
    
//para buscar usuaario

    const [username, setUsername]=useState('');
    const [nombre, setNombre]=useState('');
    const [apellido,setApellido]=useState('');

    
    useEffect(()=>{
        API.getUsuarios().then(setUsuarios)
    },[])

//funcion para buscar usuario
const buscar_usuario = ()=>{

    const filtros={
        username: username,
        nombre: nombre,
        apellido: apellido,
    };
   // console.log('le manda los filtros',filtros)
    API.BuscarUsuarios(filtros).then(setUsuarios);
   
}
const limpiar_filtros = ()=>{
    setApellido('');
    setNombre('');
    setUsername('');

    API.getUsuarios().then(setUsuarios)
   
}

// //contacto
// const trae_contacto= async(id_usuario)=>{
//  //    setContacto(id_usuario)
//      const user= await API.getUsuariosContactoById(id_usuario)
// console.log('El id del contacto es: ',id_usuario)

    
// }



    return(
    <>
            <div className="card">
                <div className="card-header">
                    Filtros de busqueda
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-2'>
                            <label>Username </label>
                            <input 
                             id='username'
                             className='form-control'
                             value={username} 
                             onChange={(event)=>setUsername(event.target.value)}
                            />
                        </div>
                        <div className='col-2'>
                            <label>Nombre</label>
                            <input 
                             id='nombre'
                             className='form-control'
                             value={nombre} 
                             onChange={(event)=>setNombre(event.target.value)}
                            />

                        </div>
                        <div className='col-2'>
                            <label>Apellido </label>
                            <input 
                            id='apellido'
                             className='form-control'
                            value={apellido} 
                            onChange={(event)=>setApellido(event.target.value)}
                            />

                        </div>
                        <div className='col-1'>
                        </div>
                        <div className='col-2'>
                            <button onClick={buscar_usuario} className='btn btn-primary'>Buscar</button>
                        </div>
                        <div className='col-2'>
                            <button  onClick={limpiar_filtros} className='btn btn-dark'>Limpiar Filtros</button>                    
                        </div> 

                        
                    </div>

                    
                </div>
            </div> 
            <div className="card">
        <div className="card-header">
            Listado de Usuarios
        </div>
        <div className="card-body">
        <Link name="" id="" className="btn btn-light" to={'/registro'} role="button">Nuevo Usuario</Link>
            <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                     <tr>
                        <th>id</th>
                        <th>Username</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                         <th>Email</th> 
                     </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario)=>(
                            <tr>
                            <td scope="row">{usuario.id_usuario}</td>
                            <td scope="row">{usuario.username}</td>
                            <td scope="row"> {usuario.nombre}</td>
                            <td scope="row">{usuario.apellido}</td>

                            {(usuario.contacto=='SI')?
                            <>
                                <td scope="row">{usuario.email}</td>
                                </>
                                :
                                <>
                                <td scope="row">&nbsp;</td>
                                </> 
                            } 
                             
                            <td>
                            {/* <div className="btn-group" role="group" aria-label="">
                                                    
                                                    { (usuario.contacto=='SI')?
                                                         <>
                                                         <Link to={'/contacto'}>
                                                            <button onClick={() =>trae_contacto(usuario.id_usuario)} type="button" className="btn btn-secondary"> Contacto </button>
                                                         </Link> 
                                                          </> 
                                                          :
                                                          <>
                                                         </> 
                                                          }


                                                </div> */}
                                                </td>
                                                </tr>
                                                ))}
                    
                </tbody>
            </table>
        </div>
        </div>
        <div className="card-footer text-muted">
            Mi huera
        </div>

    </>
    )
};