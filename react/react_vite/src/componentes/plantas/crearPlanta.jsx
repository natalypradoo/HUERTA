import React, { useState, useEffect } from 'react'
import { Link, useParams} from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function CrearPlanta(){
    const {id_usuario} = useParams();
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    const [epoca, setepoca] = useState('');
    const [nombre, setNombre] = useState('');
    const [luna, setluna] = useState('');
    const [forma, setforma] = useState('');
    const [comentario, setcomentario] = useState('');
    
    useEffect(()=>{
        crearPlanta(id_usuario)
    },[])

    const crearPlanta = async (event)=>{
        event.preventDefault();
        const datos_planta={
            nombre: nombre,
            epoca: epoca,
            luna: luna,
            forma: forma,
            comentario:comentario
        };

        console.log(datos_planta)
        API.SavePlanta(datos_planta);
        setmensajeSuccess('Se agrego la planta correctamente')
            setTimeout(()=>{
                setmensajeSuccess('')
         //       window.location.href('/plantas')
            }, 2000)            
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

            <div className="card-body">
                <div className='row'>

                <div className="form-group" >
                  <label for="">Nombre</label>
                  <input required
                  type="text"
                   value={nombre} 
                   onChange={(event)=>setNombre(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                 
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
                </div>
                <div className="form-group">
                  <label for="">Forma de plantación</label>
                  <select onChange={(event)=>setforma(event.target.value)} className='form-control'>
                        <option>Seleccionar filtro</option>
                        <option value='directa'>Directa</option>
                        <option value='germinación'>Germinación</option>
                    </select>
                </div>
                <div className="form-group">
                  <label for="">Mejor Fase Lunar para plantar</label>
                  <select onChange={(event)=>setluna(event.target.value)} className='form-control'>
                        <option>Seleccionar filtro</option>
                        <option value='Cuarto Creciente'>Cuarto Creciente</option>
                        <option value='Luna Llena'>Luna Llena</option>
                        <option value='Cuarto Menguante'>Cuarto Menguante</option>
                        <option value='Luna Nueva'>Luna Nueva</option>
                    </select>

                </div>
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
                        <button  onClick={crearPlanta}  type="button" className="btn btn-success">Guardar</button>
                        <small id="helpId" className="text-muted">&nbsp;</small>
                        <Link to={'/listarPlantas'}><button type="button" className="btn btn-danger">Volver al listado</button></Link>
                    </div>
                </div>
            </div>
            <div className="card-footer text-muted">
               Mi Huerta
            </div>
        </div>
    )
}