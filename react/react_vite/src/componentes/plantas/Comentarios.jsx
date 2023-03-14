import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom'
import * as API from '../../servicios/servicios'


export function ListaComentario(){
    const {id_pc} = useParams();
    const [comentarios,setComentario]=useState([]);
    const [mensajeError, setmensajeError] = useState('')

    useEffect(()=>{
        API.getComentario(id_pc).then(setComentario)
    },[])

    const bajaComentario  = async(id_pc)=>{
        const comentario = await API.BajaComentario(id_pc)
        if(comentario.status){
            
            setmensajeError(comentario.mensaje)
            setTimeout(()=>{
                setmensajeError('')
             window.location.reload(true)
 
            }, 3000)
        }else{
            setmensajeError(comentario.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }
return(
    <div className="card">
        <div className="card-header">
            Listado de comentario
        </div>
        {
                    mensajeError?
                    <div class="alert alert-warning" role="alert">
                     {mensajeError}
                    </div>:''
                }
        <div className="card-body">
            <Link name="" id="" className="btn btn-primary" to={'/crearcomentario'} role="button">Nueva comentario</Link>
            <table className="table table-striped table-inverse table-responsive">
            <thead className="thead-inverse">
                 <tr></tr>
                     <tr>
                        <th>Número</th>
                        <th>Nombre de Planta</th>
                        <th>Comentario</th>
                        <th>Acciones</th>
        
                     </tr>
                </thead>
                <tbody>
                    {comentarios.map((comentario_planta)=>(
                        <tr>
                        <td scope="row">{comentario_planta.id_pc}</td>
                        <td scope="row">{comentario_planta.nombre}</td>
                        <td scope="row">{comentario_planta.comentario}</td>

                        <td>
                        <div className="btn-group" role="group" aria-label="">
                            <button onClick={() => bajaComentario(comentario_planta.id_pc)} type="button" className="btn btn-danger">Eliminar</button>
                            
                        
                        </div>  
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="card-footer text-muted">
            by Natalila
        </div>
    </div>
    
)}