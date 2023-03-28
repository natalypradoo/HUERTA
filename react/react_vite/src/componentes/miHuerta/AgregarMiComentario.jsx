import { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as API from '../../servicios/servicios' 

export function AgregarMiComentario(){
    const {id_huerta}= useParams();
    const {id_hp}=useParams();
    const[id_usuario,setIdUsuario]=useState('')
    const [comentario, setComentario] = useState('');
    const [fecha, setFecha] = useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('');
    const [mensajeError, setmensajeError] = useState('');


   const ComentarioForm  = async (event)=>{
    event.preventDefault();
      const user = await API.CrearMiComentario(id_huerta,id_hp,{comentario,fecha})
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
                Agregar anotación:
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
                <form onSubmit={ComentarioForm}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label for="">Comentario</label>
                                <input required
                                type="text" 
                                value={comentario}
                                onChange={(event)=>setComentario(event.target.value)} 
                                className="form-control" 
                                placeholder="Comente" />
                               
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label for="">Fecha</label>
                                <input required
                                type="date" 
                                value= {fecha} 
                                onChange={(event)=>setFecha(event.target.value)} 
                                className="form-control"
                                placeholder="" />
                                
                            </div>
                        </div>
                    </div>
                <div className="form-group">
                    <button onClick={ComentarioForm} type="button" className="btn btn-primary">Guardar</button>
                    <small id="helpId" className="text-muted">&nbsp;</small>
                    <Link to={`/mihuerta_comentarios/${id_usuario}/${id_huerta}/${id_hp}`}><button type="button" className="btn btn-dark">Volver al Listado</button></Link>

                </div>
                </form>
                </div>
                
            <div className="card-footer text-muted">
                Mi Huerta - Silicon Misiones
            </div>
        </div>
        <small id="helpId" className="text-muted">&nbsp;</small>

        </>
        
    )
}