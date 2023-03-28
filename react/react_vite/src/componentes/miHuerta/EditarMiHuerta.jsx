import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import * as API from '../../servicios/servicios' 


export function EditarMiHuerta() {
  const {id_huerta} = useParams();
  const[id_usuario,setIdUsuario]=useState('');
  const [nombre, setNombre] = useState('');
  const [localidad, setLocalidad]=useState('');
  const [mensajeError,setmensajeError]=useState('');
  const [mensajeSuccess, setmensajeSuccess] = useState('')
  //...
  const [localidades,setLocalidades]=useState([]);

  useEffect(()=>{
    API.getLocalidades().then(setLocalidades)
    trae_datos(id_huerta)
    
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
        //console.log(usuarioLogueado.datos[0].username)
        if(usuarioLogueado){
          setIdUsuario(usuarioLogueado.datos[0].id_usuario);
          //setNombreUsuario(usuarioLogueado.datos[0].username);
            console.log(id_usuario)
        }
    
  },[])

  const trae_datos  = async ()=>{
      // event.preventDefault();
    const datos_huerta = await API.getHuertabyId(id_huerta);
    //console.log(datos_huerta);
    setNombre(datos_huerta.nombre);
    setLocalidad(datos_huerta.localidad);
  }

  const editar_planta  = async()=>{
    const datos_enviar={
      nombre : nombre,
      localidad : localidad,
    };
      //console.log(datos_enviar)
    API.UpdateHuerta(id_huerta,datos_enviar);
    setmensajeSuccess('La HUERTA se edito CORRECTAMENTE')
    setTimeout(()=>{
      setmensajeSuccess('')
    }, 2000)
  }
  
  return (
    <>
      <div className="card">
        <div className="card-header">
          Editar Huerta {nombre}:
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
                <label for="">Nombre de la Huerta</label>
                <div className="form-group" >
                  <input 
                    type="text"
                    value={nombre} 
                    onChange={(event)=>setNombre(event.target.value)}
                    name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                <label for="">Localidad</label>
                <select 
                onChange={(event)=>setLocalidad(event.target.value)} 
                className='form-control'>
                <option>{localidad}</option>
                {localidades.map((loca)=>(
                  <option value={loca.nombre}>{loca.nombre}</option>
                ))}
                </select>                             
                </div>
              </div>

            </div>
            <div className="form-group">
              <button  onClick={editar_planta}  type="button" className="btn btn-primary">Guardar</button>
              <small id="helpId" className="text-muted">&nbsp;</small>
              {/* </div><button onClick={guardar} type="button" className="btn btn-primary">Guardar</button> */}
              <Link to={`/mihuerta/${id_usuario}`}><button type="button" className="btn btn-dark">Volver al Listado</button></Link>
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