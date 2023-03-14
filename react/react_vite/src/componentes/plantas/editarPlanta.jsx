import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import * as API from '../../servicios/servicios' 

export function EditarPlanta() {
    const {id_planta} = useParams();
    
    const [epoca, setEpoca] = useState('');
    const [nombre, setNombre] = useState('');
    const [luna, setLuna] = useState('');
    const [forma, setForma] = useState('');
    const [comentario, setComentario]=useState('');
    const [mensajeError,setmensajeError]=useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('')


    useEffect(()=>{
      trae_datos(id_planta)
    },[])

    const trae_datos  = async ()=>{
      // event.preventDefault();
      const datos_planta = await API.getPlantasbyId(id_planta);
     console.log(datos_planta);
      setEpoca(datos_planta.epoca);
      setNombre(datos_planta.nombre);
      setForma(datos_planta.forma);
      setLuna(datos_planta.luna);
      setComentario(datos_planta.comentario);

    }

  
    const editar_planta  = async()=>{
      const datos_enviar={
        epoca : epoca,
        nombre : nombre,
        forma : forma,
        luna : luna,
        comentario : comentario,
      };
      //console.log(datos_enviar)
      API.UpdatePlantas(id_planta,datos_enviar);
      setmensajeSuccess('La PLANTA se edito CORRECTAMENTE')
          setTimeout(()=>{
              setmensajeSuccess('')
          }, 2000)
  }
  
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
                  <select onChange={(event)=>setEpoca(event.target.value)} className='form-control'>
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
                
                  <select onChange={(event)=>setLuna(event.target.value)} className='form-control'>
                        <option value={luna}>{luna}</option>
                        <option value='Cuarto Creciente'>Cuarto Creciente</option>
                        <option value='Luna Llena'>Luna Llena</option>
                        <option value='Cuarto Menguante'>Cuarto Menguante</option>
                        <option value='Luna Nueva'>Luna Nueva</option>
                    </select>
                
                </div>

                <div className="form-group">
                  <label for="">Forma de plantación</label>
                  <select onChange={(event)=>setForma(event.target.value)} className='form-control'>
                        <option value={forma}>{forma}</option>
                        <option value='directa'>Directa</option>
                        <option value='germinación'>Germinación</option>
                    </select>
                    <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4" >
                  <label for="">Comentario Extra</label>
                  <input 
                  type="text"
                   value={comentario} 
                   onChange={(event)=>setComentario(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>


                </div>

                
                <div className="form-group">
                   <button  onClick={editar_planta}  type="button" className="btn btn-primary">Guardar</button>
                   <small id="helpId" className="text-muted">&nbsp;</small>
                    <Link to={'/listarPlantas'}><button type="button" className="btn btn-secondary">Volver al listado</button></Link>
                </div>
            </div>
            <div className="card-footer text-muted">
               Silicon Misiones
            </div>
        </div>
    )
  };