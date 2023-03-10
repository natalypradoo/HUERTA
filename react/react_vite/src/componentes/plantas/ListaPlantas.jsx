import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function ListaPlantas(){
    const [plantas,setPlantas]=useState([]);
    const [mensajeError,setmensajeError]=useState('');
    useEffect(()=>{
        API.getPlantas().then(setPlantas)
    },[])

    //baja de Plantas
const bajaPlantas  = async(id_plantas)=>{
    //console.log('id_usu:', id_usuario)
     const user = await API.BajaPlantas(id_plantas)
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


    return(
        <div className="card">
            <div className="card-header">
                Listado de Plantas: los datos presentes refieren a las condiciones preferibles para el plantado.
            </div>
            <div className="card-body">
 {
                    mensajeError?
                        <div className="alert alert-success" role="alert">
                        {mensajeError}
                     </div>:''
                } 
                <Link name="" id="" className="btn btn-primary" to={'/crearPlanta'} role="button">Nueva Planta</Link>
                <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                     <tr></tr>
                         <tr>
                            
                            <th>Número</th>
                            <th>Nombre</th>
                            <th>Epoca</th>
                            <th>Fase Lunar</th>
                            <th>Siembra</th>
                            <th>Extra</th>
                            <th>Comentarios</th>

            
                         </tr>
                    </thead>
                    <tbody>
                         {plantas.map((plantas)=>(
                            <tr>
                            <td scope="row">{plantas.id_planta}</td>
                            <td>{plantas.nombre}</td>
                            <td>{plantas.epoca}</td>
                            <td>{plantas.luna}</td>
                            <td>{plantas.forma}</td>
                            <td>{plantas.comentario}</td>
                            <td>{plantas.Comentarios}</td>

                            <td>
                            <div className="btn-group" role="group" aria-label="">
                            { (plantas.estado=='A')?
                                <>
                                <button onClick={() =>bajaPlantas(plantas.id_planta)} type="button" className="btn btn-danger"> Dar de Baja </button>

                                </>
                                : 
                                <>
                                <button   type="button" className="btn btn-success"> Dar de Alta </button>

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
                Mi Huerta
            </div>
        </div>
        
    )
}