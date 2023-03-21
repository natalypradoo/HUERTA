import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom'
import * as API from '../../servicios/servicios'



export function MisUsuarios(){

    const {id_usuario}= useParams();
    const {id_huerta}= useParams();
    console.log('param', id_usuario);
    console.log('param', id_huerta);

    const [mis_usuarios,setMisUsuarios]=useState([]);

    const [mensajeError, setmensajeError] = useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('');


    useEffect(()=>{
        API.getMisUsuarios(id_usuario,id_huerta).then(setMisUsuarios)
        console.log(mis_usuarios)

    },[]);

//baja de Usuario
const bajaMisUsuarios  = async(id_uh)=>{
    //console.log('id_usu:', id_usuario)
        const user = await API.BajaMisUsuarios(id_uh)
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

    //alta de Huerta
    const altaMisUsuarios = async(id_uh)=>{
        //console.log('id_usu:', id_usuario)
         const user = await API.AltaMisUsuarios(id_uh)
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
        <div className="card-body">
        <div className="card-header">
                Las Plantas en la huerta son:
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
        <Link name="" id="" className="btn btn-primary" to={'/'} role="button">Agregar Colaborador</Link>
        <small id="helpId" className="text-muted">&nbsp;</small>
        <Link name="" id="" className="btn btn-primary" to={`/mihuerta/${id_usuario}`} role="button">
         Volver 
        </Link>
            <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                    <tr>
                        <th>ID</th>
                        <th>Colaborador</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mis_usuarios.map((mis_usuarios)=>(
 
                        <tr key={mis_usuarios.id_uh}>
                        <td scope="row">{mis_usuarios.id_uh}</td>
                        <td scope="row">{mis_usuarios.username}</td>
                        <td>
                            <div className="btn-group" role="group" aria-label="">
                                { (mis_usuarios.estado=='A')?
                                <>
                                <button onClick={() =>bajaMisUsuarios(mis_usuarios.id_uh)}  type="button" className="btn btn-outline-danger"> Baja </button>
                                {/* <Link to={`/mihuerta/${id_usuario}/${id_huerta}`}>
                                <button  type="button" className="btn btn-primary"> Comentarios </button>
                                </Link> */}


                                </>
                                : 
                                <>
                                <button onClick={() =>altaMisUsuarios(mis_usuarios.id_uh)} type="button" className="btn btn-outline-success"> Alta </button>
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