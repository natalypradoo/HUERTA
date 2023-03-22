import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom"
//import  {} from '../../styles.css/plantilla.css';
import * as API from '../../servicios/servicios';


export function MisPlantas(){

    const {id_usuario}= useParams();
    const {id_huerta}= useParams();
    console.log('param', id_usuario)
    console.log('param', id_huerta)


    const [mis_plantas,setMisPlantas]=useState([]);

    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')


    useEffect(()=>{
        API.getMisPlantas(id_usuario,id_huerta).then(setMisPlantas)
        console.log(mis_plantas)

      },[]);

//baja de Plantas
const bajaMisPlantas  = async(id_hp)=>{
    //console.log('id_usu:', id_usuario)
        const user = await API.BajaMisPlantas(id_hp)
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

    //alta de Plantas
    const altaMisPlantas  = async(id_hp)=>{
        //console.log('id_usu:', id_usuario)
         const user = await API.AltaMisPlantas(id_hp)
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
        {/* <small id="helpId" className="text-muted">&nbsp;</small>
        <Link name="" id="" className="btn btn-primary" to={`/mihuerta/${id_usuario}/${id_huerta}/listaUsuariosHuerta`} role="button">Colaboradores</Link>
        <small id="helpId" className="text-muted">&nbsp;</small> */}

        <div className="row">
                    <div className="col-10">
                    <Link name="" id="" className="btn btn-primary" to={`/mihuerta_listaPlantas/${id_huerta}`} role="button">Agregar Planta</Link>
                    </div>
  
                    <div className="col-2">
                    <Link name="" id="" className="btn btn-dark" to={`/mihuerta/${id_usuario}`} role="button">Volver</Link>
                    </div>
                </div>
            <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mis_plantas.map((mis_plantas)=>(
 
                        <tr key={mis_plantas.id_planta}>
                        <td scope="row">{mis_plantas.id_planta}</td>
                        <td scope="row">{mis_plantas.nombre}</td>
                        <td scope="row">{mis_plantas.fecha}</td>


                            
                        
                        <td>
                            <div className="btn-group" role="group" aria-label="">
                                { (mis_plantas.estado=='A')?
                                <>
                                <button onClick={() =>bajaMisPlantas(mis_plantas.id_hp)} type="button" className="btn btn-outline-danger"> Baja </button>
                                <Link to={`/mihuerta_comentarios/${id_usuario}/${id_huerta}/${mis_plantas.id_hp}`}>
                                <button  type="button" className="btn btn-primary"> Comentarios </button>
                                </Link>


                                </>
                                : 
                                <>
                                <button onClick={() =>altaMisPlantas(mis_plantas.id_hp)} type="button" className="btn btn-outline-success"> Alta </button>
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