import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import * as API from '../../servicios/servicios' 

export function EditarUsuario(){
    //const [usuario, setUsuario] =useState('');
    const {id_usuario}= useParams();
    //console.log('param', id_usuario)
    const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [fecha_nacimiento, setFechaNacimiento] = useState('');
    const [contacto, setContacto] = useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('');
    const [mensajeError, setmensajeError] = useState('');

    useEffect(()=>{
      trae_datos(id_usuario)
    },[])

    const trae_datos  = async ()=>{
      // event.preventDefault();
      const datos_usuario = await API.getUsuariosbyId(id_usuario);
      //console.log(datos_usuario);
      setEmail(datos_usuario.email)
      setUsername(datos_usuario.username);
      setNombre(datos_usuario.nombre);
      setApellido(datos_usuario.apellido);
      setContacto(datos_usuario.contacto);
      setFechaNacimiento(datos_usuario.fecha_nacimiento);
    }

    const editar_usuario  = async()=>{
        const datos_enviar={
          username : username,
          nombre : nombre,
          apellido : apellido,
          email : email,
          fecha_nacimiento : fecha_nacimiento,
          contacto : contacto
        };
        API.UpdateUsuario(id_usuario,datos_enviar);
        setmensajeSuccess('Se Edito el USUARIO CORRECTAMENTE')
            setTimeout(()=>{
                setmensajeSuccess('')
            }, 2000)
    }


    
    return(

<div className="container">
        <div className="card">
            <div className="card-header">
                Editar Usuario: {id_usuario}
            </div>
            <div className="card-body">
            <div className="card-body">
            {
                    mensajeSuccess?
                    <div className="alert alert-success" role="alert">
                    {mensajeSuccess}
                    </div>:''
                }
                {
                    mensajeError?
                        <div className="alert alert-danger" role="alert">
                        {mensajeError}
                     </div>:''
                }
                <form >
                <div className="form-group">
                  <label for="">Nombre Usuario</label>
                  <input 
                  type="text" 
                  value={username} 
                  onChange={(event)=>setUsername(event.target.value)} 
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  {/* <small id="helpId" className="text-muted">&nbsp;</small> */}
                 </div> 

                {/* <div className="form-group">
                  <label for="">Password</label>
                  <input required
                  type="password" 
                  value={usuario.password} 
                  className="form-control" 
                  placeholder="Password" 
                  onChange={(event)=>setPassword(event.target.value)} />

                </div>  */}

                 <div className="form-group">
                  <label for="">Email</label>
                  <input
                  type="text" 
                  value={email} 
                  onChange={(event)=>setEmail(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                </div> 

                <div className="form-group">
                  <label for="">Nombre</label>
                  <input 
                  type="text" 
                  value={nombre}  
                  onChange={(event)=>setNombre(event.target.value)} 
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                </div>

                <div className="form-group">
                  <label for="">Apellido</label>
                  <input 
                  type="apellido" 
                  value={apellido}  
                  onChange={(event)=>setApellido(event.target.value)} 
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                </div>

                <div className="form-group">
                  <label for="">Fecha Nacimiento</label>
                  <input 
                  type="date"
                   value={fecha_nacimiento} 
                   onChange={(event)=>setFechaNacimiento(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                </div>

                <div className="form-group">
                  <label for="">¿Quiere divulgar su email como contacto?</label>

                        <select 
                        onChange={(event)=>setContacto(event.target.value)} 
                        className='form-control'>
                        <option value={contacto}>{contacto}</option>
                        <option value='SI'>SI</option>
                        <option value='NO'>NO</option>
                        </select>
                  {/* <small id="helpId" className="text-muted">&nbsp;</small> */}
                </div>


    
                <div className="form-group">
                    <button  onClick={editar_usuario} type="button" className="btn btn-primary">Guardar</button>
                   <small id="helpId" className="text-muted">&nbsp;</small>
                    <Link to={'/listarUsuarios'}><button type="button" className="btn btn-secondary">Volver</button></Link>
                </div>
                </form>                
            </div>
            </div>
            <div className="card-footer text-muted">
               Mi Huerta
            </div>
        </div>
        </div>
        
    );

};
