import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function ListaPlantas(){
    const [plantas,setPlantas]=useState([]);
    useEffect(()=>{
        API.getPlantas().then(setPlantas)
    },[])
    return(
        <div className="card">
            <div className="card-header">
                Listado de Plantas
            </div>
            <div className="card-body">
                <Link name="" id="" className="btn btn-primary" to={'/crearPlanta'} role="button">Nueva Planta</Link>
                <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                     <tr></tr>
                         <tr>
                            
                            <th>Número</th>
                            <th>Nombre</th>
                            <th>Estación del Año</th>
                            <th>Fase Lunar</th>
                            <th>Forma de Plantar</th>
                            <th>Comentarios</th>

            
                         </tr>
                    </thead>
                    <tbody>
                        {plantas.map((plantas)=>(
                            <tr>
                            <td scope="row">{plantas.id_planta}</td>
                            <td scope="row">{plantas.nombre}</td>
                            <td scope="row">{plantas.epoca}</td>
                            <td scope="row">{plantas.luna}</td>
                            <td scope="row">{plantas.forma}</td>
                            <td scope="row">{plantas.Comentarios}</td>

                            <td>
                            <div className="btn-group" role="group" aria-label="">
                                <button type="button" className="btn btn-success">Editar</button>
                                <Link name="" id="" className="btn btn-danger" to={'/'} role="button">Eliminar</Link>
                                
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