import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function ListaPlantas(){
    const [plantas,setPlantas]=useState([]);
    const [mensajeError,setmensajeError]=useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    useEffect(()=>{
        API.getPlantas().then(setPlantas)
    },[])

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
                            <td><span class="badge bg-primary rounded-pill">{planta.Comentarios}</span></td>

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
        
    )
}