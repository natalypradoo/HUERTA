import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'


export function ListaHuertas(){
    const [huertas,setHuertas]=useState([]);
    const [mensajeError, setmensajeError] = useState('')


    useEffect(()=>{
        API.getHuertas().then(setHuertas)
    },[])

    const bajaHuerta  = async(id_huerta)=>{
        const huerta = await API.BajaHuerta(id_huerta)
        if(huerta.status){
            
            setmensajeError(huerta.mensaje)
            setTimeout(()=>{
                setmensajeError('')
                window.location.reload(true)
 
            }, 3000)
        }else{
            setmensajeError(huerta.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }
    const altaHuerta  = async(id_huerta)=>{
        const huerta = await API.AltaHuerta(id_huerta)
        if(huerta.status){
            
            setmensajeError(huerta.mensaje)
            setTimeout(()=>{
                setmensajeError('')
                window.location.reload(true)
 
            }, 3000)
        }else{
            setmensajeError(huerta.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }



    return(
        <div className="card">
            <div className="card-header">
                Listado de Huertas
            </div>
            {
                    mensajeError?
                    <div class="alert alert-success" role="alert">
                     {mensajeError}
                    </div>:''
                }

            <div className="card-body">
                <Link name="" id="" className="btn btn-primary" to={'/crearHuerta'} role="button">Nueva Huerta</Link>
                <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                     <tr></tr>
                         <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Localidad</th>
                             <th>Acciones</th>
            
                         </tr>
                    </thead>
                    <tbody>
                        {huertas.map((huerta)=>(
                            <tr>
                                <td scope="row">{huerta.id_huerta}</td>
                                <td scope="row">{huerta.nombre}</td>
                                <td scope="row">{huerta.localidad}</td>
                                <td>
                                <div className="btn-group" role="group" aria-label="">
                                { (huerta.estado=='A')?
                                    <>
                                        <button onClick={() =>bajaHuerta(huerta.id_huerta)} type="button" className="btn btn-danger"> Dar de Baja </button>

                                    </>
                                    : 
                                    <>
                                        <button onClick={() =>altaHuerta(huerta.id_huerta)}  type="button" className="btn btn-success"> Dar de Alta </button>

                                    </>
                                }
                                <button  type="button" className="btn btn-warning"> Modificar </button>

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
        
    )
}