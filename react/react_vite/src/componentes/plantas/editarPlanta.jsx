import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function EditarPlanta() {
    const {id_planta} = useParams();
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    const [epoca, setepoca] = useState('');
    const [nombre, setNombre] = useState('');
    const [luna, setluna] = useState('');
    const [forma, setforma] = useState('');
    const [mensajeError,setmensajeError]=useState('');
  
    const editar_planta =async (event) => {
      event.preventDefault();
      const planta = await API.UpdatePlanta({nombre,epoca,forma,luna})
     // console.log(usuario);
      if(planta.status){
        window.localStorage.setItem('plantas',JSON.stringify(planta));
        setepoca('')
        setforma('')
        setnombre('')
        setluna('')

        window.location.reload(true)
      }else{
        setmensajeError(planta.mensaje)
        setTimeout(()=>{
          setmensajeError('')
        },4000)
      }
    };
    return (
        <div className="card">
            <div className="card-header">
                Edicion de los datos de Planta
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

                <div className="form-group col-4" >
                  <label for="">Nombre de Planta</label>
                  <input 
                  type="text"
                   value={nombre} 
                   onChange={(event)=>setNombre(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                  <label for="">Estación del Año conveniente</label>
                  <select onChange={(event)=>setepoca(event.target.value)} className='form-control'>
                        <option>Seleccionar filtro</option>
                        <option value='VERANO'>Verano</option>
                        <option value='OTOÑO'>Otoño</option>
                        <option value='INVIERNO'>Invierno</option>
                        <option value='PRIMAVERA'>Primavera</option>
                    </select>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Fase Lunar Nueva</label>
                  <input 
                  type="text"
                   value={luna} 
                   onChange={(event)=>setluna(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                  <label for="">Forma de plantación</label>
                  <select onChange={(event)=>setforma(event.target.value)} className='form-control'>
                        <option>Seleccionar filtro</option>
                        <option value='directa'>Directa</option>
                        <option value='germinación'>Germinación</option>
                    </select>
                    <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                </div>
                
                <div className="form-group">
                   <Link to={'/listarPlantas'}><button  onClick={editar_planta}  type="button" className="btn btn-primary">Guardar</button></Link>
                    <Link to={'/listarPlantas'}><button type="button" className="btn btn-secondary">Volver al listado</button></Link>
                </div>
            </div>
            <div className="card-footer text-muted">
               Silicon Misiones
            </div>
        </div>
    )
}