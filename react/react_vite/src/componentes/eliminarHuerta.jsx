import React, { useRef } from "react";
import {Link} from 'react-router-dom'
import * as API from '../servicios/servicios'

export function EliminarHuerta(){
    const id_huerta=useRef();
    const borrar= ()=>{
        const {id_huerta}= id_huerta;
        console.log('lo que esta ',id_huerta)
        const datos_enviar={
            id_huerta:id_huerta
        };
        API.EliminarHuerta(datos_enviar);
        id_huerta.current.value=null,
        alert('se elimino correctamente')

    }
    return(
        <>
        <div className="card">
            <div className="card-header">
                Eliminar Huerta
            </div>
                <div className="card-body">
                <div className="form-group">
                  <label for="">Número de Huerta</label>
                  <input type="text" ref= {id_huerta} name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                    <button onClick={borrar} type="button" className="btn btn-primary">Borrar</button>
                    <Link to={'/listarHuertas'}><button type="button" className="btn btn-secondary">Volver al Listado</button></Link>

                </div>
                </div>
            <div className="card-footer text-muted">
                by Natalila
            </div>
        </div>
        </>
        
    )
}