import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function ListaUsuarios(){
    const [usuario,setUsuarios]=useState([]);
    useEffect(()=>{
        API.getUsuarios().then(setUsuarios)
    },[])
    return(
        <div className="card">
        <div className="card-header">
            Listado de Usuarios
        </div>
        <div className="card-body">
        <Link name="" id="" className="btn btn-light" to={'/registro'} role="button">Nuevo Usuario</Link>
            <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                     <tr>
                        <th>Número de usuario</th>
                        <th>Username</th>
                        <th>Nombre y Apellido</th>
                        <th>Estado</th>
                     </tr>
                </thead>
                <tbody>
                    {usuario.map((usuarios)=>(
                        <tr>
                        <td scope="row">{usuarios.id_usuario}</td>
                        <td scope="row">{usuarios.username}</td>
                        <td scope="row"> {usuarios.nombre}</td>
                        <td scope="row">{usuarios.estado}</td>

                        <td>
                        <div class="btn-group" role="group" aria-label="">
                            <button type="button" class="btn btn-success">Editar</button>
                            <button type="button" class="btn btn-danger">Eliminar</button>
                            
                        </div>  </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        <div className="card-footer text-muted">
            by Natalila
        </div>
    </div>
    )
};