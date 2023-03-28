import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function ListaPlantas(){
    //busqueda
    const [nombre, setNombre]=useState([]);
    const [epoca, setEpoca]=useState([]);
    const [luna, setLuna]=useState([]);

    const [plantas,setPlantas]=useState([]);
    const [mensajeError,setmensajeError]=useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    useEffect(()=>{
        API.getPlantas().then(setPlantas);
        
    },[])


//funcion para buscar PlanTA
const buscar_planta = ()=>{

    const filtros={
        nombre: nombre,
        epoca: epoca,
        luna: luna,
    };
   // console.log('le manda los filtros',filtros)
    API.BuscarPlantas(filtros).then(setPlantas);
}

const limpiar_filtros = ()=>{
    setNombre('');
    setEpoca('');
    setLuna('');

    API.getPlantas().then(setPlantas)   
}

    //baja de Plantas
const bajaPlantas  = async(id_planta)=>{
    //console.log('id_usu:', id_usuario)
     const user = await API.BajaPlantas(id_planta)
     // const user = await API.bajaUsuario(id)
     if(user.status){
        setmensajeError(user.mensaje)
          setTimeout(()=>{
            setmensajeError('')
             window.location.reload(true)

          }, 4000)
     }else{
         setmensajeError(user.mensaje)
         setTimeout(()=>{
             setmensajeError('')
         }, 4000)
     }
}


//Alta Plantas
const altaPlantas= async(id_planta)=>{
    //console.log('id_usu:', id_usuario)
     const user = await API.AltaPlantas(id_planta)
     // const user = await API.bajaUsuario(id)
     if(user.status){
        setmensajeSuccess(user.mensaje)
          setTimeout(()=>{
            setmensajeSuccess('')
             window.location.reload(true)

          }, 4000)
     }else{
         setmensajeError(user.mensaje)
         setTimeout(()=>{
             setmensajeError('')
         }, 4000)
     }
}

    return(
        <> 
        <div className='card'>
            <div className="card-header">
                Filtros de busqueda
            </div>
            <div className="card-body">
                <div className='row'>
                    <div className='col-2'>
                        <label>Nombre</label>
                            <input 
                             id='nombre'
                             className='form-control'
                             value={nombre} 
                             onChange={(event)=>setNombre(event.target.value)}
                            />
                    </div>
                    <div className='col-3'>
                        <label>Epoca</label>
                        <input 
                            id='epoca'
                            className='form-control'
                            value={epoca} 
                            onChange={(event)=>setEpoca(event.target.value)}
                        />
                    </div>
                    <div className='col-3'>
                        <label>Luna</label>
                            <input 
                            id='luna'
                             className='form-control'
                            value={luna} 
                            onChange={(event)=>setLuna(event.target.value)}
                            />
                    </div>
                    <div className='col-1'>
                    </div>
                    <div className='col-1'>
                    <small id="helpId" className="text-muted">&nbsp;</small>

                        <button onClick={buscar_planta} className='btn btn-primary'>Buscar</button>
                    </div>
                    <div className='col-2'>
                    <small id="helpId" className="text-muted">&nbsp;</small>
                    <small id="helpId" className="text-muted">&nbsp;</small>

                        <button  onClick={limpiar_filtros} className='btn btn-dark'>Limpiar Filtros</button>                    
                    </div>
                </div>                   
                </div>
            </div> 

            <small id="helpId" className="text-muted">&nbsp;</small>



        <div className="card">
            
            <div className="card-header">
                Listado de Plantas: los datos presentes refieren a las condiciones preferibles para el plantado.
            </div>
            <div className="card-body">
            {
                    mensajeError?
                    <div className="alert alert-warning" role="alert">
                     {mensajeError}
                    </div>:''
                }

                {
                    mensajeSuccess?
                    <div className="alert alert-success" role="alert">
                     {mensajeSuccess}
                    </div>:''
                }

                <Link name="" id="" className="btn btn-primary" to={'/crearPlanta'} role="button">Nueva Planta</Link>
                <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                     <tr></tr>
                         <tr>
                            
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Epoca</th>
                            <th>Fase Lunar</th>
                            <th>Siembra</th>
                            <th>Extra</th>
                            <th>Comentarios</th>

            
                         </tr>
                    </thead>
                    <tbody>
                         {plantas.map((planta)=>(
                            <tr key={planta.id_planta}>
                            <td scope="row">{planta.id_planta}</td>
                            <td>{planta.nombre}</td>
                            <td>{planta.epoca}</td>
                            <td>{planta.luna}</td>
                            <td>{planta.forma}</td>
                            <td>{planta.comentario}</td>
                            <td><span className="badge bg-primary rounded-pill">{planta.Comentarios}</span></td>

                            <td>
                            <div className="btn-group" role="group" aria-label="">
                            { (planta.estado=='A')?
                                <>
                                <button onClick={() =>bajaPlantas(planta.id_planta)} type="button" className="btn btn-danger"> Baja </button>
                                <Link to={`/editar_planta/${planta.id_planta}`}>
                                <button  type="button" className="btn btn-warning"> Modificar </button>                       
                                </Link>
                                {/* <Link to={`/crear_comentario/${planta.id_planta}`}>
                                <button  type="button" className="btn btn-primary"> Comentar </button>                       
                                </Link> */}
                                </>
                                : 
                                <>
                                <button onClick={() =>altaPlantas(planta.id_planta)}  type="button" className="btn btn-success"> Alta </button>

                                </>
                            }

                        
                            </div>
                            </td>
                        </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
            <div className="card-footer text-muted">
                Mi Huerta - Silicon Misiones
            </div>
        </div>
        <small id="helpId" className="text-muted">&nbsp;</small>
        </>
    )
}