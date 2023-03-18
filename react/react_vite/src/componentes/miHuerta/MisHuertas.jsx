import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom"
//import  {} from '../../styles.css/plantilla.css';
import * as API from '../../servicios/servicios';
export function MisHuertas(){
    //para buscar usuaario
    const {id_usuario}= useParams();
    //console.log('param', id_usuario)

    //const [nombre_usuario, setNombreUsuario] =useState('')
    //const [id_usuario,setIdUsuario]=useState('')

    const [mis_huertas,setMisHuertas]=useState([]);
   // const [id_huerta,setIdHuerta]=useState('');
    //const [nombre,setNombre]=useState('');
    //const [localidad,setLocalidad]=useState('');
    //const [Tipos_de_Plantas,setCantPlantas]=useState('');
    //const [estado,setEstado]=useState('');
       
    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')
       
     useEffect(()=>{
       API.getMisHuertas(id_usuario).then(setMisHuertas)
    //     //console.log(mis_huertas)
    //     // const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    //     // console.log(usuarioLogueado.datos[0].id_usuario)
    //     //     if(usuarioLogueado){
    //     //         setIdUsuario(usuarioLogueado.datos[0].id_usuario);
    //     //         setNombreUsuario(usuarioLogueado.datos[0].username);
              
    //     //     }
    //     //     API.getMisHuertas(id_usuario).then(setMisHuertas)
     },[]);








return(
    <>
        <div className="card-body">
        <div className="card-header">
                Las Huertas en las que participas son:
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
        <Link name="" id="" className="btn btn-primary" to={'/'} role="button">Agregar Huerta</Link>
            <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Localidad</th>
                        <th>Número de plantas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mis_huertas.map((mis_huertas)=>(
                        <tr key={mis_huertas.id_huerta}>
                        <td scope="row">{mis_huertas.id_huerta}</td>
                        <td scope="row">{mis_huertas.nombre}</td>
                        <td scope="row">{mis_huertas.localidad}</td>
                        <td scope="row"> {mis_huertas.Tipos_de_Plantas}</td>

                            
                        
                        <td>
                            <div className="btn-group" role="group" aria-label="">
                                { (mis_huertas.estado=='A')?
                                <>
                                <button  type="button" className="btn btn-outline-danger"> Baja </button>
                                <Link to={`/mihuerta/${id_usuario}/${mis_huertas.id_huerta}`}>
                                <button  type="button" className="btn btn-primary"> Ver </button>
                                </Link>
                                <small id="helpId" className="text-muted">&nbsp;</small>
                                <Link name="" id="" className="btn btn-primary" to={`/mihuerta/${id_usuario}/${mis_huertas.id_huerta}/listaUsuariosHuerta`} role="button">
                                Colaboradores
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

)    

}