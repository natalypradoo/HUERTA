import React, { useEffect,useState } from "react";
import {Link, useParams} from 'react-router-dom';
import  {} from '../../styles.css/plantilla.css';
import * as API from '../../servicios/servicios';
//import plantilla from '../../styles.css/plantilla.css';

export function ListaMisUsuariosAgregar(){
    const [usuarios,setUsuarios]=useState([]);
//para buscar usuaario
    //const [id_usuario, setIdUsuario]=useState('');
    const [username, setUsername]=useState('');
    const [nombre, setNombre]=useState('');
    const [apellido,setApellido]=useState('');
    const [mensajeError,setmensajeError]=useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    const [nombre_usuario, setNombreUsuario] =useState('')
    const [id_usuarioLogueado,setIdUsuarioLogueado]=useState('')
    
    const {id_huerta}= useParams();
   // console.log(id_huerta)
   
    useEffect(()=>{
        API.getListaMisUsuariosAgregar(id_huerta).then(setUsuarios)
             const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
             //console.log(usuarioLogueado)
              if(usuarioLogueado){
                setIdUsuarioLogueado(usuarioLogueado.datos[0].id_usuario);
                setNombreUsuario(usuarioLogueado.datos[0].username);
          
              }
    },[])
    const agregar_usuario  = async(id_usuario)=>{
        const user = await API.AgregarUsuariosHuerta(id_huerta,id_usuario)
        if(user.status){
            setmensajeSuccess(user.mensaje)
            setTimeout(()=>{
                setmensajeSuccess('');
            }, 5000)
                 
                  window.location.reload(true)
            }else{
            setmensajeError(user.mensaje)
            setmensajeError(user)
            setTimeout(()=>{
                setmensajeError('');
            }, 5000)
                 
        }
    }

//funcion para buscar usuario
const buscar_usuario = ()=>{

    const filtros={
        id_huerta: id_huerta,
        username: username,
        nombre: nombre,
        apellido: apellido,
    };
   // console.log('le manda los filtros',filtros)
    API.BuscarUsuariosMiHuerta(filtros).then(setUsuarios);
}

const limpiar_filtros = ()=>{
    setApellido('');
    setNombre('');
    setUsername('');

    API.getUsuarios().then(setUsuarios)   
}






return(
    <>
        <div className="card">
            <div className="card-header">
                Filtros de busqueda
            </div>
            <div className="card-body">
                <div className='row'>
                    <div className='col-2'>
                        <label>Username </label>
                            <input 
                             id='username'
                             className='form-control'
                             value={username} 
                             onChange={(event)=>setUsername(event.target.value)}
                            />
                    </div>
                    <div className='col-3'>
                        <label>Nombre</label>
                        <input 
                            id='nombre'
                            className='form-control'
                            value={nombre} 
                            onChange={(event)=>setNombre(event.target.value)}
                        />
                    </div>
                    <div className='col-3'>
                        <label>Apellido </label>
                            <input 
                            id='apellido'
                             className='form-control'
                            value={apellido} 
                            onChange={(event)=>setApellido(event.target.value)}
                            />
                    </div>
                    <div className='col-1'>
                    </div>
                    <div className='col-1'>
                    <small id="helpId" className="text-muted">&nbsp;</small>

                        <button onClick={buscar_usuario} className='btn btn-primary'>Buscar</button>
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
            Listado de Usuarios
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
                <div className="row">
                    <div className="col-10">
                    <Link name="" id="" className="btn btn-primary" to={'/registro'} role="button">Nuevo Usuario</Link>
                    </div>
  
                    <div className="col-2">
                    <Link name="" id="" className="btn btn-dark" to={`/mihuerta/${id_usuarioLogueado}`} role="button">Volver</Link>
                    </div>
                </div>

            <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th> 
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                            {usuarios.map((usuario)=>(
                             <tr key={usuario.id_usuario}>

                                { (usuario.estado=='A')?
                                <>
                                <td scope="row">{usuario.id_usuario}</td>
                                <td scope="row">{usuario.username}</td>
                                <td scope="row"> {usuario.nombre}</td>
                                <td scope="row">{usuario.apellido}</td>
                                {(usuario.contacto=='SI')?
                                    <>
                                     <td scope="row">{usuario.email}</td>
                                    </>
                                     :
                                     <>
                                    <td scope="row">&nbsp;</td>
                                    </> 
                                } 

                                <td>
                                <button onClick={() =>agregar_usuario(usuario.id_usuario)} type="button" className="btn btn-outline-success"> AGREGAR </button>
                                </td>
                                </>
                                : 
                                <>
                                {/* <button  onClick={() =>altaUsuario(usuario.id_usuario)} type="button" className="btn btn-outline-success"> Alta </button> */}
                                </>
                                }
                                 </tr>
                                 ))} 
                </tbody>
            </table>
        </div>
        </div>
    <div className="card-footer text-muted ">
        Mi Huerta - Silicon Misiones
    </div>

        </>
        )
};