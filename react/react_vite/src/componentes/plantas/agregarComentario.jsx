import React, { useState, useEffect } from 'react'
import { Link, useParams} from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function AgregarComentario(){
    const {id_planta} = useParams();
    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    const [comentario, setcomentario] = useState('');
    
    useEffect(()=>{
        AgregarComentario(id_planta)
    },[])

    const AgregarComentario = async (event)=>{
        event.preventDefault();
        const datos_comentario={
            comentario:comentario
        };
        if(datos_comentario!==0){  
        console.log(datos_comentario)
        API.SaveComentario(datos_comentario);
        setmensajeSuccess('Se agrego el comentario correctamente')
            setTimeout(()=>{
                setmensajeSuccess('')
       // window.location.href('/plantas/:id_planta')
            }, 2000)}else{
                setmensajeError('No se agrego el comentario correctamente')
                setTimeout(()=>{
                    setmensajeError('')
             //       window.location.href('/plantas')
                }, 2000)
            }          
    }
        

    return(
        <div className="card">
            <div className="card-header">
                DATOS PARA LA NUEVA PLANTA
            </div>
            {
                mensajeSuccess?
                <div className="alert alert-success" role="alert">
                    {mensajeSuccess}
                </div>:''
            }
             {
                    mensajeError?
                        <div className="alert alert-success" role="alert">
                        {mensajeError}
                     </div>:''
                } 

            <div className="card-body">
                <div className='row'>
                <div className="form-group" >
                  <label for="">Comentario Extra</label>
                  <input required
                  type="text"
                   value={comentario} 
                   onChange={(event)=>setcomentario(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                </div>
                <div className="row">
                    <div className='form-group'>
                        <button  onClick={AgregarComentario}  type="button" className="btn btn-success">Guardar</button>
                        <small id="helpId" className="text-muted">&nbsp;</small>
                        <Link to={'/comentarios'}><button type="button" className="btn btn-danger">Volver al listado</button></Link>
                    </div>
                </div>
            </div>
            <div className="card-footer text-muted">
               Mi Huerta
            </div>
        </div>
    )
}