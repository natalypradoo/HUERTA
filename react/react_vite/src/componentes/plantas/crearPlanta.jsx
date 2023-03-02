import React, { useRef } from "react";
import {Link} from 'react-router-dom'
// import * as API from '../../servicios/servicios'
export function CrearPlanta(){
    const nombre_planta=useRef();
    const epoca=useRef();
    const luna=useRef();
    const forma=useRef();
    const comentario=useRef();
    const agregar= ()=>{
        const {nombre_planta}= nombre_planta.current.value;
        const {epoca}= epoca.current.value;
        const {luna}= luna.current.value;
        const {forma}= forma.current.value;
        const {comentario}= comentario.current.value;
        console.log('lo que esta ',nombre_planta)
        const datos={
            nombre:nombre_planta,
            epoca:epoca,
            luna:luna,
            forma:forma,
            comentario: comentario
        };
        API.SaveHuerta(datos);
        // nombre_huerta.current.value=null,
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
                  <input type="text" ref= {nombre_planta} name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                  <label for="">Estacion del Año conveniente</label>
                  <input type="text" ref= {epoca} name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                  <label for="">Fase Lunar para plantar</label>
                  <input type="text" ref= {luna} name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                  <label for="">Forma de plantación (directa o germinación)</label>
                  <input type="text" ref= {forma} name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                  <label for="">Comentarios Extras</label>
                  <input type="text" ref= {comentario} name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                    <button onClick={agregar} type="button" className="btn btn-primary">Guardar</button>
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
