import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom"
//import  {} from '../../styles.css/plantilla.css';
import * as API from '../../servicios/servicios';


export function MisComentarios(){

    const {id_usuario}= useParams();
    const {id_huerta}= useParams();
    const {id_hp}=useParams();
    console.log('param', id_usuario)
    console.log('param', id_huerta)
    console.log('param', id_hp)

    const [mis_comentarios,setMisComentarios]=useState([]);

    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')


    useEffect(()=>{
        API.getMisComentarios(id_usuario,id_huerta,id_hp).then(setMisComentarios)
        console.log(mis_comentarios)

      },[]);

    return(
        <>
        <div className="card-body">
        <div className="card-header">
                Sus anotaciones son:
            </div>
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
        <Link name="" id="" className="btn btn-primary" to={'/'} role="button">Agregar Anotación</Link>
        <small id="helpId" className="text-muted">&nbsp;</small>
        <Link name="" id="" className="btn btn-primary" to={`/mihuerta/${id_usuario}/${id_huerta}/listaUsuariosHuerta`} role="button">Colaboradores</Link>
        <small id="helpId" className="text-muted">&nbsp;</small>
        <Link name="" id="" className="btn btn-primary" to={`/mihuerta/${id_usuario}/${id_huerta}`} role="button">
         Volver 
        </Link>
            <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                    <tr>
                        <th>ID</th>
                        <th>Comentario</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mis_comentarios.map((mis_comentarios)=>(
 
                        <tr key={mis_comentarios.id_c_hp}>
                        <td scope="row">{mis_comentarios.id_planta}</td>
                        <td scope="row">{mis_comentarios.comentario}</td>
                        <td scope="row">{mis_comentarios.fecha}</td>


                            
                        
                        <td>
                            <div className="btn-group" role="group" aria-label="">
                                { (mis_comentarios.estado=='A')?
                                <>
                                <button  type="button" className="btn btn-outline-danger"> Baja </button>
                                <Link >
                                <button  type="button" className="btn btn-primary"> Modificar </button>
                                </Link>


                                </>
                                : 
                                <>
                                <button  type="button" className="btn btn-outline-success"> Alta </button>
                                </>
                                }
                            </div>
                            </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
     <div className="card-footer text-muted ">
         Mi Huerta - Silicon Misiones
     </div>
    
</>

    );
}