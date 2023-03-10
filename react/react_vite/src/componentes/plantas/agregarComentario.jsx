import React, { useRef } from "react";
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function CreaComentario(){
    const comentario=useRef();
    const guardar= ()=>{
        const {comentario}= comentario.current.value;
        console.log('lo que esta ',comentario)
        const datos_enviar={
            comentario:comentario
        };
        API.SaveComentario(datos_enviar);
        comentario.current.value=null,
        alert('se guardo correctamente')

    }
    return(
        <>
        <div className="card">
            <div className="card-header">
                Crear Comentario
            </div>
                <div className="card-body">
                <div className="form-group">
                  <label for="">Comentario Nuevo</label>
                  <input type="text" ref= {comentario} name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                    <button onClick={guardar} type="button" className="btn btn-primary">Guardar</button>
                    <Link to={'/listarComentarios'}><button type="button" className="btn btn-secondary">Volver al Listado</button></Link>

                </div>
                </div>
            <div className="card-footer text-muted">
                Mi Huerta
            </div>
        </div>
        </>
        
    )
}