import { useEffect } from 'react'
import { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function ListaMisPlantas(){
    //const {id_huerta}= useParams();
    const [plantas,setPlantas]=useState([]);
    const [mensajeError,setmensajeError]=useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    useEffect(()=>{
        API.getPlantas().then(setPlantas)
    },[])
    const {id_huerta}= useParams();


    return(
        
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
                <small id="helpId" className="text-muted">&nbsp;</small>
                <Link name="" id="" className="btn btn-primary" to={`/`} role="button">
                Volver 
                </Link>
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
                                <td><span class="badge bg-primary rounded-pill">{planta.Comentarios}</span></td>
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
        
    )
}