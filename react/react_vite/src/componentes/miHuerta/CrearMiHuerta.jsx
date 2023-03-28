import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as API from '../../servicios/servicios' 

export function CrearMiHuerta(){
    const[id_usuario,setIdUsuario]=useState('')
    const [nombre, setNombre] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('');
    const [mensajeError, setmensajeError] = useState('');


   const HuertaForm  = async (event)=>{
    event.preventDefault();
      const user = await API.CrearHuerta(id_usuario,{nombre,localidad})
  if(user.status){
          setmensajeSuccess(user.mensaje)
         setTimeout(()=>{
               setmensajeSuccess('');
         }, 4000)
         
         // window.location.reload(true)
     }else{
       setmensajeError(user.mensaje)
          setmensajeError(user)
         setTimeout(()=>{
               setmensajeError('');
          }, 4000)
         
     }
   }
   useEffect(()=>{
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    //console.log(usuarioLogueado.datos[0].username)
    if(usuarioLogueado){
      setIdUsuario(usuarioLogueado.datos[0].id_usuario);
      //setNombreUsuario(usuarioLogueado.datos[0].username);
        console.log(id_usuario)
    }
  },[]);
    return(
        <>
        <div className="card">
            <div className="card-header">
                Crear Huerta
            </div>
                <div className="card-body">
                <form onSubmit={HuertaForm}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label for="">Nombre de la Huerta</label>
                                <input required
                                type="text" 
                                value={nombre}
                                onChange={(event)=>setNombre(event.target.value)} 
                                className="form-control" 
                                placeholder="Nombre de la Huerta" />
                               
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label for="">Localidad</label>
                                <input required
                                type="text" 
                                value= {localidad} 
                                onChange={(event)=>setLocalidad(event.target.value)} 
                                className="form-control"
                                placeholder="Localidad" />
                                
                            </div>
                        </div>
                    </div>
                <div className="form-group">
                    <button onClick={HuertaForm} type="button" className="btn btn-primary">Guardar</button>
                    <small id="helpId" className="text-muted">&nbsp;</small>
                    <Link to={`/mihuerta/${id_usuario}`}><button type="button" className="btn btn-dark">Volver al Listado</button></Link>

                </div>
                </form>
                </div>
                
            <div className="card-footer text-muted">
                Mi Huerta
            </div>
        </div>
        <small id="helpId" className="text-muted">&nbsp;</small>

        </>
        
    )
}