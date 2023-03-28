import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import * as API from '../../servicios/servicios' 


export function EditarMiComentario() {
  const {id_c_hp} = useParams();
  const [comentario, setComentario] = useState('');
  const [fecha, setFecha]=useState('');
  const [mensajeError,setmensajeError]=useState('');
  const [mensajeSuccess, setmensajeSuccess] = useState('')

  useEffect(()=>{
    trae_datos(id_c_hp)
  },[])

  const trae_datos  = async ()=>{
      // event.preventDefault();
    const datos_comentario = await API.getMiComentariobyId(id_c_hp);
    //console.log('los datos son:' ,datos_comentario);
    setComentario(datos_comentario.comentario);
    setFecha(datos_comentario.fecha);
  }

    const editar_MiComentario  = async()=>{
        const datos_enviar={
            comentario : comentario,
            fecha : fecha,
        };
       //console.log(datos_enviar)
    //    API.UpdateMiComentario(id_c_hp,datos_enviar)
    //     setmensajeSuccess('La HUERTA se edito CORRECTAMENTE')
    //      setTimeout(()=>{
    //          setmensajeSuccess('')
    //     }, 2000)
        const user= await API.UpdateMiComentario(id_c_hp,datos_enviar);
     //setmensajeSuccess('La HUERTA se edito CORRECTAMENTE')
    // setTimeout(()=>{
      //   setmensajeSuccess('')
    // }, 2000)
         if(user.status){
           setmensajeSuccess(user.mensaje)
            setTimeout(()=>{
                  setmensajeSuccess('');
            }, 4000)
           
    //        // window.location.reload(true)
        }else{
          setmensajeError(user.mensaje)
         setmensajeError(user)
           setTimeout(()=>{
               setmensajeError('');
           }, 4000)   
        }
    }
  
  return (
    <>
      <div className="card">
        <div className="card-header">
          Editar Anotación:
        </div>
        <div className="card-body">
        {
          mensajeSuccess?
          <div className="alert alert-success" role="alert">
          {mensajeSuccess}
          </div>:''
        }
        {
          mensajeError?
          <div className="alert alert-success" role="alert">
          {mensajeError}
          </div>:''
        }       
          <div className="form-group">
            <div className="row">
              <div className="col-6">
                <label for="">Comentario</label>
                <div className="form-group" >
                  <input 
                    type="text"
                    value={comentario} 
                    onChange={(event)=>setComentario(event.target.value)}
                    name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label for="">Fecha</label>
                  <div className="form-group" >
                  <input required
                        type="date" 
                        value= {fecha} 
                        onChange={(event)=>setFecha(event.target.value)} 
                        className="form-control"
                        placeholder="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <button  onClick={editar_MiComentario} type="button" className="btn btn-primary">Guardar</button>
              <small id="helpId" className="text-muted">&nbsp;</small>
              {/* </div><button onClick={guardar} type="button" className="btn btn-primary">Guardar</button> */}
              <Link to={'/listarHuertas'}><button type="button" className="btn btn-dark">Volver al Listado</button></Link>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          Mi Huerta - Silicon Misiones
        </div>
      </div>
        <small id="helpId" className="text-muted">&nbsp;</small>
    </>
  )
};