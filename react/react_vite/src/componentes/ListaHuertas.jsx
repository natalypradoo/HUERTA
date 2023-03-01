import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import * as API from '../servicios/servicios'
export function ListaHuertas(){
    const [huerta,setHuertas]=useState([]);
    useEffect(()=>{
        API.getHuertas().then(setHuertas)
    },[])
    return(
        <div className="card">
            <div className="card-header">
                Listado de Huertas
            </div>
            <div className="card-body">
                <Link name="" id="" className="btn btn-primary" to={'/crearHuerta'} role="button">Nueva Huerta</Link>
                <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                     <tr></tr>
                         <tr>
                            <th>Nombre</th>
                            <th>Localidad</th>
                            <th>Usuarios</th>
                             <th>Acciones</th>
            
                         </tr>
                    </thead>
                    <tbody>
                        {huerta.map((huerta)=>(
                            <tr>
                            <td scope="row">{huerta.nombre}</td>
                            <td scope="row">{huerta.localidad}</td>
                            <td scope="row">{huerta.id_huerta}</td>
                            <td>
                            <div className="btn-group" role="group" aria-label="">
                                <button type="button" className="btn btn-success">Editar</button>
                                <Link name="" id="" className="btn btn-danger" to={'/eliminarHuerta'} role="button">Eliminar</Link>
                                
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
}