import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import {useState} from 'react'
import * as API from '../servicios/servicios'
export function ListaUsuarios(){
    const [usuarios,setUsuarios]=useState([]);
    useEffect(()=>{
        API.getUsuarios().then(setUsuarios)
    },[])
    return(
        <div className="card">
        <div className="card-header">
            Listado de Usuarios
        </div>
        <div className="card-body">
        <Link name="" id="" className="btn btn-primary" to={'/crearUsuario'} role="button">Nuevo Usuario</Link>
            <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                     <tr>
                        <th>Username</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>

        
                     </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuarios)=>(
                        <tr>
                        <td scope="row">{usuarios.username}</td>
                        <td scope="row"> {personas.nombre}</td>
                        <td scope="row">{personas.apellido}</td>
                        <td scope="row">{personas.email}</td>

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