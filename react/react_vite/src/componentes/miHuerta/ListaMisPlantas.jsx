import { useEffect } from 'react'
import { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function ListaMisPlantas(){
    //busqueda
    const [nombre, setNombre]=useState([]);
    const [epoca, setEpoca]=useState([]);
    const [luna, setLuna]=useState([]);

    //const {id_huerta}= useParams();
    const [plantas,setPlantas]=useState([]);
    const [mensajeError,setmensajeError]=useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('')


    const[id_usuario,setIdUsuario]=useState('')
    const [usuario, setUsuario] =useState('');
    const [nombre_usuario, setNombreUsuario] =useState('')
    useEffect(()=>{
        API.getPlantas().then(setPlantas)


        
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
       // console.log('WEP',usuarioLogueado.datos[0].username)
        if(usuarioLogueado){
          setIdUsuario(usuarioLogueado.datos[0].id_usuario);
          setNombreUsuario(usuarioLogueado.datos[0].username);
      
        }
    },[])
    const {id_huerta}= useParams();
    
    
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
                <div className='row'>
                    <div className='col-10'>
                    <Link name="" id="" className="btn btn-primary" to={'/crearPlanta'} role="button">Nueva Planta</Link>
                    </div>
                    <div className='col-2'>
                    <Link name="" id="" className="btn btn-dark" to={`/mihuerta/${id_usuario}/${id_huerta}`} role="button">Volver</Link>
                    </div>
                </div>
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
                            <th>Acciones</th>

            
                         </tr>
                    </thead>
                    <tbody>
                         {plantas.map((planta)=>(
                            <tr key={planta.id_planta}>


                            
                            
                            { (planta.estado=='A')?
                                <>
                                
                                <td scope="row">{planta.id_planta}</td>
                                <td>{planta.nombre}</td>
                                <td>{planta.epoca}</td>
                                <td>{planta.luna}</td>
                                <td>{planta.forma}</td>
                                <td>{planta.comentario}</td>
                                <td><span className="badge bg-primary rounded-pill">{planta.Comentarios}</span></td>
                                <td>
                                <Link to={`/mihuerta_agregarPlanta/${id_huerta}/${planta.id_planta}`}>
                                <button type="button" className="btn btn-warning"> Agregar a mi huerta </button>                       
                                </Link>
                                </td>
                                {/* <Link to={`/crear_comentario/${planta.id_planta}`}>
                                <button  type="button" className="btn btn-primary"> Comentar </button>                       
                                </Link> */}
                                </>
                                : 
                                <>

                                </>
                            } 
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