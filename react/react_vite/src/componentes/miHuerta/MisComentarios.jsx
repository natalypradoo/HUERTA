import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom"
//import  {} from '../../styles.css/plantilla.css';
import * as API from '../../servicios/servicios';


export function MisComentarios(){

    const {id_usuario}= useParams();
    const {id_huerta}= useParams();
    const {id_hp}=useParams();
    //console.log('param', id_usuario)
    //console.log('param', id_huerta)
    //console.log('param', id_hp)

    const [mis_comentarios,setMisComentarios]=useState([]);

    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')


    useEffect(()=>{
        API.getMisComentarios(id_usuario,id_huerta,id_hp).then(setMisComentarios)
        //console.log(mis_comentarios)

    },[]);

    //baja de Cmentarios
    const bajaMisComentarios  = async(id_c_hp)=>{
    //console.log('id_usu:', id_usuario)
        const user = await API.BajaMisComentarios(id_c_hp)
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

    //alta de Comentarios
    const altaMisComentarios  = async(id_c_hp)=>{
        //console.log('id_usu:', id_usuario)
         const user = await API.AltaMisComentarios(id_c_hp)
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
        <>
        <div className="card">
        <div className="card-header">
                Sus anotaciones son:
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
        <Link name="" id="" className="btn btn-primary" to={`/mihuerta_AgregarComentario/${id_huerta}/${id_hp}`} role="button">Agregar Anotación</Link>
        <small id="helpId" className="text-muted">&nbsp;</small>
        <Link name="" id="" className="btn btn-primary" to={`/mihuerta/${id_usuario}/${id_huerta}/listaUsuariosHuerta`} role="button">Colaboradores</Link>
        <small id="helpId" className="text-muted">&nbsp;</small>
        <Link name="" id="" className="btn btn-dark" to={`/mihuerta/${id_usuario}/${id_huerta}`} role="button">
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
                        <td scope="row">{mis_comentarios.id_c_hp}</td>
                        <td scope="row">{mis_comentarios.comentario}</td>
                        <td scope="row">{mis_comentarios.fecha}</td>

                        <td>
                            <div className="btn-group" role="group" aria-label="">
                                { (mis_comentarios.estado=='A')?
                                <>
                                <button onClick={() =>bajaMisComentarios(mis_comentarios.id_c_hp)} type="button" className="btn btn-outline-danger"> Baja </button>
                                <small id="helpId" className="text-muted">&nbsp;</small>
                                <Link to={`/mihuerta_EditarComentario/${mis_comentarios.id_c_hp}`}>
                                <button  type="button" className="btn btn-warning"> Modificar </button>
                                </Link>
                                <small id="helpId" className="text-muted">&nbsp;</small>


                                </>
                                : 
                                <>
                                <button onClick={() =>altaMisComentarios(mis_comentarios.id_c_hp)} type="button" className="btn btn-outline-success"> Alta </button>
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
     </div>
     <small id="helpId" className="text-muted">&nbsp;</small>
</>

    );
}