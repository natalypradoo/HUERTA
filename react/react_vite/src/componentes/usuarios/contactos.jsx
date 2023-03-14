import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom';
import * as API from '../../servicios/servicios';

export function Contactos(){
    const [usuarios,setUsuarios]=useState([]);

    useEffect(()=>{
        API.getContacto().then(setUsuarios)
    },[])



    return(
    <>
            <div className="card">
        <div className="card-header">
            Listado de Usuarios
        </div>
        <div className="card-body">
        <Link name="" id="" className="btn btn-light" to={'/registro'} role="button">Nuevo Usuario</Link>
            <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                     <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Nombre</th>
                         <th>Email</th> 
                         <th>Acciones</th>
                     </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario)=>(
                            <tr>
                            <td scope="row">{usuario.id_usuario}</td>
                            <td scope="row">{usuario.username}</td>
                            <td scope="row"> {usuario.nombre}</td>
                            <th scope="row">{usuario.contacto}</th>
                             
                            <td>
                            </td>
                             </tr>
                             ))}
                    
                </tbody>
            </table>
        </div>
        </div>
        <div className="card-footer text-muted">
        Mi Huerta - Silicon Misiones
        </div>

    </>
    )
};