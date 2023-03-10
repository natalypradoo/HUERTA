import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'


export function ListaComentario(){
    const [comentarios,setComentario]=useState([]);
    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess] = useState('')

    useEffect(()=>{
        API.getComentario().then(setComentario)
    },[])

    const bajaComentario  = async(id_cp)=>{
        const comentario = await API.Bajacomentario(id_cp)
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

                {
                    mensajeSuccess?
                    <div class="alert alert-success" role="alert">
                     {mensajeSuccess}
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
                        <th>Estado</th>
        
                     </tr>
                </thead>
                <tbody>
                    {comentarios.map((comentario)=>(
                        <tr>
                        <td scope="row">{comentario.id_pc}</td>
                        <td>{comentario.nombre}</td>
                        <td>{comentario.comentario}</td>
                        <td>{comentario.estado}</td>

                        <td>
                        <div className="btn-group" role="group" aria-label="">
                        
                            <button onClick={() => bajaComentario(comentario_planta.id_cp)} type="button" className="btn btn-danger">Eliminar</button>
                            <button type="button" className="btn btn-success">Editar</button>
                        
                        </div>  
                        </td>
                    </tr>
                    ))};
                </tbody>
            </table>
        </div>
        <div className="card-footer text-muted">
            by Natalila
        </div>
    </div>
    
)}