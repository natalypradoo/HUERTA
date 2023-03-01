import React, { useRef } from "react";
import {Link} from 'react-router-dom'
import * as API from '../servicios/servicios'

export function CreaHuerta(){
    const nombre_huerta=useRef();
    const guardar= ()=>{
        const {nombre_huerta}= nombre.current.value;
        console.log('lo que esta ',nombre_huerta)
        const datos_enviar={
            nombre:nombre
        };
        API.SaveHuerta(datos_enviar);
        nombre_huerta.current.value=null,
        alert('se guardo correctamente')

    }
    return(
        <>
        <div className="card">
            <div className="card-header">
                Crear Huerta
            </div>
                <div className="card-body">
                <div className="form-group">
                  <label for="">Nombre de la Huerta</label>
                  <input type="text" ref= {nombre_huerta} name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                    <button onClick={guardar} type="button" className="btn btn-primary">Guardar</button>
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